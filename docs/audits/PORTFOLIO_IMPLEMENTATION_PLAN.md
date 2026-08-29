# Portfolio Implementation Plan

Companion to `PORTFOLIO_MASTER_AUDIT.md`. Date: 2026-08-30. Branch: `audit/master-portfolio-evolution`.

Tasks are grouped: **A** = pass 1 (low-risk / high-confidence), **B** = needed an owner decision, **C** = effort/QA but no decision.

## Status after two passes

- **A1–A8: done** (pass 1).
- **B1 done** — contact channel = obfuscated email (`adulsaa.q@gmail.com`), per Q's choice. Fastwork slot ready for a URL.
- **B2 done** — `/services` built, kept **broad** per Q's positioning choice; added to nav + sitemap; `/about` links to it.
- **B3: not done by design** — Q chose to keep the homepage broad. The hero CTA now points to `/services`; the keyword list was left as an evidence-honest "Verified stack".
- **B4 deferred** — Q chose "later, keep as plan". GoatCounter recommended.
- **B5 deferred** — needs purchase/DNS authorization.
- **C1, C2, C3, C5, C6, C7, C8: done** (pass 2). **C4 partial** (added 3 real screenshots + `kind` field; `tradeoffs[]`/per-project `idealClient` still open). **C9 deferred** (ADR-001 trigger).

---

## A. Implemented in this pass

### A1 — Style `/contact`, `/archive`, `404`

- **Priority:** P1
- **Files:** `src/app/globals.css` (add rules), `tests/design-system.test.ts` (assert rules exist)
- **Change:** add CSS for `.contact-register`, `.contact-route`, `.contact-route__action`, `.contact-route--pending`, `.archive-register`, `.archive-register__head`, `.archive-row`, `.archive-row__index`, `.archive-row__title`, `.archive-row__limitation`, `.not-found-page`, `.not-found-page__code`, `.source-link`, and the `.about-intro` / `.contact-intro` / `.archive-intro` modifiers. Reuse existing tokens (`--line-*`, `--surface-*`, `--font-mono`, `--section-space`). No gradients, no `backdrop-filter`, no `filter: blur` (enforced by test).
- **Acceptance:** built `out/contact/index.html` and `out/archive/index.html` render with the site's hairline-rule + mono-label language; `404.html` matches; `design-system.test.ts` asserts the new selectors are present.
- **Verification:** `npm test`, `npm run build`, visual check of `out/contact/`, `out/archive/`, `out/404.html`.
- **Rollback:** revert the `globals.css` hunk; pages return to unstyled but functional.
- **Dependencies:** none.

### A2 — Define `--line-soft`

- **Priority:** P3
- **Files:** `src/app/globals.css`
- **Change:** add `--line-soft: #efeee9;` to `:root` (between `--line-primary #e9e8e4` and `--surface-secondary #f7f7f5`). Fixes the silently-dropped border on `.project-impact`.
- **Acceptance:** `.project-impact` shows top/bottom hairlines in the built homepage.
- **Verification:** `npm test` (design-system token test still passes), visual check.
- **Rollback:** remove the line.

### A3 — JSON-LD structured data

- **Priority:** P2
- **Files:** new `src/content/identity.ts`, new `src/lib/structured-data.ts`, new `src/components/seo/json-ld.tsx`, edit `src/app/layout.tsx`, edit `src/app/work/[slug]/page.tsx`, new `tests/structured-data.test.ts`
- **Change:**
  - `identity.ts` — `{ name: "Q", url, sameAs: ["https://github.com/adulsaa-q"], jobTitle: "Data, BI & automation systems", knowsAbout: [...] }` (all factual, no employer, no claims).
  - `structured-data.ts` — pure functions returning plain objects: `personSchema()`, `websiteSchema()`, `creativeWorkSchema(project)`, `breadcrumbSchema(items)`.
  - `json-ld.tsx` — a Server Component that renders `<script type="application/ld+json">` with `JSON.stringify` of a static object.
  - `layout.tsx` — emit `Person` + `WebSite` once.
  - `work/[slug]/page.tsx` — emit `CreativeWork` (name, description=`summary`, `url`, `codeRepository`=`repository`, `about`=`stack`) + `BreadcrumbList` (Home / Work / project).
- **Acceptance:** built HTML contains valid JSON-LD; `structured-data.test.ts` checks `@type` values and that no `Review`/`AggregateRating`/`Offer` keys appear.
- **Verification:** `npm test`, `npm run build`, `grep 'ld+json' out/index.html out/work/timelimit/index.html`, paste into a schema validator.
- **Rollback:** remove the `<JsonLd>` usages and the four new files.
- **Dependencies:** none. **Security:** ADR-003 — static data only.

### A4 — Bilingual `lang` marking

- **Priority:** P2
- **Files:** new `src/lib/i18n.ts`, edit `src/app/page.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`
- **Change:** `i18n.ts` exports `containsThai(s: string): boolean` (`/[฀-๿]/`). Apply `lang={containsThai(project.displayTitle) ? "th" : undefined}` on the elements rendering `displayTitle`; same for `limitations` items and the `work` card's `limitations[0]`.
- **Acceptance:** built HTML has `lang="th"` on the project-1 Thai title and the Thai limitation strings; English strings unchanged.
- **Verification:** `npm test`, `grep 'lang="th"' out/index.html out/work/index.html`.
- **Rollback:** remove the `lang` props and the helper.
- **Note:** `<html lang="en">` is intentionally kept — most document text is English; revisit if the homepage is rewritten primarily in Thai.

### A5 — Case-study forward path (related work + contact CTA)

- **Priority:** P1
- **Files:** `src/app/work/[slug]/page.tsx`, `src/app/globals.css`, `tests/pages.test.tsx`
- **Change:** replace the `.project-cta` block ("Return to the complete project register.") with a `<nav>` containing: previous project link, next project link (wrap-around over `projects[]` order), a "Discuss a system like this →" link to `/contact#work-enquiries`, and a keep "All work" link. Add `.project-next-nav` styles.
- **Acceptance:** every `/work/[slug]` page links to two sibling projects and to `/contact`; `pages.test.tsx` asserts the contact link and a sibling link are present.
- **Verification:** `npm test`, `npm run build`, click-through in `out/`.
- **Rollback:** restore the previous `.project-cta` JSX + CSS.
- **Dependencies:** none.

### A6 — External link consistency

- **Priority:** P3 (Low security)
- **Files:** `src/app/work/[slug]/page.tsx`
- **Change:** add `target="_blank" rel="noopener noreferrer"` to the hero "Source repository" link and each evidence `sourceUrl` link (they currently open in the same tab with no `rel`). Matches `/work` and the homepage.
- **Acceptance:** built `/work/[slug]` HTML — every external `<a>` has `rel="noopener noreferrer"`.
- **Verification:** `npm test`, `grep -o '<a [^>]*github.com[^>]*>' out/work/timelimit/index.html`.
- **Rollback:** remove the attributes.

### A7 — Sitemap `lastModified`

- **Priority:** P3
- **Files:** `src/app/sitemap.ts`, `tests/metadata.test.ts` (optional assertion)
- **Change:** add `lastModified: new Date()` to each entry (build-time constant).
- **Acceptance:** `out/sitemap.xml` entries carry `<lastmod>`.
- **Verification:** `npm test`, `npm run build`, inspect `out/sitemap.xml`.
- **Rollback:** remove the field.

### A8 — CI Node LTS + step granularity

- **Priority:** P3
- **Files:** `.github/workflows/deploy-pages.yml`, `package.json` (`engines`), `README.md`
- **Change:** `node-version: 22`; split the single `run: |` verify block into four steps (`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`); add `"engines": { "node": ">=20" }` and align the README wording.
- **Acceptance:** workflow YAML valid; steps named; README + `engines` consistent.
- **Verification:** `yq`/lint the YAML locally; the real check is the next CI run.
- **Rollback:** restore the previous YAML.

---

## B. Deferred — needs an owner decision from Q

### B1 — Real contact channel

- **Priority:** P1
- **Blocker:** which address? plain `mailto:` vs. a form? spam tolerance? Tests currently assert `not.toContain("mailto:")` — that test must be updated as part of this.
- **Proposed:** obfuscated `mailto:` + wire the Fastwork slot to render a real URL from `src/content/contact.ts` (inert until set). Optionally a Web3Forms/Cloudflare-Function brief later.
- **Files:** `src/app/contact/page.tsx`, new `src/content/contact.ts`, `tests/phase-seven-pages.test.tsx`.
- **Acceptance:** `/contact` offers at least one channel a stranger can actually use; the Fastwork link activates the moment a URL is set in config.

### B2 — `/services` page + IA change

- **Priority:** P1
- **Blocker:** primary-audience decision (audit recommends the Thai SME / e-commerce operator).
- **Proposed:** new `/services` route rendering 3 productized services derived from the `/about` capability register, each with: ideal client, problem (buyer language), inputs, deliverables, process, boundaries, linked case study, CTA. Add "Services" to `primaryNavigation`; consider renaming "Work"→"Case Studies" and "Archive"→"Labs" (move Labs to footer).
- **Files:** new `src/app/services/page.tsx`, new `src/content/services.ts`, `src/content/navigation.ts`, `src/app/sitemap.ts`, `src/app/about/page.tsx` (add CTA), tests.
- **Acceptance:** a non-technical visitor can read one service page and know whether to hire Q and for what.

### B3 — Homepage repositioning

- **Priority:** P2
- **Blocker:** Q's Thai copy + audience decision.
- **Proposed:** replace `verifiedTechnologies` (19-item list) with 3–4 problems in buyer language, each linking to the proving case study; move the full stack list to `/about` and each case study; add a one-line identity (who/where). Keep the evidence-discipline principle but state it above the fold.
- **Files:** `src/app/page.tsx`, `tests/pages.test.tsx` (the "technology register" test will change).
- **Acceptance:** 5-second test — a Thai e-commerce operator sees their problem named.

### B4 — Analytics

- **Priority:** P2
- **Blocker:** vendor choice + PDPA posture.
- **Proposed:** GoatCounter (hosted, free, cookieless) as a single `<script>` in `layout.tsx`; event taxonomy `project_view`, `github_source_click`, `fastwork_click`, `contact_click`, `service_view`, `case_study_complete`. Add a short `/privacy` note when this lands.
- **Files:** `src/app/layout.tsx`, new `src/app/privacy/page.tsx`, footer link.
- **Acceptance:** Q can see traffic source + per-project interest + contact reach, with no cookie banner.

### B5 — Custom domain + Cloudflare

- **Priority:** P3
- **Blocker:** purchase + DNS authorization (financial + infrastructure — do not proceed without explicit go-ahead).
- **Migration checklist (when authorized):**
  1. Buy domain; enable registrar lock + 2FA + DNSSEC.
  2. Add `CNAME` file to `public/` (or repo root) with the apex/host; configure GitHub Pages custom domain + "Enforce HTTPS".
  3. Verify the domain in GitHub (DNS `TXT`) to prevent takeover.
  4. Set `NEXT_PUBLIC_SITE_URL` to the new origin; update `defaultSiteUrl` in `src/lib/site-url.ts`; rebuild — canonical/OG/sitemap follow automatically.
  5. Keep `github.io` serving a redirect for ~90 days (GitHub Pages redirects the old `github.io` to the custom domain automatically once set).
  6. Resubmit the sitemap in Search Console under the new property; add the old as a property too and use the Change of Address tool.
  7. Optional: put the domain behind Cloudflare (proxied), move to **Cloudflare Pages**, add `_headers`:
     ```
     /*
       X-Frame-Options: DENY
       X-Content-Type-Options: nosniff
       Referrer-Policy: strict-origin-when-cross-origin
       Permissions-Policy: geolocation=(), camera=(), microphone=()
       Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'
     ```
     (tighten `script-src`/`style-src` once analytics + inline JSON-LD are accounted for — JSON-LD needs `'unsafe-inline'` for `script-src` unless hashed; prefer hashing).
  8. Update Fastwork/LinkedIn/`sameAs` to the new URL.
- **Rollback:** point DNS back to `github.io`; revert `defaultSiteUrl`; the GitHub Pages workflow stays in the repo.

---

## C. Deferred — effort / QA, no decision needed

### C1 — Remove Tailwind

- **Priority:** P2
- **Files:** `package.json`, `postcss.config.mjs`, `src/app/globals.css` (remove `@import "tailwindcss"`), delete `@tailwindcss/postcss` dep.
- **Risk:** Tailwind Preflight resets `h1–h6`/`p`/`ul`/`ol`/`figure`/`blockquote` margins and `list-style`. Removing it can shift spacing. `globals.css` already sets `box-sizing` and `body { margin: 0 }` but relies on Preflight for the rest.
- **Method:** remove, rebuild, diff every route's rendered layout at 3 viewports; add the handful of resets that actually mattered (`h1–h6,p,ul,ol,figure { margin: 0 }`, `ul,ol { list-style: none; padding: 0 }` where needed) explicitly to `globals.css`.
- **Acceptance:** visual parity on all routes; CSS smaller; one fewer dependency; `npm test` green (adjust `design-system.test.ts` if it asserts the import — it does not currently).
- **Verification:** full build + visual regression pass.

### C2 — Font subsetting / drop unused weights

- **Priority:** P2
- **Method:** grep `font-weight` usage across `globals.css` + components; keep only what is used (likely Sans 400/600/700, Sans Thai 400/600/700, Mono 400/600/700 — verify). Consider `@fontsource-variable/*` or `next/font/local` with `preload` on the two above-the-fold faces only. Drop non-`latin`/`thai` subsets.
- **Acceptance:** fewer `woff2` in `out/_next`; no visible weight regressions; LCP unaffected or better.
- **Verification:** build, count fonts, visual check, WebPageTest/Lighthouse before/after.

### C3 — Responsive images / lightbox for dashboards

- **Priority:** P2
- **Method:** either generate 640/960/1280/1920 widths at build (a small `sharp` script writing to `public/images/**`) and set proper `srcSet`, or add a click-to-zoom lightbox that lazy-loads the full-res image (no dependency — a `<dialog>` + the existing image). The lightbox is less work and keeps `unoptimized`.
- **Acceptance:** mobile does not download 1920px PNGs on initial load.
- **Verification:** build, check transferred bytes on a throttled mobile profile.

### C4 — `Project` model additions (`idealClient`, `whatYouGet[]`, `tradeoffs?`)

- **Priority:** P2
- **Files:** `src/types/project.ts`, `src/content/projects.ts` (author per project), `src/lib/content-validation.ts` (require `idealClient` + non-empty `whatYouGet` for `FEATURED`), `src/app/work/[slug]/page.tsx` (render a "Who this is for" + "What you get" section), tests.
- **Acceptance:** every featured case study answers "who has this problem" and "what a client receives"; validator enforces it.

### C5 — `dependabot.yml`, `/llms.txt`, delete CNA leftover SVGs

- **Priority:** P3
- **`dependabot.yml`:** `package-ecosystem: npm`, weekly, grouped minor/patch, security PRs separate, **no auto-merge**; also `github-actions` ecosystem.
- **`/llms.txt`:** `public/llms.txt` — ~200 words plain text: who Q is, the four projects + their evidence status + repo URLs, contact route. Keep it honest and in sync with `projects.ts`.
- **Delete:** `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (Create-Next-App leftovers, unreferenced — confirm with `grep -r` first).
- **Acceptance:** Dependabot opens grouped PRs; `out/llms.txt` served; `out/` no longer ships the 5 unused SVGs.

### C6 — `BRAND.md` + spacing scale tokens

- **Priority:** P3
- **`BRAND.md`** (one page): mark + wordmark lockup + minimum size, color tokens + usage, type scale (documented steps), Thai/Latin pairing rules (size + leading compensation), diagram style, project-cover set, tone of voice (extract from existing copy), motion principles.
- **Spacing tokens:** add `--space-1..8` (or a `clamp()` rhythm) to `:root` and migrate the highest-traffic magic values in `globals.css`.
- **Acceptance:** a new page can be built without inventing new spacing values.

### C7 — Thai typography art-direction

- **Priority:** P3 (part of C6)
- **Method:** Thai needs ~1.6–1.75 line-height vs Latin ~1.5, and often a slightly larger size to match Latin x-height perception. Add `:lang(th) { line-height: 1.7; }` scoped rules and test with the actual content strings.
- **Acceptance:** Thai lines do not clip tone marks; Thai and Latin feel intentionally paired, not mismatched.

### C8 — axe smoke test + broken-link check in CI

- **Priority:** P3
- **Method:** `vitest-axe` over the server-rendered markup of each route (fast, no browser) OR Playwright + `@axe-core/playwright` over `out/` (slower, real). Broken-link: `linkinator ./out --recurse --skip 'fastwork'` for internal links, sample external.
- **Acceptance:** CI fails on a new a11y violation or a broken internal link.
- **Note:** only add Playwright if C3's lightbox or B4's analytics introduces behavior worth E2E.

### C9 — Astro evaluation spike

- **Priority:** P3 — trigger per ADR-001 (next IA expansion)
- **Method:** time-boxed branch; port `/`, `/work`, `/work/[slug]`; measure first-load JS, LCP, build time, and the effort to re-express the 41-test suite. Decide with numbers.
- **Acceptance:** a written recommendation with before/after metrics; no migration without it.

---

## Verification Results (this pass)

Recorded after both passes:

```
npm test             → 68 passed / 12 files (was 41 / 9)
npm run lint         → clean, no warnings
npm run typecheck    → clean
npm run build        → 16 routes, static export OK (adds /services)
npm run check:links  → 13 pages, 0 broken internal links
npm audit --omit=dev → 0 vulnerabilities (1 dep removed, 0 added)

Size:
  out/ total          8.4 MB → 5.1 MB
  fonts               55 woff2 / ~740 KB → 10 woff2 / ~172 KB
  css (gzip)          ~8.1 KB → ~5.5 KB

Built-output spot checks:
  out/contact/index.html  → GitHub + obfuscated email ([at] form, no mailto:, no joined address) + pending Fastwork + first-message note; #work-enquiries anchor present
  out/services/index.html → 3 services, each links a case study or archive, + contact CTA
  out/index.html          → Person + WebSite JSON-LD; hero → /services; lang="th" on Thai title
  out/work/*/index.html   → CreativeWork + BreadcrumbList JSON-LD; prev/next nav; contact CTA
  out/work/ecommerce-sales-pipeline/ → 3 artifact screenshots (was 1)
  out/llms.txt            → served
  out/sitemap.xml         → 16 <loc>, all <lastmod>
```

Left open by choice or scope: analytics (Q: later), Fastwork URL (Q to provide), homepage
narrowing (Q: stay broad), responsive `srcset`, per-project `tradeoffs[]`, Astro spike,
custom domain. Not visually verified: Thai font rendering post-subset, the `<dialog>` lightbox,
768–900px layout.
