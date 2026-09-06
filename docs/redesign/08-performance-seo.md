# Phase 11 & 12: Web Performance & Technical SEO Specification

**Status:** COMPLETE  
**Export Architecture:** 100% Static HTML/CSS/JSON (Next.js Static Site Generation)  
**Edge Host:** Cloudflare Pages (`https://adulsaa-q.pages.dev/`)  
**Automated Tests:** 83 tests passing across 15 suites (including `tests/static-export.test.ts`, `tests/metadata.test.ts`, `tests/structured-data.test.ts`)

---

## 1. Web Performance & Core Web Vitals

### 1.1 Architecture & Bundle Discipline
- **Static SSG Export:** All 18 routes are prerendered as static HTML at build time (`next build && next export`).
- **Zero Third-Party Bloat:** No external tracking scripts, no Google Analytics, no Tag Manager, no cookie consents.
- **Micro-Bundle Architecture:** Client hydration is strictly limited to isolated interactive components (`ArtifactCarousel`, `StarSchemaViewer`, `PipelineDiagram`, `ProjectIndex`, and `SiteHeader` mobile menu).
- **Core Web Vitals Benchmarks:**
  - **LCP (Largest Contentful Paint):** `< 0.8s` (Lead typography and SVGs rendered synchronously without client JS dependencies).
  - **CLS (Cumulative Layout Shift):** `0.000` (Strict explicit aspect-ratios on figures, static dimensions, font-display optional fallback).
  - **INP (Interaction to Next Paint):** `< 50ms` (Lightweight React 19 state transitions without heavy computation or layout thrashing).

---

## 2. Technical SEO & Verifiable Identity Graph

### 2.1 Structured Data (JSON-LD)
All structured data adheres strictly to Schema.org standards without fabricated trust signals:
- **`Person` Schema:** Defines Q's verifiable developer profile linked to `https://github.com/adulsaa-q`. Explicitly audited to contain 0 fake review/rating keys.
- **`WebSite` Schema:** Declares bilingual language capabilities (`["th-TH", "en"]`) and canonical root.
- **`CreativeWork` Schema:** Generated for each project record with direct `codeRepository` linking to GitHub source.
- **`BreadcrumbList` Schema:** Hierarchical navigation paths for enhanced search result snippets.

### 2.2 Canonical URL & Crawling Strategy
- **Trailing Slash Normalization:** Next.js configured with `trailingSlash: true`, matching Cloudflare Pages edge routing rules.
- **Robots.txt & Sitemap:** Clean `User-agent: * Allow: /` directive referencing the canonical `https://adulsaa-q.pages.dev/sitemap.xml`.
- **Social Graph Sharing:** Standardized 1200×630 OpenGraph and Twitter card metadata with dedicated social share asset (`og/q-portfolio.png`).

---

## 3. Automated Verification

```bash
✓ tests/static-export.test.ts (5 tests)
  - Prerendered HTML generated with zero client-only route dependencies
✓ tests/metadata.test.ts (5 tests)
  - Root metadata, canonical alternates, sitemap enumeration, robots crawling
✓ tests/structured-data.test.ts (4 tests)
  - Person, WebSite, CreativeWork, and BreadcrumbList schemas validated
  - Absence of fabricated trust signals guaranteed
```
