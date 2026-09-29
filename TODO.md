# TODO

Status legend: `[x]` done · `[ ]` open

## Build phases

- [x] **1. Scaffold** — folder, `git init`, Next 16, Tailwind v4, static-export config, résumé copied to `public/`
- [x] **2. Design tokens** — `globals.css` light+dark, `@custom-variant dark`, `@utility` shadows, forced-colors fallback
- [x] **3. UI primitives** — `NeuCard` `NeuButton` `NeuTag` `NeuMetric` `NeuStep` `NeuMatrix` + inline SVG icon set
- [x] **4. Content** — `profile` `skills` `impact` `experience` `certifications` `education` + 4 engagements, all verbatim from the PDF
- [x] **5. Home page** — composition only
- [x] **6. Case-study routes** — `/work/[slug]` × 4
- [x] **7. Theme + motion** — blocking no-FOUC script, IntersectionObserver reveals
- [x] **8. SEO** — JSON-LD `Person` from `profile.ts`, sitemap, robots, favicon
- [x] **9. A11y + integrity gate** — `scripts/verify.mjs`, 21 checks passing
- [x] **10. Verification** — static export, literal h1, no persona leakage, JS budget

## Shipped since v1

- [x] **Contact trust rail** — phone removed (section + JSON-LD);
      copy-to-clipboard email with Primer-pattern confirmation;
      live self-check panel (4 real in-browser assertions, neutral
      pre-JS state); honest GitHub gap line; LinkedIn/résumé descriptors
- [x] **Site titles use pipes, not em dashes** (matches resume header);
      all 4 user-facing body-copy em dashes scrubbed; 0 in rendered HTML
- [x] **Micro-interactions P1–P4, zero dependencies** — card bloom + tilt,
      metric count-up (server-rendered finals), matrix :has() highlight,
      hero gradient sweep. Verified live: counts land on finals, hover
      scales cells 1.12x, tilt writes --rx/--ry, sweep animates.
      Terminal typing (P5) held: contested, and Contact is already rich.

## Bugs found and fixed

- [x] **Scroll reveals hid all content below the fold** — `opacity: 0` was
      unscoped, so anything the IntersectionObserver hadn't reached stayed
      invisible. The entire Impact section, coverage matrix and all section
      headings were blank without JS. Fixed by scoping to `html.js-reveal`,
      set by the blocking script, so no-JS renders fully.
      Verified: 0/26 reveal elements hidden in both JS-on and JS-off contexts.
- [x] `sitemap.xml` / `robots.txt` failed the build under `output: 'export'`
      until marked `dynamic = "force-static"`.
- [x] `as const` narrowed `testTypes` to a literal tuple, breaking
      `.includes()` in `NeuMatrix` — cast to `readonly TestType[]`.
- [x] `Engagements.tsx` was missing its `NeuCard` import.
- [x] Verify script looked for the reduced-motion block in HTML when it lives
      in the emitted CSS.

## Open / next

- [ ] **Generate `public/og.png`** (1200×630). `metadata` references it, but the
      file does not exist yet — LinkedIn/Slack previews will currently 404.
      This is the highest-value remaining item: these links are the primary
      traffic source.
- [ ] **Buy a domain and set `NEXT_PUBLIC_SITE_URL`.** Currently falls back to
      `https://example.com`, so OG/sitemap/JSON-LD URLs are wrong.
- [ ] **Verify dark-mode shadow composites on a calibrated display.** The 4.5–6%
      highlight alpha was design-reasoned, not machine-measured — it is the one
      unverified value in the token table. The UI subagent's original 92%
      highlight produced an 11.56:1 composite, which is why it was lowered.
- [ ] **Run axe DevTools in both themes** (manual pass; the automated checks in
      `verify.mjs` cover structure, not contrast).
- [ ] **Deploy** to Cloudflare Pages from `out/`.
- [ ] **Re-measure `--nm-impact` luminance.** `--nm-volume` and `--nm-quality`
      were measured; the third was design-reasoned to sit ~4x the luminance of
      `--nm-quality`. Confirm before relying on the semantic triad.
- [ ] Consider adding sanitised test artefacts (a Postman collection or a
      Selenium spec) if any can be shared — currently the portfolio has no
      public code, which is its main content limitation.

## Decisions to revisit

- **First Load JS ~174 KB gzip** is the Next.js 16 App Router floor, not a
  defect: react-dom + scheduler + polyfill dominate, and the app's own code is
  ~7 KB. A `browserslist` targeting modern browsers was added but did **not**
  drop the polyfill chunk. If JS weight ever becomes the priority, the
  framework choice is the lever — not the code.
