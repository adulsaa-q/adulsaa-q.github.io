# Phase 5 & 6: Work Index Refactor & Case Study Evidence System

**Status:** COMPLETE  
**Routes:** `/work`, `/work/[slug]`  
**Target Design Thesis:** `PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE`  
**Automated Tests:** 83 passing across 15 suites (including `tests/pages.test.tsx`, `tests/a11y-smoke.test.tsx`, `tests/star-schema-viewer.test.tsx`)

---

## 1. Work Index (`/work`) Transformation

The `/work` route was refactored from generic decorative cards into an authoritative **Editorial Project Register** that models software and data engineering artifacts with tabular rigor.

### Key Architectural Enhancements:
1. **Register Overview Statistics Strip (`.work-register-stats`):**
   - Pure OKLCH tabular-nums summary: Total Systems (04), Evidence-Led Systems (02), Simulated Case Studies (02), and Total Verifiable Evidence Links (16).
2. **Editorial Project Rows (`.work-card`):**
   - **Numerical Index Column (`.work-card__number-col`):** Monospace 2-digit indexing (`01`–`04`) paired with uppercase architectural category (`CASE STUDY`, `SIMULATED CASE STUDY`, `PIPELINE CASE STUDY`).
   - **Main Ledger Column (`.work-card__main`):**
     - Bilingual Title Header with interactive link to `/work/[slug]`.
     - Explicit scope badge (`EVIDENCE LED` vs `SIMULATED`).
     - Executive operational summary with 68ch measure line clamp.
     - Technology Stack pill tags (`.work-card__tag`).
     - 4-part metadata specification: Services, Operational impact, Inputs, and Boundaries.
   - **Actions Column (`.work-card__actions`):**
     - Direct tactile inspection link (`↗`).
     - Verified external GitHub repository link (`GitHub source`).

---

## 2. Case Study Evidence System (`/work/[slug]`)

Every case study page follows the verifiable **11-Stage Evidence Anatomy**:

| Stage | Section / Component | Content & Verifiable Evidence |
|---|---|---|
| **01. Context** | `DetailSection index="01"` | Messy operational realities (e.g. inconsistent marketplace exports, e-statement PDF layouts). |
| **02. Problem** | `DetailSection index="01"` | Analytical failure modes (e.g. comparing incomplete current months directly to full prior months). |
| **03. Inputs** | `DetailSection index="02"` | Precise raw feeds (e.g. Shopee Seller Center, Lazada exports, Gmail IMAP attachments). |
| **04. Constraints** | `DetailSection index="01"` | Concrete operational limits (synthetic data, no live API credentials). |
| **05. System** | `DetailSection index="02"` | Conformed dimensional model architecture (`Fact_Orders`, `DimDate`, `DimProduct`). |
| **06. Decisions** | `DetailSection index="03"` | Documented architectural decisions and their rationales. |
| **07. Implementation** | `DetailSection index="02"` | Power Query M scripts, MySQL/PostgreSQL queries, and DAX measure formulas. |
| **08. Output** | Lead `ArtifactCarousel` | Interactive high-resolution plates with deep-zoom native `<dialog>`. |
| **09. Impact** | `DetailSection index="01"` | Measurable operational clarity gained (eliminated manual export stitching). |
| **10. Evidence** | `DetailSection index="05"` | Verifiable public repository links with explicit classification tags (`VERIFIED_CODE`, `VERIFIED_ARTIFACT`, `SIMULATED`). |
| **11. Limitations** | `DetailSection index="06"` | Transparent boundaries of what the public repository does not prove. |

---

## 3. Interactive Star Schema Explorer (`StarSchemaViewer`)

To turn static documentation into an inspectable engineering instrument, `src/components/project/star-schema-viewer.tsx` was engineered:
- **Fact vs Conformed Dimension Classification:** Clear visual and semantic distinction between fact tables (measurable events) and conformed dimensions (filtering/slicing).
- **Interactive Node Selection:** Clicking or keyboard-focusing any table node reveals primary keys, foreign key joins, column registers, and architectural explanations.
- **WAI-ARIA Tablist Semantics:** Accessible `role="tablist"` and `role="tab"` navigation with keyboard enter/space activation.
- **Pure OKLCH Semantic Tokens:** High-contrast blueprint styling without raw hex/rgb values.

---

## 4. Verification Results

```bash
✓ tests/pages.test.tsx (10 tests)
✓ tests/a11y-smoke.test.tsx (19 tests)
✓ tests/star-schema-viewer.test.tsx (3 tests)
✓ tests/artifact-carousel.test.tsx (3 tests)
✓ 15 test files, 83 tests passing
✓ Next.js static build: 18/18 static SSG pages generated
✓ Link validation: 15 pages checked, 0 broken internal links
```
