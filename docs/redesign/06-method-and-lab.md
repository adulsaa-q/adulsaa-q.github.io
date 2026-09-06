# Phase 8: Method & Lab Implementation Specification

**Status:** COMPLETE  
**Primary Routes:** `/method`, `/lab` (with preserved legacy compatibility for `/services`, `/about`, and `/archive`)  
**Target Design Thesis:** `PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE`  
**Automated Tests:** 83 tests passing across 15 suites (including `tests/method-and-lab.test.tsx`, `tests/phase-seven-pages.test.tsx`, `tests/services.test.tsx`)

---

## 1. The Method Page (`/method`)

The `/method` route unifies the architectural philosophy with concrete, bounded engagement models. It directly solves the fragmentation between separate `/about` and `/services` routes by presenting a coherent engineering philosophy.

### Architectural Structure:
1. **Philosophy Statement:** *"Start with the operational source."* Explains that data modeling begins with raw exports, rules, and failure modes rather than fabricated claims.
2. **The Core Triad:**
   - `01 / TRACE`: Every material claim points back to code, tests, documentation, or committed artifacts.
   - `02 / MODEL`: Legible transformation pipelines separating inputs, logic, and outputs.
   - `03 / BOUND`: Clear statements of what is not proven, keeping simulation and implementation limits explicit.
3. **Bounded Engagement Models:**
   - **Model 01:** *Dashboard & Reporting Systems* (Marketplace/finance exports, conformed dimensional models, DAX registers).
   - **Model 02:** *Data Pipelines & Operational Automation* (Spreadsheet replacement, validation tiers, idempotent database loading).
   - **Model 03:** *Analytics Engineering & Data Modeling* (SQL analysis modules, conformed star schemas, data dictionaries).
4. **4-Stage Delivery Lifecycle:**
   - `01 DISCOVER`: Audit sample data and operational decision points.
   - `02 DEFINE`: Establish dimensional schema, validation tiers, and test criteria.
   - `03 BUILD`: Construct Power Query transforms, SQL modules, and DAX measures.
   - `04 VERIFY & HANDOVER`: Execute automated tests, limitation declarations, and handover specs.

---

## 2. The Systems Laboratory (`/lab`)

Rebranding `/archive` into `/lab` elevates experimental prototypes into a living systems research environment.

### Registered Prototypes:
1. **`schema-map`:** PostgreSQL metadata to Markdown/Obsidian relationship map.
2. **`fastwork-status`:** Operational service status board and response-time monitoring prototype.
3. **`kbank-finance-pipeline`:** KBank statement transaction extraction and ledger reconciliation toolkit.
4. **`housemark`:** Deterministic frontend engineering standard and code craftsmanship rulebook.

Each record explicitly documents:
- Prototype status badge (`ARCHIVE` vs `EXPERIMENTAL`).
- Purpose and architectural summary.
- Strict operational boundaries and limitation declarations.
- Direct link to committed GitHub repository.

---

## 3. Backward Compatibility & Routing Integrity

- Canonical navigation points to `/work`, `/method`, `/lab`, `/contact`.
- `/services`, `/about`, and `/archive` remain fully functional and tested, ensuring that existing links, external citations, and bookmarks never encounter a 404.
- Sitemap (`sitemap.xml`) includes all primary and legacy routes.
- Internal link checker (`scripts/check-links.mjs`) validates that all 15 HTML pages have 0 broken links.
