# Changelog

All notable changes to the **Q Personal Technology Portfolio** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-06

### Major Redesign: The Observable System
Execution of the comprehensive autonomous redesign based on `PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE`.

#### Added
- **Design Substrate:** Standardized mathematical OKLCH semantic token system in `globals.css` with zero raw hex literals and 19.4:1 AAA contrast ratio.
- **Navigation Pillars:** Consolidated top-level navigation into 4 unambiguous pillars: `WORK`, `METHOD`, `LAB`, `CONTACT`.
- **Method Page (`/method`):** Unified architectural philosophy, 3 bounded capability offers, and 4-stage delivery lifecycle (`Discover`, `Define`, `Build`, `Verify & Handover`).
- **Systems Laboratory (`/lab`):** Rebranded and upgraded experimental prototypes repository (`schema-map`, `fastwork-status`, `kbank-finance-pipeline`, `housemark`).
- **Interactive BI Artifact Carousel (`ArtifactCarousel`):**
  - WAI-ARIA APG Tabs with roving keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
  - Native HTML5 `<dialog>` modal deep-zoom inspection with focus trapping and `Escape` key restoration.
  - Accessible slide counter with `aria-live="polite"` status region.
- **Interactive Dimensional Schema Explorer (`StarSchemaViewer`):**
  - Interactive dimensional model blueprint for `ecommerce-sales-pipeline` and `shopee-thailand-analytics`.
  - Fact vs Dimension entity classification, primary/foreign key inspection, and field registers.
- **Editorial Project Register:** Refactored `/work` from card containers into an authoritative register with monospace indexing, scope classification badges, verified technology tags, and register statistics strip.
- **Responsive Touch Optimizations:** Enforced minimum 44×44px hit targets across mobile viewports.
- **Documentation Deliverables:**
  - `docs/redesign/00-baseline.md`
  - `docs/redesign/01-foundation.md`
  - `docs/redesign/02-information-architecture.md`
  - `docs/redesign/03-homepage.md`
  - `docs/redesign/04-work-case-studies.md`
  - `docs/redesign/05-interactions.md`
  - `docs/redesign/06-method-and-lab.md`
  - `docs/redesign/07-responsive-accessibility.md`
  - `docs/redesign/08-performance-seo.md`
  - `docs/redesign/09-final-qa.md`
  - `docs/redesign/10-production-readiness.md`
  - `DECISIONS.md`
  - `MASTER_CHECKLIST.md`

#### Changed
- **Homepage Hero:** Calm curiosity-first hero with Interactive Proof Token revealing dimensional depth on demand.
- **Site-Wide De-Cardification:** Replaced arbitrary rounded card boxes with 1px hairline blueprint rules (`var(--line-primary)`).
- **Case Study Anatomy:** Refactored case study layout to follow the 11-stage verifiable evidence anatomy.
- **Backward Compatibility:** Preserved legacy routes `/services`, `/about`, and `/archive` with 100% test coverage.

#### Security & Quality
- 83/83 Vitest automated tests passing across 15 test files.
- 0 ESLint errors or warnings.
- 0 TypeScript compiler errors (`tsc --noEmit`).
- 18/18 static SSG pages generated with Next.js Turbopack export.
- 0 broken internal links verified via `scripts/check-links.mjs`.
