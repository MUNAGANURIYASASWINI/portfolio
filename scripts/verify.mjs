/**
 * Build verification gate.
 *
 * Run after `next build`:
 *   node scripts/verify.mjs
 *
 * These are the integrity and performance invariants from PLAN.md,
 * made executable. They exist because the content rules ("no invented
 * metrics", "no .tex persona leakage") are the kind of thing that rots
 * silently during a content edit.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const src = join(root, "src");

let failures = 0;
let passes = 0;

const ok = (msg) => {
  console.log(`  PASS  ${msg}`);
  passes++;
};
const fail = (msg) => {
  console.log(`  FAIL  ${msg}`);
  failures++;
};

function walk(dir) {
  const outFiles = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) outFiles.push(...walk(full));
    else outFiles.push(full);
  }
  return outFiles;
}

console.log("\n=== 1. Static export produced ===");
if (!existsSync(out)) {
  fail("out/ does not exist — run `next build` first");
  process.exit(1);
}
const htmlFiles = walk(out).filter((f) => f.endsWith(".html"));
ok(`out/ exists with ${htmlFiles.length} HTML files`);

console.log("\n=== 2. Routes present ===");
const required = [
  "index.html",
  "404.html",
  join("work", "crm", "index.html"),
  join("work", "erp", "index.html"),
  join("work", "honda", "index.html"),
  join("work", "ai-chatbot", "index.html"),
];
for (const r of required) {
  existsSync(join(out, r)) ? ok(`/${r}`) : fail(`missing /${r}`);
}

console.log("\n=== 3. Content integrity (PDF is the only source) ===");
const home = readFileSync(join(out, "index.html"), "utf8");

if (/<h1[^>]*>[\s\S]{0,300}?MUNAGANURI YASASWINI/.test(home)) {
  ok("h1 renders as literal text (not client-rendered)");
} else {
  fail("h1 is NOT literal in HTML — something is client-rendering");
}

// The parent .tex describes a completely different persona. Its content
// must never reach this site.
const forbidden = ["NexaTask", "DocuMind", "CloudScale", "pgvector", "Spring Boot"];
const leaked = forbidden.filter((t) => home.includes(t));
leaked.length === 0
  ? ok("no .tex persona content leaked into the build")
  : fail(`LEAKED .tex persona content: ${leaked.join(", ")}`);

// The only six approved numbers.
const metrics = ["33%", "250+", "30%+", "100+"];
for (const m of metrics) {
  home.includes(m) ? ok(`metric present: ${m}`) : fail(`metric missing: ${m}`);
}

console.log("\n=== 4. Resume asset ===");
existsSync(join(root, "public", "resume.pdf"))
  ? ok("public/resume.pdf exists")
  : fail("public/resume.pdf missing");

console.log("\n=== 5. 'use client' budget (max 2 files) ===");
const clientFiles = walk(src).filter(
  (f) => /\.(tsx?|jsx?)$/.test(f) && /^"use client"/m.test(readFileSync(f, "utf8")),
);
clientFiles.length === 2
  ? ok(`exactly 2 client components: ${clientFiles.map((f) => f.split(/[\\/]/).pop()).join(", ")}`)
  : fail(`${clientFiles.length} client components (expected 2): ${clientFiles.map((f) => f.split(/[\\/]/).pop()).join(", ")}`);

console.log("\n=== 6. First Load JS budget ===");
const jsDir = join(out, "_next", "static");
const gzCache = new Map();
for (const f of walk(jsDir)) {
  if (f.endsWith(".js")) gzCache.set(f.split(/[\\/]/).pop(), gzipSync(readFileSync(f)).length);
}
const refs = [
  ...new Set(
    [...home.matchAll(/\/_next\/static\/[^"']+\.js/g)].map((m) =>
      m[0].split("/").pop(),
    ),
  ),
];
const firstLoad = refs.reduce((sum, n) => sum + (gzCache.get(n) ?? 0), 0);
const kb = firstLoad / 1024;

// Measured floor for Next.js 16 App Router is ~173 KB gzip
// (react-dom + scheduler + polyfill + runtime). The application's own
// share is ~7 KB. The budget guards against REGRESSION, not the floor.
const BUDGET_KB = 185;
kb <= BUDGET_KB
  ? ok(`First Load JS ${kb.toFixed(1)} KB gzip (budget ${BUDGET_KB} KB, framework floor ~173)`)
  : fail(`First Load JS ${kb.toFixed(1)} KB gzip exceeds ${BUDGET_KB} KB budget`);

console.log("\n=== 7. Accessibility scaffolding ===");
home.includes("Skip to main content")
  ? ok("skip link present")
  : fail("skip link missing");

// The reduced-motion + forced-colors rules live in the emitted stylesheet,
// not inline in the HTML, so they must be checked there.
const css = walk(out)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");
if (!css) {
  fail("no CSS emitted");
} else {
  css.includes("prefers-reduced-motion")
    ? ok("reduced-motion handling emitted in CSS")
    : fail("prefers-reduced-motion block missing from CSS");
  css.includes("forced-colors")
    ? ok("forced-colors fallback emitted in CSS")
    : fail("forced-colors fallback missing from CSS");
}

home.includes("application/ld+json")
  ? ok("JSON-LD Person schema present")
  : fail("JSON-LD missing");
const h1Count = (home.match(/<h1/g) ?? []).length;
h1Count === 1 ? ok("exactly one h1") : fail(`${h1Count} h1 elements (expected 1)`);

console.log(
  `\n${"=".repeat(46)}\n  ${passes} passed, ${failures} failed\n${"=".repeat(46)}\n`,
);
process.exit(failures > 0 ? 1 : 0);
