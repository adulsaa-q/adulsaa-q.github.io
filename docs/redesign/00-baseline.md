# PHASE 0: DISCOVERY & BASELINE REPORT

**Target Production:** `https://adulsaa-q.pages.dev/`  
**Commit:** `fae288a`  
**Date:** September 2026  
**Status:** `BASELINE VERIFIED (HEALTHY)`  

---

## 1. CURRENT SYSTEM ARCHITECTURE

| Dimension | Specification |
|---|---|
| **Framework** | Next.js 16.3.3 (App Router with Turbopack) |
| **React Runtime** | React 19.2.8 / React-DOM 19.2.8 |
| **Language** | TypeScript 5.x (Strict mode enabled) |
| **Export Strategy** | Static Site Generation (`output: "export"`, `trailingSlash: true`) |
| **Hosting Target** | Cloudflare Pages (Direct edge deployment via GitHub Actions) |
| **Typography** | `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-sans-thai`, `@fontsource/ibm-plex-mono` |
| **Styling Engine** | Authored CSS (`src/app/globals.css`) with 100% OKLCH tokens |
| **Quality Suite** | Vitest 4.1.0, JSDOM 30.0.1, ESLint 9 (Flat Config), Link Checker |
| **Tracking / Privacy** | 0 trackers, 0 third-party analytics, 0 cookies, 0 external runtime scripts |

---

## 2. BASELINE HEALTH METRICS (ALL CHECKS PASSED)

* **Unit & Component Tests (`npm test`):** **13 / 13 test files passed, 74 / 74 tests passed (100%)**
  * `tests/pages.test.tsx`: 10 passed
  * `tests/artifact-carousel.test.tsx`: 3 passed
  * `tests/a11y-smoke.test.tsx`: 15 passed
  * `tests/design-system.test.ts`: 12 passed
  * `tests/site-shell.test.tsx`: 4 passed
  * `tests/phase-seven-pages.test.tsx`: 7 passed
  * `tests/services.test.tsx`: 3 passed
  * `tests/project-index.test.tsx`: 1 passed
  * `tests/structured-data.test.ts`: 4 passed
  * `tests/metadata.test.ts`: 5 passed
  * `tests/static-export.test.ts`: 5 passed
  * `tests/content-validation.test.ts`: 3 passed
  * `tests/projects.test.ts`: 2 passed
* **Linter (`npm run lint`):** Clean (0 errors, 0 warnings).
* **Type Checker (`npm run typecheck`):** Clean (0 TypeScript errors).
* **Production Static Build (`npm run build`):** Compiled successfully in 1.5s; 16 static HTML pages generated.
* **Internal Links (`npm run check:links`):** 13 routes checked, 0 broken links.

---

## 3. SITEMAP & ROUTE MAP

| Route | Content File | Render Pattern | Primary Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Static (SSG) | Core thesis, Hero preview, Selected Systems, Pipeline, Principles |
| `/work` | `src/app/work/page.tsx` | Static (SSG) | Complete project register with scope tags and GitHub links |
| `/work/ecommerce-sales-pipeline` | `src/app/work/[slug]/page.tsx` | Static (SSG) | Case study: Multi-channel marketplace pipeline (Shopee/Lazada) |
| `/work/shopee-thailand-analytics` | `src/app/work/[slug]/page.tsx` | Static (SSG) | Case study: Simulated marketplace SQL modules & star schema |
| `/work/finance-etl-pipeline` | `src/app/work/[slug]/page.tsx` | Static (SSG) | Case study: KBank e-statement PDF to PostgreSQL idempotent ETL |
| `/work/timelimit` | `src/app/work/[slug]/page.tsx` | Static (SSG) | Case study: Offline macOS menu-bar desktop instrument |
| `/services` | `src/app/services/page.tsx` | Static (SSG) | 3 bounded capability offers and deliverables |
| `/about` | `src/app/about/page.tsx` | Static (SSG) | Working philosophy and duplicated capability list |
| `/archive` | `src/app/archive/page.tsx` | Static (SSG) | Table of 4 experimental/archived projects |
| `/contact` | `src/app/contact/page.tsx` | Static (SSG) | Direct contact routes (GitHub, Email, Fastwork) |
| `/_not-found` | `src/app/not-found.tsx` | Static (SSG) | Custom 404 error page |

---

## 4. INVENTORY OF EXISTING COMPONENTS

* **Layout:**
  * `src/components/layout/site-header.tsx`: Hairline bar, logo, desktop navigation, mobile hamburger drawer, theme toggle.
  * `src/components/layout/site-footer.tsx`: Minimal footer with commit record, timestamp, and copyright.
* **Homepage:**
  * `src/components/home/hero-preview.tsx`: Interactive Evidence.dev-style data engine (SQL preview, Star Schema highlight, simulation runner).
  * `src/components/diagram/pipeline-diagram.tsx`: 4-stage pipeline diagram (`DATA ➔ MODEL ➔ DECISION ➔ HANDOVER`) with stage inspector drawer.
  * `src/components/home/tech-marquee.tsx`: Categorized technology pills (`BI & SQL`, `Data Pipelines`, `Engineering & Tools`).
  * `src/components/home/stat-strip.tsx`: Verifiable portfolio-at-a-glance ledger (counted from content, zero fabricated claims).
* **Project & Artifacts:**
  * `src/components/project/artifact-carousel.tsx`: Interactive BI Artifact Carousel with segmented plate tabs, macOS window frame, roving focus, live region counter, and deep-zoom dialog.
  * `src/components/project/project-index.tsx`: Keyboard-accessible jump index for featured projects.
  * `src/components/project/zoomable-image.tsx`: Click-to-enlarge screenshot viewer with native `<dialog>`.
* **Contact & SEO:**
  * `src/components/contact/obfuscated-email.tsx`: Plain-text spam-harvesting protection.
  * `src/components/seo/json-ld.tsx`: Schema.org structured data injection.

---

## 5. STRENGTHS & COMPETITIVE MOATS

1. **Uncompromising Data Honesty:** Demonstration data is explicitly declared (`[data-scope-label="simulated"]`). Claims connect directly to committed Power Query (`.pq`), DAX (`.md`), or SQL (`.sql`) files.
2. **Pure White Architectural Substrate:** The commitment to `oklch(1 0 0)` / `#ffffff` with hairline boundaries creates a clean, blueprint-like presence that stands out against dark-mode cliches.
3. **High Contrast:** Text contrast reaches 19.4:1 (WCAG AAA) on primary reading surfaces.
4. **Performance Foundation:** Pure static export with 0 runtime JavaScript bloat.

---

## 6. PRIMARY UX DEFICITS & FRICTION POINTS

1. **Cardification Overload:** Extensive use of border containers (`.work-card`, `.capability-record`, `.project-entry`) fragments page rhythm.
2. **Cognitive Inversion in Hero:** Complex SQL simulation demands high mental effort before establishing relevance and emotional clarity.
3. **Information Architecture Duplication:** `/services` and `/about` repeat the identical 3 capability items.
4. **Uniform Case Study Pacing:** Case studies repeat an identical 2-column split across 5 sections, creating visual monotony.
5. **Passive Archive:** `/archive` presents experimental work like a static graveyard instead of an active systems laboratory.

---

## 7. CONSTRAINTS & SENSITIVITIES

* **Vitest Negative Assertions (`tests/pages.test.tsx`):**
  * Must NOT contain raw marketing terms matching `/\b(revenue|ROI|users?|clients?)\s*(increased|grew|\+?\d)/i`.
  * Homepage must NOT contain the number `"300,000"` (scoped exclusively to the case study).
* **CSS Token Enforcement (`tests/design-system.test.ts`):**
  * NO raw hex (`#...`) or rgb/hsl literals anywhere in `globals.css`.
  * Any `gradient(` declaration must only reference semantic tokens (`var(--(signal|surface|text|line)-...)`).
  * Hero desktop min-height must remain `<= 34rem`.
  * All referenced `--line-*`, `--surface-*`, `--text-*`, and `--signal-*` tokens must be explicitly defined in `:root`.
* **Static Export Constraint (`next.config.ts`):**
  * `output: "export"` prohibits dynamic Node.js server handlers. All routes must be statically pre-rendered via `generateStaticParams`.
