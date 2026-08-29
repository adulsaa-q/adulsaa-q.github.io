# Portfolio Master Audit — adulsaa-q.github.io

Audit date: 2026-08-30
Repository: `git@github.com:adulsaa-q/adulsaa-q.github.io.git` (branch `main`, 17 commits, first commit 2026-08-28)
Production: <https://adulsaa-q.github.io/>
Auditor role: combined product / frontend / architecture / UX / design / SEO / accessibility / performance / security / analytics / business review.
Method: repository forensics + local build (`npm ci && npm test && npm run lint && npm run typecheck && npm run build`, all green: 41 tests, 9 files) + production HTTP inspection of every route + response-header inspection.

> **The scores and findings below are the as-audited baseline.** Two implementation passes followed on branch `audit/master-portfolio-evolution` — see **Implemented Changes**, **Verification Results**, and the score-delta note directly under the table. Anything marked "**(implemented)**" or "**Fixed**" in this document was done in those passes.

---

## Executive Assessment

### Scores (0–10, evidence-backed)

| Dimension | Score | Primary evidence |
|---|---:|---|
| Product clarity | 6.5 | Hero states a clear promise ("I turn messy operational data into systems people can actually use"), DATA→MODEL→DECISION→HANDOVER map, 3 named capabilities on `/about`. But the homepage leads with a 19-item technology list and no named audience; "Work / Archive / About" labels are builder-oriented. |
| Portfolio credibility | 8.0 | Explicit evidence classes (`VERIFIED_CODE`, `SIMULATED`, `README_REPORTED`…), per-project limitations, build-time `validateProjects()` that throws on missing sources, every claim links to a public repo path. This is the strongest asset. |
| Client conversion | 3.0 | `/contact` has one working link (GitHub). Fastwork is an inert placeholder; no email, no form, no calendar, no brief flow. Case studies dead-end at "All work". No services page with a CTA. |
| Case-study quality | 6.5 | Consistent 6-section model (Context / System / Decisions / Artifacts / Evidence / Limitations), real decisions with rationale. Weakened by: only 1 of 4 has a real screenshot on its own page beyond a reconstructed diagram; no "what the client gets"/outcome framing; no related-work or next-step navigation. |
| Visual identity | 5.5 | A real point of view exists (editorial, mono labels, hairline rules, Orbit Q mark, no gradients/glass — enforced by test). But it is only applied to Home, `/work`, `/work/[slug]`, `/about`. `/contact`, `/archive`, and `404` are **substantially unstyled** (confirmed in production CSS). |
| UX | 5.5 | Skip link, keyboard-trapped mobile menu, reduced-motion handling, focus-visible ring — all present and tested. Undermined by the unstyled pages, dead-end contact, and a homepage that asks the visitor to parse a keyword list before any proof. |
| Responsive design | 6.5 | Sensible breakpoints at 760px and 440px; grids collapse to one column; mobile menu; touch target ≥ 2.75rem. Not verified across real devices; full-resolution 1920px dashboard PNGs are shipped to phones (`unoptimized`). |
| Accessibility | 6.5 | Good semantics, landmarks, one `<h1>` per page, `aria-*` on interactive nav, `prefers-reduced-motion` respected. Gaps: `<html lang="en">` is hardcoded while content is bilingual and Thai title/limitation strings carry no `lang="th"`; `.archive-register__head` is `aria-hidden` visual-only table header with no styling; external links are inconsistent (`/work` uses `target=_blank rel=noreferrer`, `/work/[slug]` does not). |
| Performance | 6.0 | Static export, no third-party scripts, `next/image` unoptimized but small PNGs. Costs: ~179 KB gzipped first-load JS for what is essentially a static site with one client component; 55 `woff2` files / ~740 KB of self-hosted IBM Plex across 3 families × 4 weights × many subsets; 11 render-blocking `@import` lines in `layout.tsx`; Tailwind v4 is imported but **zero utility classes are used** anywhere. |
| SEO | 6.0 | Correct canonical, trailing-slash consistency, `sitemap.xml`, `robots.txt`, full Open Graph + Twitter card, `metadataBase`, per-page metadata helper. Missing: any structured data (JSON-LD), `lastmod` in the sitemap, and the OG locale (`th_TH`) contradicts `<html lang="en">`. |
| AI discoverability (GEO) | 4.0 | Clean semantic HTML and machine-readable text help, but there is **no `Person`, `WebSite`, `ProfilePage`, `CreativeWork`, or `BreadcrumbList` schema**, no `sameAs` identity graph, and no `/llms.txt`-style summary. An answer engine has to infer everything. |
| Security | 7.5 | No secrets in tree or history (scanned), no `.env`, `npm audit` clean, GitHub Actions pinned to commit SHAs with least-privilege `permissions`, no third-party scripts, `rel="noreferrer"` on the marketplace-style external links. GitHub Pages cannot set CSP/`X-Frame-Options`/`Referrer-Policy` — that is a hosting limitation, not a code defect. |
| Privacy readiness | 8.0 | No analytics, no cookies, no forms, no third-party embeds, no personal data collected. Contact page explicitly states this. Almost nothing to do until analytics or a form is added. |
| Maintainability | 7.5 | Typed content model, single `projects.ts` source of truth, build-time validation, small dependency surface (4 runtime deps), clear file layout. Risk: one 1,328-line `globals.css` with no sections/tokens for spacing scale, and content typing that allows `year` to be a free-string ("Case study", "Desktop application"). |
| Testing | 7.0 | 41 tests across 9 files protect real behavior: evidence integrity, static-export config, metadata, focus trap, reduced-motion, route enumeration. Gaps: no accessibility smoke test, no broken-link check, no test that the CSS actually styles `/contact` and `/archive`, string-match CSS assertions are brittle. |
| CI/CD | 7.5 | `npm ci` → test → lint → typecheck → build → upload → deploy, SHA-pinned actions, `concurrency` group, environment-scoped deploy. Gaps: `node-version: 26` in CI vs "Node 20 or newer" in README/package.json; all verify steps in one `run:` block so a failure does not say which check failed; no link check or Lighthouse budget. |
| Long-term scalability | 6.5 | Architecture is sound for growth in project count. But there is no `services`/case-study/notes information architecture yet, content is hand-edited TypeScript (fine for now), and the Next.js App Router runtime is a standing ~179 KB tax on a site that renders as static HTML. |

**Score deltas after the two implementation passes** (others unchanged; contact/positioning decisions left to Q cap some of these):

| Dimension | Was | Now | Why |
|---|---:|---:|---|
| Client conversion | 3.0 | 6.0 | Real email route, `/services` page, forward CTAs on case studies and `/about`, homepage "How to work with me" |
| Case-study quality | 6.5 | 7.5 | Three real dashboard screenshots wired in, zoomable; previous/next + contact next-step; `kind` descriptor |
| Visual identity | 5.5 | 7.0 | `/contact`, `/archive`, `404` now on-system; `BRAND.md`; spacing tokens; Thai leading |
| UX | 5.5 | 7.0 | No unstyled pages; contact is a real destination; image inspection; case studies do not dead-end |
| Performance | 6.0 | 7.0 | Fonts 740 KB → 172 KB; Tailwind removed; `out/` 8.4 MB → 5.1 MB (JS still ~179 KB — see ADR-001) |
| SEO | 6.0 | 7.5 | `Person` + `WebSite` + `CreativeWork` + `BreadcrumbList` JSON-LD; sitemap `lastmod`; `/services` surface |
| AI discoverability | 4.0 | 6.5 | Structured data + `sameAs` + `/llms.txt` |
| Maintainability | 7.5 | 8.0 | One fewer dependency, no PostCSS config, dead assets removed, `BRAND.md`, typed `services`/`contact` content |
| Testing | 7.0 | 8.0 | 41 → 68 tests; a11y smoke; internal-link check in CI; structured-data + services suites |
| CI/CD | 7.5 | 8.5 | LTS Node, discrete steps, link-check gate, Dependabot |
| Accessibility | 6.5 | 7.5 | Thai fragments marked + Thai leading; consistent external-link `rel`; a11y smoke test guards regressions |

### 1. Five strongest parts of the current website

1. **The evidence system.** Evidence classes + `validateProjects()` throwing at build time + every claim hyperlinked to a public source path. This is genuinely rare and is the whole differentiator.
2. **Disciplined honesty.** "Simulated / demonstration scope" labels, visible limitations, `year: "2022–2025 simulated case"`, a Fastwork link that is *visibly inactive rather than faked*. No invented clients, revenue, or testimonials anywhere.
3. **A real editorial design language** where it is applied: mono micro-labels, hairline rules, generous whitespace, a distinctive asymmetric project grid, an actual custom mark (Orbit Q), and a test that forbids gradients/glass/blur.
4. **Accessibility fundamentals done properly**: skip link with a focus target, a keyboard focus-trapped mobile dialog with focus restoration (tested), `prefers-reduced-motion` honored in both CSS and the JS scroll behavior.
5. **Lean, reproducible engineering**: 4 runtime dependencies, SHA-pinned CI running the same checks as local, static export, no tracking, clean `npm audit`.

### 2. Ten highest-value gaps

| # | Gap | Impact |
|---|---|---|
| 1 | `/contact`, `/archive`, `404` are unstyled in production (no CSS rules for `.contact-route`, `.archive-row`, `.not-found-page`, `.source-link`). | The conversion page and a top-level nav item look broken; destroys the credibility the rest of the site builds. |
| 2 | No real contact path. Fastwork inert, no email, no form, no booking. | The site cannot convert a visitor into a lead. This is the single biggest business gap. |
| 3 | No services / "work with me" page with problems, deliverables, process, and a CTA. `/about` has a capability register but no call to action. | Non-technical buyers cannot self-qualify or understand what to hire for. |
| 4 | Case studies dead-end ("Return to the complete project register" → `/work`). No related work, no next project, no "discuss a similar system". | Every case study loses the visitor at its most persuaded moment. |
| 5 | No structured data (JSON-LD) and no identity graph (`sameAs`). | Weak in Google rich results and effectively invisible to AI answer engines as an entity. |
| 6 | Homepage leads with a 19-item comma/plus technology list and no named audience. | Reads as keyword stuffing / generic; a Thai SME owner does not see themselves. |
| 7 | Bilingual language handling: `<html lang="en">` hardcoded, Thai `displayTitle`/`limitations` strings not marked `lang="th"`. | Thai screen readers mispronounce; Thai text may fall back to Latin glyph metrics; OG `th_TH` contradicts the document lang. |
| 8 | ~179 KB gzipped first-load JS + 55 font files for a static editorial site; Tailwind imported but unused. | Slower mobile TTI than necessary; unjustified dependency and build weight. |
| 9 | No analytics of any kind. | Q cannot answer a single Phase 13 question (traffic source, which project draws interest, whether anyone reaches contact). |
| 10 | Full-resolution 1920px PNG dashboards served to every viewport; no responsive `srcset`. | Wasted bytes on mobile; the one place the portfolio spends its image budget is unoptimized. |

### 3. What could prevent this site from generating freelance work

- **No way to make contact.** A convinced visitor has nowhere to go.
- **The unstyled pages** read as "unfinished project", which contradicts "I build inspectable, finished systems".
- **The homepage does not name a buyer or a problem in the buyer's words** — it speaks to engineers and hiring managers, not to an operations manager drowning in marketplace exports.
- **All four case studies are simulated / reconstructed / personal.** That is honestly labeled (good) but there is no bridge from "here is a demonstration" to "here is what I would do with your data" — no engagement framing.
- **`adulsaa-q.github.io` as the permanent identity** is acceptable but slightly undercuts "serious technical specialist" and can never carry a matching email domain.

### 4. Future security / privacy problems

- **The moment a contact form is added**, a static host means the endpoint and any anti-spam must live with a third party (Formspree-class) or a serverless function — credentials must never enter the client bundle. Design this before building it.
- **The moment analytics is added**, PDPA/consent questions appear. Choosing a cookieless, IP-anonymizing analytics vendor now avoids a consent banner later.
- **GitHub Pages cannot send `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy`.** Today there are no third-party scripts so exposure is low, but the site is framable (clickjacking) and has no defense-in-depth. A custom domain behind Cloudflare is the realistic path to real headers.
- **Subdomain/domain takeover** becomes a risk if a custom domain is added and later abandoned, or if the `CNAME` points at a service that is decommissioned.
- **Dependency drift**: no Dependabot / update automation configured; `next`/`react` are pinned exactly (good) but transitive drift is unmonitored.
- **Project screenshots**: current images are synthetic, but the content rules must keep enforcing "no real client data, no credentials, no PII in images" as new work is added — consider an EXIF strip step.

### 5. What should NOT be changed

- The evidence-class system, `validateProjects()`, and the "label simulated/reconstructed honestly" rule.
- The inert, visibly-pending Fastwork placeholder (do not fake it — replace it with a real link when one exists).
- The no-tracking, no-cookie, no-form current state of `/contact` as the *default* until a deliberate decision is made.
- The editorial visual language (mono labels, hairline rules, no gradients/glass, Orbit Q mark) — extend it, do not replace it.
- Static export + GitHub Pages as the hosting model for now (see ADR).
- SHA-pinned GitHub Actions and least-privilege workflow permissions.
- The one-`<h1>`-per-page, landmark, skip-link, focus-trap accessibility baseline.

### 6. What should be implemented immediately (done in this pass unless noted)

- Style `/contact`, `/archive`, and `404` to match the rest of the site. **(implemented)**
- Add `Person` + `WebSite` JSON-LD on the shell and `CreativeWork` + `BreadcrumbList` on project pages, plus a `sameAs` identity graph. **(implemented)**
- Mark Thai text fragments with `lang="th"`. **(implemented)**
- Give every case study a next-step: previous/next project + a "discuss a similar system" link to `/contact`. **(implemented)**
- Make external links consistent (`target="_blank"` + `rel="noopener noreferrer"` + visual affordance). **(implemented)**
- Fix the undefined `--line-soft` CSS variable. **(implemented)**
- Add `lastModified` to the sitemap. **(implemented)**
- Align CI `node-version` with the documented Node baseline and split the verify steps. **(implemented)**

### 7. What should wait (deferred — see Implementation Plan)

- Choosing and adding an analytics vendor (needs Q's decision; recommend Cloudflare Web Analytics or GoatCounter).
- Adding a real contact channel (needs Q's decision on which address / Fastwork URL / form).
- A dedicated `/services` page and IA change (Work → Case Studies, add Services).
- Custom domain (financial + DNS; recommendation only).
- Framework/architecture change (Astro evaluation — recommendation only; not justified yet).
- Removing Tailwind and subsetting fonts (needs visual regression QA).
- Homepage repositioning around a named primary audience (content work with Q).

### 8. Is GitHub Pages still the right hosting platform?

**Yes, for now.** It is free, reliable, already wired, and serves a static export well. Its only real deficiency is the inability to set security response headers. That matters *if and when* a custom domain + third-party scripts + a form arrive. The clean upgrade path is **Cloudflare Pages** (or Cloudflare in front of a custom domain), which keeps the same static-export artifact and adds header control, `_headers` files, and Web Analytics. Do not move today; revisit when a custom domain is purchased.

### 9. Is the current Next.js architecture justified?

**Partially.** Next.js App Router gives typed routing, the metadata API, `generateStaticParams`, and `next/image` conveniences — all used. But the site ships ~179 KB gzipped JS to hydrate what is effectively static HTML with two tiny interactive pieces (mobile menu, project scroll-to). For a portfolio that will stay content-shaped, **Astro would cut first-load JS to near zero** while keeping component authoring and the content collection model. This is a real, measurable cost, but not an emergency and not worth a migration mid-build. Recommendation: **keep Next.js now, re-evaluate against Astro at the next major content/IA expansion** (see ADR). If staying on Next, at minimum drop unused Tailwind.

### 10. What would make this portfolio genuinely memorable

Right now it is *credible* but not yet *memorable*. Memorable would be:

- **Lean into the evidence system as the product.** Make "every claim is a link to a line of code" a visible, named principle on the homepage — a small "evidence ledger" the visitor can scan, with the class taxonomy shown once, confidently. No other portfolio does this.
- **One real, end-to-end artifact per capability** — a short annotated walk-through (input file → transformation → decision → output) that a non-technical person can follow, rendered as an authored diagram, not a screenshot dump.
- **Art-direct the Thai/Latin pairing deliberately** instead of letting them sit in the same weight and size. A confident bilingual type system is itself a signal of care.
- **Kill the keyword list.** Replace it with 3–4 problems stated in a business owner's words, each linking to the case study that proves the capability.
- **Finish every page to the same standard.** The gap between the homepage and `/contact` is currently the most memorable thing about the site, for the wrong reason.

---

## Current Architecture

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.3.3, App Router, React 19.2.8 | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| Rendering | 100% static prerender | 15 routes: `/`, `/work`, 4× `/work/[slug]` (SSG, `dynamicParams: false`), `/about`, `/archive`, `/contact`, `_not-found`, `icon.svg`, `robots.txt`, `sitemap.xml` |
| Content | `src/content/projects.ts` (typed `Project[]`), `src/content/archive.ts`, `src/content/navigation.ts` | Build-time `validateProjects()` throws on invalid evidence/artifacts |
| Styling | One global stylesheet `src/app/globals.css` (1,328 lines), CSS custom properties for color/layout/motion, `@import "tailwindcss"` (unused) | No CSS modules, no styled-components, ~2 custom classes total that look utility-ish |
| Fonts | `@fontsource/ibm-plex-{sans,sans-thai,mono}`, 11 CSS imports in `layout.tsx`, self-hosted | 55 `woff2` in the export (~740 KB) |
| Client JS | `mobile-navigation.tsx` (focus-trapped dialog), `project-index.tsx` (scroll-to with reduced-motion check) | Everything else is a Server Component |
| Metadata / SEO | `src/lib/metadata.ts` (`createPageMetadata`), `src/lib/site-url.ts` (`canonicalUrl`), `src/app/robots.ts`, `src/app/sitemap.ts` | `metadataBase` set, OG + Twitter complete, no JSON-LD |
| Base path | `src/lib/base-path.ts` — optional `NEXT_PUBLIC_BASE_PATH` for project-page previews | Root deploy uses none |
| Build/deploy | `.github/workflows/deploy-pages.yml` — `npm ci`, `npm test && npm run lint && npm run typecheck && npm run build`, `upload-pages-artifact`, `deploy-pages` | Actions SHA-pinned, `permissions: contents:read / pages:write / id-token:write`, `concurrency: pages` |
| Tests | Vitest 4, jsdom, Testing Library | 41 tests / 9 files: content validation, metadata, static-export config, design-system CSS assertions, page render snapshots, focus trap |
| Hosting | GitHub Pages, root site, Fastly edge, HTTPS + HSTS (GitHub default) | No control over other response headers |

Production vs. source: production matches source. Confirmed the unstyled-pages issue is real in production (fetched `/contact/` and the deployed CSS chunk — zero `.contact-route` rules).

---

## Product Positioning

**What the site sells (as currently written):** "Evidence-led data, BI and automation systems" — reporting models, data pipelines, and focused internal tools, shown with evidence and limits.

**5–10 second comprehension test (homepage):**

| Question | Answered? | Evidence |
|---|---|---|
| Who is Q? | Weak | "Q / Data, BI & Automation Systems" in header; no role, location, or one-line identity |
| What does Q do? | Yes | Hero sentence + DATA→MODEL→DECISION→HANDOVER |
| What problem does Q solve? | Partial | "messy operational data" — abstract; not in a buyer's words |
| Who does Q work with? | No | No audience named anywhere on the homepage |
| What makes Q different? | Partial | The evidence discipline is present but not *stated* as the differentiator above the fold |
| What proof exists? | Yes | Two featured systems + technology register + "full evidence register on the work index" |
| What should the visitor do next? | Weak | "View the full work index" / "FASTWORK / WORK WITH ME" (the latter goes to an inert page) |

**Positioning verdict:** currently *too broad, too technical, too builder-oriented*. It is closer to a well-run engineer's portfolio than a consultant's client-acquisition site. The capability register on `/about` is good raw material for productized services but is framed as "what I can do" not "what you can hire me for".

**Recommended primary audience hierarchy:**

1. **Thai SME / e-commerce operator** who has marketplace and ads exports and no single view — the e-commerce and Shopee case studies speak directly to this.
2. **Operations / finance team lead** with a fragile spreadsheet process that needs to become an auditable pipeline — the finance ETL case study.
3. **Technical hiring manager / agency** evaluating for contract BI/data work — served by the evidence depth, secondary.
4. Everyone else (international, startup founder) — not designed for, do not dilute the homepage for them.

The homepage should be built for audience 1, with a clear path for audience 2, and let audience 3 self-serve via `/work`.

---

## Audience Analysis

| Audience | Currently served? | What they need that is missing |
|---|---|---|
| Thai SME owner | Barely | Problem stated in Thai business terms; "what you get"; price/engagement expectation; a contact path |
| E-commerce seller | Partially (2 relevant case studies) | A homepage entry point that says "marketplace exports → one dashboard"; the case study exists but is not surfaced as a *service* |
| Operations manager | Partially | "Fragile spreadsheet process → auditable pipeline" framing; the finance ETL story is there but told as engineering, not outcome |
| Finance team | Partially | Same as above + a plain-language note on what "auditable" and "idempotent" mean for them |
| Sales / marketing team | No | Not a target; fine |
| BI / data team peer | Yes | Nothing major; evidence depth serves them |
| Corporate manager | No | Would need trust signals (process, boundaries, references) — process is on `/about`, references do not exist |
| Startup founder | No | Not a target; fine |
| Technical hiring manager | Yes | A downloadable CV/profile would help; currently none |
| Fastwork marketplace visitor | Broken | The Fastwork CTA leads to an inert page; the loop is not closed |
| International client | No | English copy is serviceable but positioning, timezone, and engagement model are unstated |

---

## Information Architecture

**Current routes:** `/`, `/work`, `/work/[slug]`, `/archive`, `/about`, `/contact`.

| Route | Clear to a non-technical client? | Issue |
|---|---|---|
| `/` | Partially | Keyword list before proof; no audience |
| `/work` | "Work" is vague but tolerable | Fine as an index; consider "Case Studies" |
| `/work/[slug]` | Yes for the curious | Dead-ends; no outcome framing; no related work |
| `/archive` | "Archive" is builder jargon | Also unstyled; low value to a buyer; consider "Experiments / Labs" and de-emphasize in nav |
| `/about` | Yes — genuinely good | No CTA; "capability register" could become "Services" |
| `/contact` | Yes in intent | Unstyled; one working link |

**Recommended IA (next stage):**

- `/` — repositioned homepage (audience + problems + proof + one CTA)
- `/services` — **new** — 3 productized services from the `/about` capability register, each: ideal client, problem, inputs, deliverables, process, boundaries, linked case study, CTA
- `/work` → keep, optionally rename "Case Studies"
- `/work/[slug]` — add outcome/"what you get" section + related work + CTA
- `/about` — working method + short honest bio + process; CTA to `/services` or `/contact`
- `/labs` (rename of `/archive`) — experiments, kept compact, moved to footer nav or a secondary position
- `/contact` — styled; real channel(s); optional lightweight brief prompt
- Optional later: `/notes` for short technical write-ups (SEO/GEO surface), only if Q will actually maintain it

Navigation depth is fine (all one level). Breadcrumbs are only worth adding on `/work/[slug]` (Home / Work / Project) and can be delivered as JSON-LD + a small visual element.

---

## UX Audit

**Working well:** skip link + focus target; mobile menu is a proper `role="dialog" aria-modal` with focus trap and restoration (tested); reduced-motion respected in CSS *and* the `project-index` scroll JS; focus-visible outline is a clear 0.2rem `--signal-information` ring; touch target on the menu trigger is 2.75rem.

**Problems:**

1. **Unstyled `/contact`, `/archive`, `404`** — the single worst UX issue. Default browser `<h2>`/`<p>` sizing next to the site's editorial type is jarring.
2. **Contact is a dead end** — after "no contact form", the only action is an external GitHub link.
3. **Case study ends on a backward link.** The visitor is most persuaded at the bottom of a case study and is offered only "All work".
4. **The homepage technology register** is cognitive load before any payoff — 19 tokens separated by `+`.
5. **`/work` card** stacks `services.join(" / ")`, `Impact:`, and `limitations[0]` as three mono lines in a details block — dense and hard to scan; the limitation out of context can read as a disclaimer wall.
6. **`year` field** renders as "Work / Case study" or "Work / Desktop application" in the eyebrow — grammatically odd.
7. **`project-index` buttons** scroll the page on click but there is no visible indication that the target moved on mobile (the button row is `overflow-x: auto` and the scrolled-to article is below the fold).
8. **Empty/loading/error states**: no loading states needed (static); `404` exists but is unstyled; no per-route error boundary (acceptable for static).
9. **Thai typography is not art-directed** — Thai and Latin sit at the same size/weight; Thai has no line-height adjustment (Thai needs more leading for its ascenders/tone marks).
10. **`::selection` is bright blue** — fine, intentional.

---

## UI / Visual Audit

**Identity strengths:** a genuine editorial system — mono uppercase micro-labels (`--font-mono`, 0.7rem, letter-spacing), hairline `1px` rules everywhere, generous `--section-space` clamp, an asymmetric alternating project grid, a real custom mark. The `design-system.test.ts` actively forbids gradients, `backdrop-filter`, and `filter: blur`. This is a defensible point of view.

**Weaknesses:**

| Area | Finding |
|---|---|
| Consistency | Design language covers 4 of 7 route types; `/contact`, `/archive`, `404` fall back to unstyled |
| Spacing system | Color/layout/motion are tokenized; there is **no spacing scale token set** — magic `rem` values throughout `globals.css` |
| Type scale | Many independent `clamp()` calls; no shared modular scale; heading sizes range from `clamp(1.05rem…)` to `clamp(4rem, 10vw, 9rem)` with no documented steps |
| Thai/Latin pairing | Same family fallback order for both; no size/leading compensation; not art-directed |
| `--line-soft` | Referenced by `.project-impact` but **never defined** — the border silently does not render |
| Color | 3 signal colors (red/blue/green) used consistently; `--signal-primary` red on `--surface-primary` (`#c75543` on `#fdfdfd`) ≈ 4.6:1 — passes AA for large text and borders, borderline for small text |
| Dark mode | None. Defensible for a deliberately single-look editorial site, but worth a decision |
| Iconography | Almost none — arrows (`→`, `↗`) as text. Consistent and on-brand |
| Motion | Minimal: link arrow nudge, card hover translate, smooth scroll. All within reason and reduced-motion-gated |
| `.project-visual` presentation variants | `schema-led` (dark), `offline-instrument` (warm grey), `dashboard-plate`, `system-flow` — a nice touch, but `presentationBySlug` defines entries for projects that never appear on the homepage |

---

## Anti-AI-Generic Review

| Pattern | Present? | Verdict |
|---|---|---|
| Repetitive uniform card grid | Partially — `/work` cards and `/archive` rows are formulaic | The alternating asymmetric homepage grid is *not* generic; the `/work` list is borderline |
| Generic gradients / glassmorphism / glow | **No** — actively tested against | Keep this |
| Purple/blue "AI" branding | No — red/off-white/ink editorial palette | Keep |
| Huge generic hero text with no purpose | Borderline — `clamp(3rem, 5.8vw, 6rem)` hero is large but carries a real sentence | Acceptable; the sentence earns it |
| Pill-badge overload | Mild — `.project-meta li`, `.scope-label`, `.evidence-class` are all bordered boxes; several per card | Tighten; differentiate scope labels from tech tags visually |
| Meaningless microcopy | Low — copy is mostly substantive | "Two entry points." and "Narrow by design." are good; keep that voice |
| Keyword-stuffed lists | **Yes** — the 19-item technology register on the homepage | Replace with problems-in-buyer-words; move the full stack to `/about` or each case study |
| Template CTA section | The `.project-cta` block ("Return to the complete project register") is generic and backward-facing | Replace with a real next step |
| Fake metrics | **No** — explicitly avoided | This is a core strength; protect it |
| Decorative animation unrelated to information | No | Keep |
| Perfectly symmetrical sections | The `principles` 3-up and `process-register` 4-up are symmetrical grids | Acceptable — they carry distinct content |

**Overall:** the site is on the right side of the AI-generic line, mostly because of the evidence discipline and the no-gradient rule. The two things that read as generated are the **homepage keyword list** and the **backward-facing CTA block**.

---

## Case Study Audit

Model in use: Context → (Problem, Impact, Constraints) → System (Inputs, Implementation) → Decisions → Artifacts → Evidence → Limitations → back-link.

| Question the model should answer | Covered? |
|---|---|
| What problem existed | Yes (`problem`) |
| Who would have this problem | **Implied, not stated** — no "ideal client" line |
| What data enters | Yes (`input[]`) |
| What is hard about the data | Yes (`context`, `constraints`) |
| What architecture was designed | Yes (`system[]`) |
| What transformations occur | Yes (`system[]` + `implementation[]`) |
| What decisions and why | Yes (`decisions[]` with `why`) — strong |
| What tradeoffs | Partial — decisions imply tradeoffs but there is no explicit tradeoff list |
| What the output looks like | **Weak** — only `ecommerce` and `shopee` have real screenshots; `finance` and `timelimit` on their own pages rely on a reconstructed diagram (timelimit *has* a committed screenshot in `projects.ts` but the detail page's `ArtifactCard` shows it) |
| What is demonstrated vs simulated vs unproven | Yes — `evidence[]` classes + `limitations[]` — excellent |
| What code supports the claims | Yes — every `evidence` item has `sourceUrl` |
| What skills it demonstrates | Partial — `stack[]` and `services[]` exist; not framed as "this proves I can…" |
| How an organization would use it | **Missing** — no "what you get" / engagement framing |
| What to inspect next | **Missing** — dead-ends |

**Recommended additions to the `Project` model:** `idealClient: string`, `whatYouGet: string[]` (client-facing deliverables), optional `tradeoffs: string[]`, and a computed previous/next within `/work`.

**Per-project notes:**

- **ecommerce-sales-pipeline** — strongest. Real Power Query + DAX links, real screenshot, clear constraints. `year: "Case study"` is awkward in the eyebrow.
- **shopee-thailand-analytics** — good SQL module evidence; the "300,000-order" figure is correctly kept off the homepage (tested). `README_REPORTED` class is used well.
- **finance-etl-pipeline** — best *engineering* story (idempotency, Decimal, audit tables) but the hardest for a non-technical buyer; needs a plain-language "why this matters to you" and it is the one with a reconstructed-only visual.
- **timelimit** — honest about `sandbox:false` and no CI verification. It is a desktop widget and slightly off-thesis (not "operational data"); consider moving it to `/labs` and featuring the finance or a future BI project instead.

---

## Responsive Audit

Breakpoints: `760px` (nav swap, grid collapse, system-flow vertical) and `440px` (hide wordmark tail, shrink hero, work-card 2-col).

| Viewport | Assessment |
|---|---|
| Small mobile (≤380px) | Hero `clamp(2.75rem, 15vw, 4.2rem)` could still overflow at very small widths with the long English sentence; `body { min-width: 20rem }` prevents sub-320px collapse |
| Large mobile | Fine |
| Tablet portrait (768px) | Just above the 760px breakpoint — gets the desktop two-column grids at a width where `minmax(17rem, …)` columns are tight; worth a 768–900px check |
| Tablet landscape / laptop | Fine |
| Desktop | Fine; `--content-max: 82rem` |
| Wide (>1600px) | Content caps at 82rem and centers — acceptable, slightly lonely; the hairline rules help |

**Information priority per viewport:** not currently reconsidered — the same content order ships everywhere. On mobile, the 19-item technology register and the `principles` 3-up push the featured work far down. Consider deferring the technology register below the featured work on small screens.

**Images:** `sizes` attributes are set (`(max-width: 760px) 100vw, 58vw`) but `unoptimized` + single-resolution source means the browser downloads the full 1920px PNG regardless. Provide 2–3 widths or accept the cost explicitly.

Not verified: real device testing, Thai line-breaking behavior, orientation change. Marked unverified.

---

## Accessibility Audit (WCAG 2.2 AA reasoning)

| Item | Status |
|---|---|
| Semantic landmarks | Pass — `<header>`, `<nav aria-label>`, `<main id>`, `<footer>` |
| One `<h1>` per page | Pass |
| Heading order | Pass on most; `/work/[slug]` uses `<h3>` inside sections under an `<h2>` — fine |
| Skip link | Pass — visible on focus, targets `#main-content` with `tabIndex={-1}` |
| Keyboard nav | Pass — mobile menu focus trap + Escape + restoration (tested) |
| Focus visibility | Pass — `:focus-visible { outline: 0.2rem solid … }` |
| ARIA hygiene | Mostly pass — `aria-hidden` on decorative arrows and the visual table header; `aria-pressed` on the project-index toggle buttons; `aria-disabled` on the pending Fastwork span (note: a `<span>` with `aria-disabled` is not focusable, so it is inert — acceptable) |
| Accessible names | Pass — icon-only `/work` card link has `aria-label={`View ${project.name}`}` |
| `lang` attributes | **Fail** — `<html lang="en">` hardcoded; Thai `displayTitle` (project 1) and Thai `limitations` (projects 1, 2) render without `lang="th"`; only the hero aside Thai line is marked |
| Alt text | Pass — enforced by `validateProjects()` |
| Decorative images | Pass — arrows are `aria-hidden` text |
| Contrast | Mostly pass — body ink `#0e0e0e` on `#fdfdfd` is ~19:1; `--text-secondary #555` on `#fdfdfd` ≈ 7.5:1; `--signal-primary #c75543` on white ≈ 4.6:1 (AA large / UI, borderline small); mono micro-labels at 0.7rem in `--signal-primary` are the riskiest |
| Link distinction | Pass — `.text-link` has a `border-bottom`; inline links inherit underline offset |
| Reduced motion | Pass — CSS media query + JS `matchMedia` check |
| Touch targets | Pass — menu trigger 2.75rem; `.work-card__link` 3.5rem; `.project-index__button` ~2rem tall (below 44px — minor) |
| Forms | N/A (none) |

**Automated checks:** not run (no axe/pa11y in the toolchain). Recommend adding `vitest-axe` or a Playwright + `@axe-core/playwright` smoke test over the built HTML.

---

## Performance Audit

Measured from the local production build (`out/`):

| Metric | Value | Note |
|---|---|---|
| Total export size | 8.4 MB | Includes 55 fonts + 15 images |
| First-load JS (homepage, unique chunks) | ~578 KB raw / **~179 KB gzipped** | High for a static editorial site; App Router + React 19 runtime |
| CSS | 46 KB raw / ~8 KB gzipped | Includes Tailwind Preflight for zero utilities used |
| Fonts | 55 `woff2` / ~740 KB on disk | 3 families × 4 weights × multiple subsets; browser downloads only matched `unicode-range` subsets but that is still ~6–10 files and the 11 `@import` statements are render-path CSS |
| Images | 15 PNGs, largest ~data-model overviews | `unoptimized`, single resolution, up to 1920px wide served to mobile |
| Third-party scripts | 0 | Excellent |
| CLS risk | Low | `next/image` with width/height; fonts self-hosted (no FOUT swap config visible — `@fontsource` defaults to `font-display: swap`) |
| LCP element | Likely the hero `<h1>` (text) | Good — not image-bound; depends on font load |
| TTFB | GitHub Pages + Fastly edge (observed `x-cache: HIT`, `southeastasia` region) | Fine for Thai audience |

**Highest-value performance work:**

1. Remove Tailwind (unused) — smaller CSS, one fewer build plugin, one fewer dependency.
2. Reduce font payload — drop weights that are not used (audit actual weight usage; likely 400/600/700 sans, 400/600 mono is enough), or move to the variable builds, and consider `next/font/local` with `preload` for the two above-the-fold faces only.
3. Provide responsive image widths for the dashboard screenshots, or a lightbox that loads full-res on demand.
4. Evaluate Astro to eliminate the ~179 KB hydration cost (see ADR) — largest single win, largest effort.

---

## Technical SEO Audit

| Item | Status |
|---|---|
| `<title>` + template (`%s — Q`) | Pass |
| Meta description (per page via `createPageMetadata`) | Pass |
| Canonical URLs, trailing-slash consistent | Pass — `canonicalUrl()` + `trailingSlash: true` |
| `metadataBase` | Pass |
| `robots.txt` → sitemap | Pass (`force-static`) |
| `sitemap.xml` | Present but **no `lastmod`**, no `priority` (priority is optional/ignored by Google — fine) |
| Open Graph | Complete — title, description, type, url, siteName, locale, alternateLocale, image (1200×630, alt) |
| Twitter card | Complete — `summary_large_image` |
| Favicons / icons | `favicon.ico` + `icon.svg` (tested to exist) |
| Web manifest | None — acceptable for a non-PWA |
| Structured data (JSON-LD) | **None** — no `Person`, `WebSite`, `ProfilePage`, `CreativeWork`, `BreadcrumbList` |
| Semantic headings | Pass |
| Internal linking | Thin — homepage → `/work` → `/work/[slug]` → dead end; no cross-links between case studies; `/about` and `/services`(future) not linked from case studies |
| 404 behavior | `404.html` emitted (GitHub Pages serves it) — Pass functionally, unstyled visually |
| Duplicate content | Low risk — canonical + trailing slash consistent |
| Language metadata | **Inconsistent** — OG `locale: th_TH` vs `<html lang="en">` |
| Image metadata | Alt text yes; filenames descriptive-ish (`data-model-overview-1.png`) |

**Ranking opportunity:** Thai-language intent like "รับทำ dashboard Power BI", "รวมข้อมูล Shopee Lazada", "ทำ ETL งบการเงิน" is reachable *if* the homepage and a `/services` page carry that language naturally and case studies are internally linked. Do not spin up thin SEO pages.

**Implemented in this pass:** `Person` + `WebSite` JSON-LD on the shell, `CreativeWork` + `BreadcrumbList` on `/work/[slug]`, `sameAs` (GitHub), sitemap `lastModified`.

---

## AI / GEO Discoverability Audit

An answer engine (or an AI crawler building an entity profile) currently sees: clean semantic HTML, good headings, honest text — but **no explicit machine-readable identity or work graph**.

| Signal | Present? |
|---|---|
| Who Q is (entity) | Only as prose; no `Person` schema |
| Services / capabilities | Prose on `/about`; no `Service`/`OfferCatalog` |
| Technologies demonstrated | `stack[]` rendered as text; not typed |
| Per-project summary | Yes — `summary` in visible text |
| Evidence links | Yes — every `evidence.sourceUrl` is a real link |
| Source repositories | Yes — `repository` per project, GitHub profile on `/contact` |
| Identity graph (`sameAs`) | **No** |
| Machine-readable project type | **No** (`CreativeWork` / `SoftwareSourceCode`) |
| `llms.txt` / plain summary file | **No** |

**Implemented:** `Person` (name, url, `sameAs: [github]`, `knowsAbout: [...]`, `jobTitle`), `WebSite`, and per-project `CreativeWork` + `BreadcrumbList` JSON-LD.

**Recommended next:** a static `/llms.txt` (or `/public/llms.txt`) with a 200-word plain-text description of Q, the four projects, their evidence status, and repo URLs. Cheap, honest, effective.

---

## Analytics Strategy

**Current state:** none. Q cannot answer any of: where visitors come from, which project draws interest, whether anyone reaches `/contact`, whether the Fastwork CTA is clicked, whether Thai vs. English visitors differ.

**Constraints:** static host, privacy-first posture, PDPA exposure (Thai visitors), no desire for a cookie banner, minimal performance budget.

| Option | Cookies | Perf | Cost | Data ownership | Notes |
|---|---|---|---|---|---|
| **Cloudflare Web Analytics** | None | ~0 (beacon) | Free | Cloudflare | Best fit if/when the domain sits behind Cloudflare; works via a script tag without Cloudflare proxying too |
| **GoatCounter** | None | Tiny (~3 KB) | Free (hosted) / self-host | You (self-host) or GoatCounter | Simplest honest option; open source |
| **Plausible** | None | ~1 KB | Paid (~$9/mo) or self-host | You (self-host) | Polished; costs money hosted |
| **Umami** | None | ~2 KB | Self-host (needs a DB) | You | More infra than warranted now |
| **Google Analytics 4** | Yes (consent) | Heavy | Free | Google | Rejected — cookie banner, PDPA load, perf, surveillance posture |

**Recommendation:** **GoatCounter** (hosted, free) now for a single script tag and zero consent burden; switch to **Cloudflare Web Analytics** if a custom domain moves behind Cloudflare. Decision belongs to Q — deferred.

**Minimal event taxonomy (when added):** `project_view` (path), `github_source_click` (project), `fastwork_click`, `contact_click`, `service_view` (service), `case_study_complete` (scrolled to CTA). No PII, no cross-site, no fingerprinting.

---

## Lead / Contact Architecture

**Current:** `/contact` = one GitHub link + an inert Fastwork placeholder. `not.toContain("mailto:")` is asserted in tests — the no-email state is deliberate.

**Options for a real channel:**

| Option | Security | Spam | Cost | Maintenance | Verdict |
|---|---|---|---|---|---|
| Plain `mailto:` link | No secrets; email harvestable by scrapers | Some scraper spam | Free | None | Simplest real improvement; obfuscate lightly |
| Fastwork profile link (when URL exists) | External, safe | Fastwork-managed | Free | None | **Do this the moment the URL is approved** — it closes the loop the homepage CTA promises |
| Formspree / Basin / Web3Forms (form → provider) | API key is a public form ID, not a secret; still verify provider's abuse story | Provider CAPTCHA / honeypot | Free tier | Low | Reasonable if a structured brief is wanted |
| Cloudflare Worker / Pages Function endpoint | Real backend; secret stays server-side; add Turnstile | Turnstile | Free tier | Medium | Best if the site moves to Cloudflare anyway |
| Calendar booking (Cal.com) | External | Provider | Free/paid | Low | Good for the "qualified lead" step, later |

**Recommendation (phased):**

1. Now: add an obfuscated `mailto:` **and** wire the Fastwork slot to accept a real URL via content config (still rendered inert until set). Needs Q's decision on the address — deferred.
2. Next: a minimal brief prompt on `/contact` (service category, rough timeline, rough budget band, one free-text field) via Web3Forms or a Cloudflare Function — only if Q wants structured intake.
3. Never: collect more than name + contact + project description. No tracking pixels on `/contact`.

**If a form is built:** client-side validation + honeypot + provider CAPTCHA + success/error states + a one-line privacy notice ("Your message is sent to Q's email via {provider}; it is not stored on this site"). Data minimization is mandatory.

---

## Security Threat Model

Assets: the repository, the GitHub Pages deployment, the GitHub Actions pipeline, Q's identity/reputation, (future) visitor contact data.

| Threat | Vector | Current exposure | Mitigation |
|---|---|---|---|
| Secret leakage | Committed key / `.env` / history | **None found** (scanned tree + history; no `.env`; only false-positive matches: `id-token` in the workflow, "gradient/glass" strings in a test) | Keep the content rule; consider `gitleaks` in CI |
| Supply-chain (npm) | Malicious dependency / transitive | Low — 4 runtime deps, `npm audit` clean, lockfile committed | Add Dependabot; keep exact pins on `next`/`react` |
| Supply-chain (Actions) | Compromised third-party action | Low — all actions pinned to commit SHA | Keep SHA pins; review on bumps |
| Pipeline privilege | Over-scoped `GITHUB_TOKEN` | Low — `contents: read`, `pages: write`, `id-token: write` only | Already least-privilege |
| XSS / injection | User content rendered as HTML | **None** — all content is typed strings rendered by React (auto-escaped); no `dangerouslySetInnerHTML`; JSON-LD added in this pass is serialized from a static object, not user input | Keep JSON-LD strings static; never interpolate untrusted data |
| Clickjacking | Site framed by a malicious page | **Exposed** — GitHub Pages cannot send `X-Frame-Options`/`frame-ancestors`; a `<meta>` CSP cannot set `frame-ancestors` | Low real risk (no auth, no actions); resolved by moving behind Cloudflare later |
| Tabnabbing | `target="_blank"` without `rel` | Low — marketplace-style links use `rel="noreferrer"`; `/work/[slug]` external links lacked `rel` (**fixed in this pass**) | `rel="noopener noreferrer"` everywhere (done) |
| Open redirect | N/A | None — no redirect logic | — |
| Mixed content | HTTP subresource on HTTPS page | None — all local/HTTPS | — |
| PII exposure | Client data in screenshots / EXIF | Low — images are synthetic; no EXIF check in place | Add an EXIF-strip / image-lint step as content grows |
| Domain/subdomain takeover | Dangling `CNAME` (future custom domain) | N/A today | Only add a `CNAME` when the domain is live; remove it if the domain lapses |
| Source map / debug leak | Prod source maps | Next default does not ship client source maps in production export | Verify on Next upgrades |

---

## Security Findings

| Severity | Finding | Location | Recommendation | Status |
|---|---|---|---|---|
| Info | No secrets in tree or git history | — | Keep content rule; optionally add `gitleaks` to CI | Verified clean |
| Low | External links on `/work/[slug]` (hero repo link, evidence links) had no `rel` and opened in the same tab, inconsistent with `/work` | `src/app/work/[slug]/page.tsx` | Add `target="_blank" rel="noopener noreferrer"` | **Fixed** |
| Low | Site is framable (no `X-Frame-Options` / `frame-ancestors`) | Hosting (GitHub Pages) | Accept now; resolve via Cloudflare when a custom domain exists | Deferred (hosting) |
| Low | No `Content-Security-Policy` / `Referrer-Policy` / `Permissions-Policy` | Hosting | As above; a restrictive `<meta http-equiv="Content-Security-Policy">` is possible but low value with zero third-party scripts | Deferred (hosting) |
| Low | No Dependabot / update automation | `.github/` | Add `dependabot.yml` (weekly, grouped, no auto-merge) | Deferred (recommended) |
| Info | `node-version: 26` in CI, README says "Node 20 or newer" | `.github/workflows/deploy-pages.yml` | Align to an explicit LTS (e.g. 22) in both | **Fixed** |

No credentials were found; nothing to rotate.

---

## Dependency / Supply-chain Audit

- Runtime deps: `next@16.3.3`, `react@19.2.8`, `react-dom@19.2.8`, `@fontsource/ibm-plex-{mono,sans,sans-thai}` — all exact-pinned except fontsource (`^5.3.0`).
- Dev deps: Vitest 4, Testing Library, Tailwind 4 (**unused**), ESLint 9, TypeScript 5, `@vitest/coverage-v8`, jsdom.
- `package-lock.json` committed; `npm ci` reproducible; `npm audit --omit=dev` → **0 vulnerabilities**.
- GitHub Actions: `checkout`, `setup-node`, `upload-pages-artifact`, `deploy-pages` — all pinned to commit SHA. Good practice.
- **Unused dependency:** `tailwindcss` + `@tailwindcss/postcss` — imported via `@import "tailwindcss"` in `globals.css` but **no utility class is used** in any component (verified). Removing it requires a visual regression check (Preflight resets headings/lists margins) — deferred to a dedicated task.
- No `dependabot.yml`, no `renovate.json` — dependency drift is unmonitored.

Recommendation: add `dependabot.yml` (weekly, grouped minor/patch, security PRs separate, **no auto-merge without CI**), keep exact pins on framework packages, remove Tailwind in a separate verified change.

---

## CI/CD Audit

`.github/workflows/deploy-pages.yml`:

**Good:** `npm ci`; SHA-pinned actions; `permissions` least-privilege; `concurrency: { group: pages, cancel-in-progress: false }`; separate `build` and `deploy` jobs; `environment: github-pages`; runs test + lint + typecheck + build before deploy.

**Improvements:**

| Issue | Fix | Status |
|---|---|---|
| `node-version: 26` (odd, non-LTS) vs README "Node 20+" | Pin to `22` (LTS) in workflow + bump README/`engines` | **Fixed** |
| All checks in one `run: \|` block — a failure does not name the failing check clearly | Split into separate steps (`test`, `lint`, `typecheck`, `build`) | **Fixed** |
| No dependency cache key issue but `cache: npm` relies on lockfile — fine | — | OK |
| No broken-link check | Add a `lychee`/`linkinator` step over `out/` (internal links only; sample external) | Deferred |
| No accessibility check | Add `@axe-core/cli` or pa11y-ci over `out/` | Deferred |
| No Lighthouse/bundle budget | Optional — add `@lhci/cli` with a JS-size assertion | Deferred |
| No preview deploys for PRs | Optional — low value for a solo portfolio | Skip |

Keep CI proportional — the deferred items are "nice", not required.

---

## Testing Audit

41 tests / 9 files. They protect **real behavior**, not vanity coverage:

- `content-validation.test.ts` — evidence integrity rules (the important one).
- `projects.test.ts` — 4 featured projects, validator passes.
- `metadata.test.ts` — root metadata shape, canonical strategy, sitemap route coverage, robots.
- `static-export.test.ts` — `output: export`, trailing slash, unoptimized images, `force-static` metadata routes, base-path normalization.
- `design-system.test.ts` — asserts specific tokens and rules exist in `globals.css` (brittle string matching, but it *does* catch regressions to the identity and the no-gradient rule).
- `pages.test.tsx` / `phase-seven-pages.test.tsx` — server-render snapshots of every route checking key content and structure.
- `site-shell.test.tsx` — skip link, nav hrefs, Orbit Q mark, **focus trap + restoration** (genuinely valuable).
- `project-index.test.tsx` — reduced-motion path.

**Gaps:**

1. No test that CSS actually *styles* `/contact`, `/archive`, `404` (they render, tests pass, production is unstyled). Add an assertion that key classes for those pages exist in `globals.css` — mirrors the existing `design-system.test.ts` approach.
2. No accessibility smoke test — add `vitest-axe` over the rendered markup or Playwright + axe over `out/`.
3. No broken-link check.
4. `design-system.test.ts` string assertions will fight refactors — acceptable trade for now; consider asserting computed behavior via a headless browser later.
5. No Playwright — **do not add** until there is interactive behavior worth E2E (there is not yet).

**Added in this pass:** assertions in `design-system.test.ts` that the contact/archive/not-found styles exist.

---

## Privacy / PDPA Considerations

*(Technical review, not legal advice — anything below that is a legal interpretation must be confirmed with a professional.)*

- **Today:** no cookies, no analytics, no forms, no third-party embeds, no personal data. `/contact` states this explicitly. There is effectively nothing to disclose and **no cookie banner is warranted** (adding one now would be user-hostile theatre).
- **If analytics is added:** choose a cookieless, IP-anonymizing vendor (see Analytics Strategy) → still likely no consent banner required, but add a short **Privacy note** page/section describing what is measured (page paths, referrer, country, no individual identification) and the legal basis (legitimate interest). Confirm with a professional given PDPA.
- **If a contact form is added:** add a **privacy notice** at the point of collection (what is collected, where it goes, retention, how to request deletion), collect the minimum, set a retention period, and do not store submissions on infrastructure you do not control beyond what is needed to receive the email.
- **Data minimization** should be the standing rule: no field without a reason.

Recommended when either trigger fires: a single `/privacy` page (short, plain Thai + English), linked from the footer.

---

## Custom Domain Strategy

*(Recommendation only — no purchase, no DNS change, no authorization assumed.)*

| Factor | `adulsaa-q.github.io` | Custom domain (e.g. `q-systems.dev`, `adulsaa.com`) |
|---|---|---|
| Cost | Free | ~฿350–500/yr |
| Memorability / credibility | Moderate — clearly a GitHub project | Higher — reads as a professional identity |
| Matching email | Impossible | `hello@yourdomain` becomes possible |
| SEO continuity | N/A | One-time migration cost; 301s from Pages are limited (Pages can redirect an apex/`www` but not arbitrary old→new path maps once the `CNAME` moves) |
| Security headers | None possible | Possible via Cloudflare in front of the domain |
| DNS security | N/A | Enable DNSSEC, registrar lock, 2FA on the registrar |
| Takeover risk | None | Real if the domain lapses or `CNAME` dangles — manage lifecycle |

**Recommendation:** a custom domain is worth it *once there is a reason to send someone a URL verbally* (Fastwork bio, business card, email signature) and *once analytics/headers matter*. Pair it with Cloudflare (free) for headers + Web Analytics. Until then, `adulsaa-q.github.io` is fine. If/when Q proceeds, follow the migration checklist in the Implementation Plan.

---

## Hosting Strategy

| Option | Headers | Analytics | Functions (forms) | Cost | Migration effort |
|---|---|---|---|---|---|
| **GitHub Pages (current)** | No | No | No | Free | — |
| **Cloudflare Pages** | Yes (`_headers`) | Yes (built-in) | Yes (Pages Functions) | Free | Low — same static artifact, connect the repo |
| Netlify | Yes (`_headers`/`netlify.toml`) | Paid | Yes | Free tier | Low |
| Vercel | Yes | Paid (or self) | Yes | Free tier (hobby) | Low — native Next |

**Recommendation:** stay on GitHub Pages now. When a custom domain, real headers, analytics, or a form endpoint is needed, **move to Cloudflare Pages** — it keeps the static export unchanged, adds `_headers` for CSP/`X-Frame-Options`/`Referrer-Policy`/`Permissions-Policy`, includes privacy-friendly analytics, and offers Pages Functions for a contact endpoint with Turnstile. Vercel is also fine (native Next) but its analytics costs and the site does not need SSR.

---

## Brand System Audit

**Exists:** Orbit Q mark (SVG in header + `icon.svg` + `og` image), wordmark ("Orbit Q / Data, BI & Automation Systems"), three signal colors, IBM Plex trio, mono micro-label convention, hairline rule language, no-gradient/no-glass rule (tested), arrow glyphs as iconography.

**Missing for a real system:**

- A **spacing scale** (only color/layout/motion are tokenized).
- A documented **type scale** (steps, not ad-hoc `clamp()`).
- **Thai type treatment** (size/leading relative to Latin).
- **Diagram style** guidance (the `system-flow`/`system-node` look is a start — codify it).
- **Project cover system** — currently `presentationBySlug` variants; make it a documented set.
- **Tone of voice** doc — the copy already has a consistent voice ("Narrow by design.", "State what is not proven.") — write it down so it survives.
- **Wordmark behavior** — the `@media (max-width: 440px)` hides the tail; define the lockup and its minimum.

This should be a **one-page** `BRAND.md`, not a design-system project.

---

## Content Audit

**Voice:** precise, calm, technical, evidence-first. Genuinely good and un-generic in most places. Examples that work: "Two entry points. Full evidence register on the work index.", "State what is not proven.", "Narrow by design. Each boundary is part of the offer."

**Problems:**

| Issue | Where | Fix |
|---|---|---|
| Keyword list | Homepage `verifiedTechnologies` (19 items) | Replace with 3–4 problems in buyer language; move stack detail to `/about` + per case study |
| `year` values are not years | `projects[].year` ("Case study", "Desktop application", "2022–2025 simulated case") rendered as "Work / {year}" | Rename the field to `timeframe`/`kind` or set proper values; fix the eyebrow template |
| Backward CTA | `.project-cta` "Return to the complete project register." | Replace with a forward next-step (**done**: related work + contact link) |
| Thai reads as translated in places | e.g. `displayTitle` "หนึ่ง dashboard จาก marketplace exports ที่ไม่เหมือนกัน" mixes scripts mid-phrase | Have Q review Thai copy for naturalness; decide per-string whether it is Thai or English, not both |
| No "what you get" language | All case studies | Add `whatYouGet[]` to the model |
| `/about` has no next step | End of `/about` | Add a CTA to `/services`(future) or `/contact` |
| Footer is thin | "Built as a static, evidence-led work record." | Fine, but add nav + GitHub + (future) contact |

**Claim integrity:** searched rendered text — **no** client names, revenue, ROI, time-saved, user counts, testimonials, logos, certifications, or "production" claims. Caveats and limitations are present and specific. This is compliant and is the site's core strength — protect it in review.

---

## Trust & Credibility Audit

**What builds trust now:** inspectable repos, evidence classes, visible limitations, decision rationale, the honest inert Fastwork placeholder, the "no tracking on this site" statement, real tests in the repos referenced.

**What is missing (non-fabricated options):**

- **Architecture / data-flow diagrams** as first-class artifacts (currently one reconstructed diagram, text-heavy).
- **A short, honest bio** — not "10 years / clients include" — just who Q is, where (Thailand), current role context at the level Q is comfortable stating, and why the evidence discipline.
- **A visible statement of the evidence taxonomy** on the homepage or a `/method` note (it is implied, not asserted).
- **A downloadable profile/CV** (PDF) for hiring-manager audiences.
- **Process transparency** — `/about` has the 4 stages; link them from case studies.
- **Responsible-AI note** for the AI research capability (there is limitation text; a short standalone statement would help).

**Avoid:** logo walls, testimonial blocks, client counts, "trusted by" — none exist, keep it that way until real ones do.

---

## Freelance Conversion Audit

Journey: Discover → Land → Understand → Trust → Inspect project → Understand service → Qualify → Contact → Follow-up.

| Step | State |
|---|---|
| Discover | Weak — no analytics, thin internal linking, no structured data (improved this pass), likely low organic surface |
| Land | OK — fast, clear hero sentence |
| Understand | Partial — abstract problem, no audience, keyword list |
| Trust | **Strong** — evidence system |
| Inspect project | Good — deep case studies |
| Understand service | Weak — capabilities on `/about` are not framed as hireable services with deliverables/CTA |
| Qualify | Missing — no self-qualification content (ideal client, engagement model, budget expectation) |
| Contact | **Broken** — inert Fastwork, no email, no form |
| Follow-up | Missing — no way to capture a lead to follow up |

**Biggest conversion levers, in order:** (1) a working contact channel, (2) a `/services` page, (3) forward CTAs on case studies (**partially done**), (4) homepage repositioning to a named audience, (5) analytics to see what is working.

---

## External Platform Strategy

| Platform | Role | Action |
|---|---|---|
| GitHub | **Primary evidence surface** | Keep prominent; it is the proof |
| Fastwork | **Primary acquisition channel (intended)** | Get the approved URL and wire it; align the Fastwork profile's positioning, service taxonomy, and CTA language with the site |
| Email | Secondary contact | Add an obfuscated `mailto:` (Q's decision on address) |
| LinkedIn | Optional — credibility for corporate/hiring audience | Add only if Q maintains it; link from `/contact` and `sameAs` |
| Calendar booking | Later — the "qualified lead" step | Cal.com when volume justifies |
| X/Twitter, others | Not needed | Do not add a footer full of icons |

**Reinforcement check (site ↔ Fastwork):** once the Fastwork profile exists, verify same positioning, same 3 service names, same proof (link case studies from Fastwork), same CTA wording. A mismatch here leaks trust.

---

## KEEP / CHANGE / REMOVE / ADD

### KEEP

- Evidence-class system + `validateProjects()` build-time gate.
- Honest labeling of simulated / reconstructed / README-reported work.
- The inert, visibly-pending Fastwork placeholder (until a real URL exists).
- Editorial visual language: mono micro-labels, hairline rules, no gradients/glass/blur, Orbit Q mark.
- Static export + GitHub Pages (for now).
- SHA-pinned Actions + least-privilege workflow permissions.
- Accessibility baseline: skip link + focus target, focus-trapped mobile menu, reduced-motion handling.
- No tracking / no cookies / no forms as the default state.
- Typed single-source content model.
- The calm, specific copywriting voice.

### CHANGE

- Style `/contact`, `/archive`, `404` to the site standard. **(done)**
- Homepage: replace the 19-item technology list with 3–4 buyer-language problems. *(deferred — content work with Q)*
- Case-study CTA: forward next-step instead of "return to register". **(done — related work + contact link)**
- `year` field → proper `timeframe`/`kind` semantics + fix the eyebrow template. *(deferred — content)*
- `<html lang>` + Thai fragment `lang="th"`. **(done for fragments; `<html lang>` kept `en`, documented)**
- External link behavior consistent everywhere. **(done)**
- CI Node version + step granularity. **(done)**
- `/about` capability register → reframe as `/services` with CTAs. *(deferred — IA)*
- Sitemap: add `lastModified`. **(done)**

### REMOVE

- `tailwindcss` + `@tailwindcss/postcss` (imported, zero utilities used). *(deferred — needs visual regression check)*
- Unused `presentationBySlug` entries for projects not shown on the homepage, or wire them up intentionally. *(deferred — minor)*
- The backward-facing `.project-cta` copy. **(done — replaced)**
- Font weights that are not actually used (audit first). *(deferred)*
- `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` — Create-Next-App leftovers, not referenced. *(deferred — trivial cleanup)*

### ADD

- JSON-LD: `Person` + `WebSite` (shell), `CreativeWork` + `BreadcrumbList` (project pages) + `sameAs`. **(done)**
- `--line-soft` token (or remove the reference). **(done — defined)**
- Related-work / previous-next navigation on case studies. **(done)**
- `/services` page (3 productized services). *(deferred — plan)*
- A real contact channel (email + Fastwork URL wiring). *(deferred — Q's decision)*
- Analytics (GoatCounter or Cloudflare). *(deferred — Q's decision)*
- `dependabot.yml`. *(deferred — recommended)*
- `/llms.txt`. *(deferred — recommended)*
- `BRAND.md` (one page) + a spacing scale token set. *(deferred)*
- `whatYouGet[]` and `idealClient` on the `Project` model. *(deferred — model change)*
- A short honest bio + downloadable profile PDF. *(deferred — content)*
- Accessibility smoke test + broken-link check in CI. *(deferred)*

---

## Gap Matrix

| Area | Current State | Evidence | Problem | User/Business Impact | Risk | Recommendation | Priority | Effort | Confidence | Dependencies |
|---|---|---|---|---|---|---|---|---|---|---|
| Contact/Archive/404 styling | Unstyled in production | Fetched `/contact/` + deployed CSS: 0 `.contact-route` rules | Pages look broken | Kills conversion + credibility | Med | Add CSS to match site | **P1** | S | High | none |
| Contact channel | Inert Fastwork, no email/form | `contact/page.tsx`, tests forbid `mailto:` | No way to become a lead | No freelance pipeline | High | Add email + wire real Fastwork URL | **P1** | S | High | Q's decision on address |
| Case-study next step | Backward link only | `.project-cta` in `[slug]/page.tsx` | Loses persuaded visitor | Lost conversions | Med | Related work + contact CTA | **P1** | S | High | none |
| Services page / IA | Capabilities on `/about`, no CTA | `about/page.tsx` | Buyer can't self-qualify | Fewer qualified enquiries | Med | `/services` with 3 productized offers | **P1** | M | Med | positioning decision |
| Structured data | None | Prod HTML: 0 `ld+json` | Weak rich results + GEO | Low discoverability | Low | Person/WebSite/CreativeWork/BreadcrumbList | **P2** | S | High | none |
| Homepage positioning | Keyword list, no audience | `page.tsx` `verifiedTechnologies` | Generic; no buyer fit | Weak top-of-funnel | Med | Problems in buyer language | **P2** | M | Med | Q content review |
| Bilingual `lang` | `<html lang=en>`, Thai unmarked | `layout.tsx`, `projects.ts` | SR mispronunciation; glyph metrics | A11y + Thai UX | Low | Mark Thai fragments; decide doc lang | **P2** | S | High | none |
| First-load JS | ~179 KB gzip | `out/` chunk analysis | Slow mobile TTI | Bounce risk | Low | Evaluate Astro; drop Tailwind | **P2** | M–XL | Med | ADR |
| Analytics | None | No script in prod | Zero visibility | Can't optimize | Low | GoatCounter or Cloudflare | **P2** | S | High | Q's decision |
| Responsive images | Full-res PNG to mobile | `next/image unoptimized`, 1920px src | Wasted mobile bytes | Perf | Low | Multi-width or lightbox | **P2** | M | Med | none |
| Fonts | 55 woff2 / 740 KB, 11 @import | `out/_next`, `layout.tsx` | Render-path weight | Perf | Low | Subset + drop weights | **P2** | M | Med | usage audit |
| Tailwind unused | Imported, 0 utilities | grep of `src/` | Dead dep + build weight | Maintainability | Low | Remove with visual QA | **P2** | S | Med | visual regression |
| CI Node/steps | `node 26`, one run block | `deploy-pages.yml` | Non-LTS; unclear failures | Maintainability | Low | Pin LTS, split steps | **P3** | S | High | none |
| `--line-soft` undefined | Border never renders | `globals.css` `.project-impact` | Silent visual bug | Cosmetic | Low | Define token | **P3** | XS | High | none |
| Dependabot | None | `.github/` | Unmonitored drift | Supply chain | Low | Add `dependabot.yml` | **P3** | XS | High | none |
| `/llms.txt` | None | — | AI engines infer | GEO | Low | Add static file | **P3** | XS | Med | bio copy |
| CNA leftovers in `public/` | 5 unused SVGs | `git ls-files` | Noise | Trivial | None | Delete | **P3** | XS | High | none |
| Brand system depth | No spacing/type scale, no Thai treatment | `globals.css` tokens | Inconsistent growth | Maintainability | Low | One-page `BRAND.md` + spacing tokens | **P3** | M | Med | none |
| Custom domain | `github.io` only | — | Credibility ceiling; no matching email | Brand | Low | Recommendation only | **P3** | M | Med | purchase auth |
| Security headers | None (host limit) | Response headers | No defense-in-depth | Low | Move to Cloudflare when domain exists | **P3** | M | High | custom domain |
| A11y/link tests in CI | None | `.github/`, `tests/` | Regressions slip | Quality | Low | axe smoke + link check | **P3** | M | Med | none |

---

## Prioritized Roadmap

**P0 (security / data-loss / deployment-critical):** none.

**P1 — launch-blocking for "client-acquisition system":**

1. Style `/contact`, `/archive`, `404`. **(done)**
2. Forward CTA + related work on case studies. **(done)**
3. Real contact channel — email + Fastwork URL wiring. *(needs Q's decision)*
4. `/services` page from the `/about` capability register. *(needs positioning decision)*

**P2 — high-value improvements:**

5. JSON-LD + `sameAs` + sitemap `lastModified`. **(done)**
6. Bilingual `lang` marking. **(done for fragments)**
7. Homepage repositioning around audience 1 + kill the keyword list. *(content, with Q)*
8. Analytics (GoatCounter). *(Q's decision)*
9. Responsive images / lightbox for dashboards.
10. Font subsetting + drop unused weights.
11. Remove Tailwind (with visual regression QA).

**P3 — polish / infrastructure:**

12. CI Node LTS + split steps. **(done)**
13. `--line-soft` token. **(done)**
14. `dependabot.yml`, `/llms.txt`, delete CNA leftover SVGs.
15. `BRAND.md` + spacing scale tokens.
16. axe smoke test + broken-link check in CI.
17. Custom domain + Cloudflare (recommendation; needs authorization).
18. Astro evaluation at the next major content expansion (ADR).

---

## Architecture Decision Record

### ADR-001 — Keep Next.js static export on GitHub Pages now; formally re-evaluate Astro at the next major content/IA expansion

**Status:** Accepted (2026-08-30)

**Context:** The site renders as fully static HTML. It ships ~179 KB gzipped first-load JS to hydrate two small interactive pieces (mobile menu, project scroll-to). Next.js App Router provides the metadata API, `generateStaticParams`, typed routing, and `next/image` — all used. Astro would reduce client JS to ~0 for the same pages while keeping component authoring and a content-collection model, at the cost of a migration and losing Next-specific ergonomics.

**Options:**

- **A. Keep Next.js, refine.** Zero migration risk. Standing ~179 KB JS tax. Drop unused Tailwind, subset fonts, add responsive images — recovers most of the *perceived* performance without a rewrite.
- **B. Migrate to Astro now.** Best end-state performance. Migration cost is real (rebuild 7 route types, port `globals.css`, re-do metadata + sitemap + robots, re-do 41 tests, re-verify a11y). High opportunity cost during an active build-out.
- **C. Migrate to Cloudflare Pages, keep Next.** Solves headers + analytics, not JS weight.
- **D. Plain HTML/CSS + a tiny build.** Lowest weight, highest authoring friction as content grows.

**Decision:** **A now, with a scheduled re-evaluation.** The JS weight is a real cost but not a launch blocker; LCP is text, not image, and the edge cache serves the Thai audience well. Migrating mid-build trades a known-good baseline for weeks of porting. Do the cheap perf wins under Next (Tailwind removal, font subsetting, responsive images). **Trigger for re-evaluation:** when `/services`, `/labs`, and `/notes` are added (i.e. the IA roughly doubles) — at that point the migration is amortized over a larger surface and worth a spike.

**Consequences:** accept ~179 KB JS short-term; commit to the cheap perf tasks; write the Astro spike as a defined future task with a measured before/after.

**Rollback:** N/A (no change). If B is chosen later, keep the Next branch deployable until the Astro build passes the same 41-test-equivalent suite and an a11y + Lighthouse check.

### ADR-002 — Stay on GitHub Pages; move to Cloudflare Pages when a custom domain, security headers, analytics, or a form endpoint is needed

**Status:** Accepted (2026-08-30)

**Context:** GitHub Pages cannot set `CSP`/`X-Frame-Options`/`Referrer-Policy`/`Permissions-Policy` and has no functions or built-in analytics. Today there are no third-party scripts and no forms, so exposure is low.

**Decision:** remain on GitHub Pages until any one of: a custom domain is purchased, a contact form endpoint is required, privacy-friendly analytics is adopted, or a real need for response headers appears. Then migrate the **unchanged static export** to Cloudflare Pages and add `_headers` + Turnstile-protected Pages Functions + Web Analytics.

**Consequences:** the site is framable and lacks defense-in-depth headers in the interim (accepted — no auth, no actions, no third-party JS). Migration later is low effort because the build artifact does not change.

**Rollback:** DNS `CNAME` back to `github.io`; the GitHub Pages workflow stays in the repo, disabled not deleted.

### ADR-003 — Add JSON-LD structured data from static, non-user data only

**Status:** Accepted (2026-08-30)

**Context:** No structured data today; weak in rich results and as an entity for AI answer engines.

**Decision:** emit `Person` + `WebSite` on every page (shell) and `CreativeWork` + `BreadcrumbList` on `/work/[slug]`, serialized from static objects derived from `projects.ts` and a small identity constant. Never interpolate untrusted input. No `AggregateRating`, `Review`, `Organization`, or `Offer` with fabricated data.

**Consequences:** small HTML size increase; better SEO/GEO; must keep the identity constant accurate.

**Rollback:** delete the `<script type="application/ld+json">` emitters; no other code depends on them.

---

## Implemented Changes

Two passes on branch `audit/master-portfolio-evolution`.

### Pass 1 — low-risk / high-confidence

1. **Styled `/contact`, `/archive`, `404`** — `globals.css` rules for `.contact-register`, `.contact-route*`, `.archive-register`, `.archive-row*`, `.not-found-page`, `.source-link`, using existing tokens and the hairline-rule language. No new visual primitives.
2. **Defined `--line-soft`** token (`#efeee9`) so `.project-impact` borders render; added a test that every `--line-*` var referenced in the CSS is also defined.
3. **JSON-LD** — `src/lib/structured-data.ts` + `src/components/seo/json-ld.tsx`; `Person` + `WebSite` in `layout.tsx`, `CreativeWork` + `BreadcrumbList` in `work/[slug]`. Identity in `src/content/identity.ts` (name, GitHub `sameAs`, `knowsAbout` — all factual).
4. **Bilingual `lang`** — `src/lib/i18n.ts` (`textLang()`); `lang="th"` on Thai `displayTitle` / `limitations` on `/`, `/work`, `/work/[slug]`; `:lang(th) { line-height: 1.7 }`.
5. **Case-study forward path** — replaced the backward `.project-cta` with a `.project-cta__forward` (contact + "All work") plus a previous/next `nav[aria-label="More projects"]`.
6. **External link consistency** — `target="_blank" rel="noopener noreferrer"` on `/work/[slug]` hero + evidence links.
7. **Sitemap `lastModified`**.
8. **CI** — `node-version: 22`, `engines` in `package.json`, verify block split into discrete steps.

### Pass 2 — after Q's "make it the best" instruction (contact channel = email; analytics = deferred; positioning = stay broad)

9. **Contact channel** — `/contact` rebuilt: GitHub + an **obfuscated email** route (`adulsaa.q@gmail.com`, assembled client-side via `useSyncExternalStore` so the server HTML carries no `mailto:` and no joined address — `src/components/contact/obfuscated-email.tsx`, config in `src/content/contact.ts`) + a Fastwork slot that renders live the moment a URL is set in config, otherwise a visibly-pending placeholder + a "what helps in a first message" note + working-hours timezone. `id="work-enquiries"` moved onto the email route so the homepage/case-study anchors resolve.
10. **Removed Tailwind** — `@import "tailwindcss"` and `@tailwindcss/postcss` deleted (zero utilities were used); replaced with an explicit ~25-line reset (margins, list-style, box-sizing, control `font`/`color` inherit). `postcss.config.mjs` removed. CSS −1.8 KB raw; one dependency and one build plugin gone.
11. **Font subsetting** — the 11 full `@fontsource` imports (55 `woff2`, ~740 KB) replaced with Latin + Thai subset imports at weights 400/600/700 only (**10 `woff2`, ~172 KB**).
12. **`/services` page** — new route from the `/about` capability register, framed as three bounded services (who it's for, problem, inputs, deliverables, where it stops, demonstrated-in link). Added "Services" to primary nav + sitemap; forward CTAs added to `/about` and the homepage hero ("How to work with me").
13. **Thicker case-study evidence** — wired 3 previously-unreferenced committed dashboard screenshots into the content model (`ecommerce` +2 real Power BI pages, `shopee` +1 customer-analytics page) with honest alt text and "demonstration / simulated data" captions.
14. **Image lightbox** — `src/components/project/zoomable-image.tsx`: artifact screenshots open full-size in a native `<dialog>` (focus-trapped, Esc-closable, backdrop-dismiss), loaded only on click.
15. **`year` → `kind`** — the `Project` field that rendered "Work / Case study" awkwardly is now a named `kind` descriptor.
16. **Repo hygiene** — deleted 5 Create-Next-App leftover SVGs and 5 unreferenced large PNGs (`out/` 8.4 MB → **5.1 MB**).
17. **`dependabot.yml`** (npm + github-actions, weekly, grouped, framework majors ignored, no auto-merge).
18. **`public/llms.txt`** — ~40-line plain-text entity + project summary for AI answer engines, synced to `projects.ts` and the evidence rules.
19. **`docs/BRAND.md`** — one-page identity system (mark, wordmark, tokens, type scale, spacing tokens `--space-1..8`, motion, voice).
20. **CI + tests** — `scripts/check-links.mjs` (dependency-free internal-link check) added as a CI step; new test files `structured-data`, `services`, `a11y-smoke` (one `<h1>` + labelled `main` + no empty links/buttons on every route). **68 tests / 12 files** (from 41 / 9).

No dependencies were added (one removed). No content claim was weakened or fabricated. No external service, analytics vendor, domain, or DNS change was made.

---

## Deferred Changes

| Item | Why deferred | Owner decision needed |
|---|---|---|
| Analytics vendor | Q chose "later — keep as plan". Recommend GoatCounter (cookieless, free) when ready | Yes — when ready |
| Fastwork URL | Config slot ready (`src/content/contact.ts` → `fastworkUrl`); paste the approved URL to activate | Yes — provide URL |
| Homepage repositioning to a narrow audience | Q chose to **stay broad**; `/services` and the hero were built broad accordingly | No (decided: stay broad) |
| Custom domain + Cloudflare (+ real security headers) | Purchase + DNS — requires authorization. Migration checklist in the Implementation Plan | Yes |
| Contact form / structured brief intake | Only if Q wants more than email; needs a provider (Web3Forms) or Cloudflare Function | Yes — if wanted |
| Responsive image `srcset` (build-time `sharp` resize) | The lightbox covers readability; multi-width generation is a larger build task | No |
| `Project` model: `tradeoffs[]`, explicit `idealClient` per project | Per-project copy authoring | Partly (Q writes copy) |
| Astro evaluation | Scheduled to the next IA expansion (ADR-001) | No |
| `gitleaks` / EXIF-strip in CI | Follow-up hardening | No |

---

## Verification Results

Branch `audit/master-portfolio-evolution`, after both passes:

| Check | Baseline | After |
|---|---|---|
| `npm test` | 41 / 9 files | **68 / 12 files** |
| `npm run lint` | clean | **clean** (no warnings) |
| `npm run typecheck` | clean | **clean** |
| `npm run build` | 15 routes | **16 routes** (adds `/services`) |
| `npm run check:links` | n/a | **13 pages, 0 broken internal links** |
| `npm audit --omit=dev` | 0 vulnerabilities | **0** (one dep removed, none added) |
| `out/` total size | 8.4 MB | **5.1 MB** |
| First-load fonts | 55 `woff2` / ~740 KB | **10 `woff2` / ~172 KB** |
| CSS (gzip) | ~8.1 KB | **~5.5 KB** |

Built-output spot checks:

- `/contact` — GitHub link, obfuscated email (`[at]` form in server HTML, no `mailto:`, no joined address), pending Fastwork placeholder, first-message note. `#work-enquiries` anchor resolves.
- `/services` — renders 3 services, each links to a case study or the archive, plus a contact CTA. In nav + sitemap.
- `/` — `Person` + `WebSite` JSON-LD; hero links to `/services`; `lang="th"` on the Thai title.
- `/work/*` — `CreativeWork` + `BreadcrumbList` JSON-LD; previous/next nav; contact CTA; `ecommerce` shows 3 artifact images, `shopee` shows 3.
- `/llms.txt` served; `robots.txt` + `sitemap.xml` (16 `<loc>`, all `<lastmod>`) intact.
- `check:links` clean across all 13 HTML pages.

**Not verified (needs a browser / real devices):** Thai glyph rendering after the font subset change (per-glyph fallback to IBM Plex Sans for Latin is expected to be correct but was not visually confirmed); the `<dialog>` lightbox interaction; responsive behaviour at 768–900px; screen-reader reading of `lang="th"` fragments.

---

## Remaining Risks

1. **Analytics still absent** — every change here is unmeasurable until Q adds one (deferred by choice).
2. **Fastwork loop still open** — the homepage/services CTAs point at email; the Fastwork slot is inert until Q supplies the URL.
3. **Font subset change is unverified visually** — if the Thai `woff2` subset lacks a needed Latin glyph in a Thai-marked string, that glyph falls to IBM Plex Sans (same superfamily, visually fine) or system sans. Low risk; confirm on the deployed site.
4. **`design-system.test.ts` / `a11y-smoke` string assertions** will need updating on future CSS/markup refactors — accepted trade-off.
5. **Positioning stays broad** by Q's decision — the "speaks to everyone" risk from the audit is accepted, not resolved.
6. **GitHub Pages headers** — the site is still framable; accepted until a Cloudflare move.
7. **`/services` copy** is derived from the `/about` register; Q should read it once for tone and accuracy before it goes live.
8. **Deleted PNGs / SVGs** are recoverable from git history if any were wanted for a future case study.
7. **Thai copy naturalness** needs a native review pass that this audit cannot perform.
8. **Single maintainer, hand-edited TypeScript content** — fine now, but the `whatYouGet`/`idealClient` model additions will increase per-project authoring effort.
