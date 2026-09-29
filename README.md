# QA Portfolio — Munaganuri Yasaswini

Neomorphic portfolio site for a Quality Analyst / QA Automation Engineer.
Static export, zero runtime dependencies.

> **Content source of truth: `../Yashu_Resume.pdf` only.**
> `../Yashu_Developer_Resume.tex` is a *different persona* (Software Engineer,
> full-stack, React/Docker/AWS). Its content must never reach this site, and
> `scripts/verify.mjs` fails the build if any of it leaks in.

## Commands

```bash
npm run dev        # dev server
npm run build      # static export -> out/
npm run serve      # serve the REAL artifact on :3000  (never `next start`)
npm run verify     # integrity + performance gate
npm run typecheck  # tsc --noEmit
```

## Architecture

| Concern | Decision |
|---|---|
| Framework | Next.js 16.3.6, App Router, `output: 'export'` |
| Styling | Tailwind v4.3.3 CSS-first; neumorphic tokens in `@theme inline` |
| Runtime deps | **Zero** (see below) |
| Deploy | Cloudflare Pages from `out/` (Vercel = fallback) |

### Why no runtime dependencies

| Excluded | Reason |
|---|---|
| `motion` / `framer-motion` | ~50KB. The tactile press is two CSS declarations (swap raised→inset on `:active`). |
| `lucide-react` | ~12 icons copied as inline SVGs — 0KB and exact `stroke-width` control, which matters in soft UI. |
| `next-themes` | No release since 2025-03-11. A ~20-line blocking inline script is better and avoids theme flash. |
| Any 3D/WebGL lib | The most worn-out portfolio cliché; neumorphism already sells depth. |
| `clsx` | Template literals. |

`'use client'` appears in **exactly two files** — `ThemeToggle.tsx` and
`RevealObserver.tsx`. The verify script enforces this.

## Editing content

Everything editable lives in `src/content/`. Renderers are dumb `.map()` calls,
so a copy edit cannot break markup.

- `profile.ts` — name, roles, contact, summary
- `skills.ts` — the 4 skill groups
- `impact.ts` — **the only 6 approved numbers**
- `engagements/*.ts` — the 4 case studies
- `experience.ts` · `certifications.ts` · `education.ts`

### Integrity rules (enforced by `npm run verify`)

1. **No invented metrics.** Only the six values in the PDF.
2. **No fabricated repos or code.** GitHub is linked but lists no repos.
3. **One employer stated plainly** on every card.
4. **Numeral styling only for real measurements.** A capability label must
   never borrow the metric treatment.

## Design system

Neumorphism, but *evidence-forward*. Tokens and contrast ratios were
machine-verified with `apca-w3`; the system ships at **WCAG 2.2 AAA (7:1) plus
APCA Lc >= 75** for body text.

Three rules carry the whole thing:

1. **Shadows can never satisfy WCAG 1.4.11** — composited neumorphic shadows
   measure only 1.36–1.65:1 against the base. Every interactive element
   therefore carries a 1px hairline border.
2. **Focus is a hue shift, never a luminance shift.** Soft UI is designed to
   erase edges, so a grey ring on grey is invisible. The double ring
   (`--nm-ring`) uses a base-coloured inner ring to guarantee the outer accent
   ring always clears 3:1.
3. **Colour is bound to rendered size, not role.** `<=13px → muted`,
   `14px → meta`, `16px+ → body`, headings → strong.

Semantic colours (`--nm-volume`, `--nm-quality`, `--nm-impact`) are separated
by ~9x **luminance**, never hue — a naive blue/green/violet triad collapsed to
ΔE 0.027 under deuteranopia. Icon shape and text label are the primary
channels; colour is redundant reinforcement.

**Radius rule:** radius must be >= 2x the shadow offset, or the shadow clips
into mud. 6px offset → min 14px radius. `rounded-sm`/`xs` are banned on
shadowed elements.

**Tags are debossed, not raised.** ~40 skills at raised-pill density is
"shadow soup"; inset reads as labels milled into the material and makes the
raised cards pop by contrast.

## Scroll reveals are progressive enhancement

The hidden state is scoped to `html.js-reveal`, a class set by the blocking
script in `<head>`. That class only exists when JS is running, so:

- no JS / JS fails / observer never fires → **content is visible**
- JS running → reveals animate

This was a real bug caught in review: unscoped `opacity: 0` made the entire
Impact section, the coverage matrix, and all section headings invisible below
the fold. `prefers-reduced-motion` additionally forces reveals to their final
state, because a reduced-motion user whose observer never fires would otherwise
see a blank page.

## Performance note

First Load JS is **~174 KB gzip**. This is the Next.js 16 App Router floor
(react-dom + scheduler + polyfill + runtime); the application's own share is
~7 KB. An earlier 110 KB budget came from an estimate and proved wrong — the
verify script now guards against *regression* past 185 KB rather than
pretending the floor is lower than it is.

## Deploy

Cloudflare Pages: build `npm run build`, output `out`, Node 22.

- Do **not** add `basePath`/`assetPrefix` — buy a domain and serve from apex.
- Do **not** create `middleware.ts` — hard error with `output: 'export'`.
- Verify locally with `npm run serve`, never `next start`.
- Set `NEXT_PUBLIC_SITE_URL` so OG/sitemap/JSON-LD URLs are correct.
