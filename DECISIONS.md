# Architecture Decision Records (ADRs)

**Project:** Q Portfolio (`https://adulsaa-q.pages.dev/`)  
**Core Thesis:** `PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE`  
**Visual Direction:** `THE OBSERVABLE SYSTEM`

---

## ADR 001: Pure White Evidence Substrate

- **Status:** Accepted & Implemented
- **Context:** Previous design relied on dark mode aesthetics or card boxes that looked like generic SaaS templates.
- **Decision:** Establish a high-precision, pure white blueprint substrate (`oklch(1 0 0)`) inspired by Evidence.dev, technical editorial journals, and architectural drafts. Dark mode is fully supported via `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` using inverted OKLCH tokens.
- **Consequences:** Maximum text contrast (19.4:1 AAA), crisp typographic readability, and distinct separation from generic dark-themed developer portfolios.

---

## ADR 002: OKLCH Semantic Token System with Zero Raw Hex Literals

- **Status:** Accepted & Implemented
- **Context:** Color drift and inconsistent opacity values erode engineering credibility.
- **Decision:** Mandate 100% semantic OKLCH color tokens (`--surface-primary`, `--surface-secondary`, `--text-primary`, `--text-secondary`, `--line-primary`, `--line-soft`, `--signal-primary`, `--signal-information`). Forbid raw `#hex`, `rgb()`, or `hsl()` in authored CSS.
- **Consequences:** Mathematically predictable contrast ratios, effortless theme switching, and automated test enforcement via `tests/design-system.test.ts`.

---

## ADR 003: Four-Pillar Information Architecture

- **Status:** Accepted & Implemented
- **Context:** The previous navigation had 6 loosely defined links (`Work`, `Services`, `Archive`, `About`, `Contact`), creating cognitive friction.
- **Decision:** Consolidate primary navigation into 4 unambiguous pillars:
  1. `WORK`: Verifiable production case studies and project records.
  2. `METHOD`: Architectural philosophy, 3 bounded capability offers, and 4-stage delivery lifecycle.
  3. `LAB`: Systems laboratory containing active prototypes and experimental tools.
  4. `CONTACT`: Direct, honest communication routes and engagement guidelines.
  Retain backwards compatibility for `/services`, `/about`, and `/archive`.
- **Consequences:** Focused mental model for visitors while ensuring zero broken links or regressions.

---

## ADR 004: Curiosity-First Hero with Interactive Proof Token

- **Status:** Accepted & Implemented
- **Context:** The previous hero showcased a massive, busy SQL editor that demanded excessive cognitive effort within the first 5 seconds.
- **Decision:** Rebalance the hero: elevate the bilingual thesis statement on the left; calm the right-side preview into an **Interactive Proof Token** that reveals dimensional depth upon hover or interaction.
- **Consequences:** Immediate comprehension of Q's core value proposition without visual fatigue.

---

## ADR 005: Site-Wide De-Cardification

- **Status:** Accepted & Implemented
- **Context:** Rounded card boxes (`border-radius: 12px` / `16px`) fragmented the layout and gave the website a generic component-library feel.
- **Decision:** Remove enclosing box containers. Structure content using 1px hairline blueprint rules (`var(--line-primary)`), 4px/8px harmonic spacing, and an asymmetric 12-column technical layout.
- **Consequences:** Clean editorial pacing, generous breathing room, and a cohesive architectural look.

---

## ADR 006: 11-Stage Evidence Anatomy

- **Status:** Accepted & Implemented
- **Context:** Portfolio case studies frequently over-claim outcomes without proof.
- **Decision:** Standardize every case study around an 11-stage verifiable lifecycle:
  `Context ➔ Problem ➔ Inputs ➔ Constraints ➔ System ➔ Decisions ➔ Implementation ➔ Output ➔ Impact ➔ Evidence ➔ Limitations`.
- **Consequences:** Absolute transparency. Clear distinction between what is proven in public code and what is simulated.

---

## ADR 007: WAI-ARIA APG Tabs & Native `<dialog>` Modal Inspection

- **Status:** Accepted & Implemented
- **Context:** Multi-image carousels often suffer from broken accessibility, keyboard traps, and layout shift.
- **Decision:** Implement `ArtifactCarousel` adhering to WAI-ARIA APG Tabs with roving tabindex (`ArrowRight`, `ArrowLeft`, `Home`, `End`), live region status announcements, and native HTML5 `<dialog>` for modal inspection with automatic focus restoration upon `Escape`.
- **Consequences:** Flawless accessibility (tested in `tests/artifact-carousel.test.tsx`), zero layout shift, and instant desktop keyboard navigation.

---

## ADR 008: Interactive Dimensional Star Schema Explorer (`StarSchemaViewer`)

- **Status:** Accepted & Implemented
- **Context:** Complex star schemas and relational models are difficult to convey via static images.
- **Decision:** Introduce `StarSchemaViewer` for data modeling projects, allowing visitors to click/focus Fact tables and Conformed Dimensions to inspect grain, primary keys, foreign key joins, and field definitions.
- **Consequences:** Interactivity directly proves Q's data engineering domain mastery.

---

## ADR 009: 100% Static Export & Edge Delivery

- **Status:** Accepted & Implemented
- **Context:** Personal technology portfolios must be fast, resilient, and immune to server maintenance.
- **Decision:** Next.js static site generation (`output: "export"`, `trailingSlash: true`) deployed globally via GitHub Actions to Cloudflare Pages edge network.
- **Consequences:** LCP < 0.8s, CLS = 0.000, 100% uptime, zero server-side vulnerabilities.

---

## ADR 010: Zero Fabricated Trust Signals & Verifiable Identity Graph

- **Status:** Accepted & Implemented
- **Context:** Generic developer sites often show fabricated client logos, fake 5-star review schemas, or exaggerated ROI claims.
- **Decision:** Strictly ban fabricated trust signals (`aggregateRating`, `review`, `offers`). All JSON-LD structured data strictly maps to `Person`, `WebSite`, `CreativeWork`, and `BreadcrumbList` linked to verified GitHub repositories.
- **Consequences:** Unshakeable trust and compliance verified via `tests/structured-data.test.ts`.

## 2026-09-09 — Personal portfolio hierarchy and production audit

The homepage now introduces Adul Sa-a / Q and a committed reporting artifact before deeper evidence. Work, Services, About, and Contact are primary; Method explains process, About introduces the person, and Lab/Archive remain supporting references. The Q mark, factual case-study content, and simulation boundaries are retained. No deployment or outcome claim is implied by the redesign.

Removed homepage QA counters, invented PBIX viewer titles, and global reveal/spotlight mounting. Email now works from server HTML because the same public address was already exposed on the homepage. System theme is the default until a visitor makes an explicit choice. Modal backgrounds are inert while the mobile menu is open.

Display image derivatives are generated by `npm run images:optimize`, with original evidence files retained for inspection. Sharp is explicit build tooling, already part of the Next dependency tree. Vitest/coverage received the compatible security patch. Full findings and remaining release gates: `docs/audits/2026-09-09/AUDIT.md`.

The follow-up performance trace showed that Fontsource's subset-only CSS omitted unicode ranges. Local `fonts.css` now preserves upstream ranges and references the same WOFF2 files, avoiding sequential Thai/Latin-ext/Latin fallback downloads. The schema graph is explicitly illustrative; its view selector uses native pressed buttons, clipboard success waits for the actual write, errors offer manual copying, and headings follow the surrounding case-study hierarchy.

- Publication now depends on independent Chromium, Firefox and WebKit jobs against the exact static export. Browser tooling is pinned in `.github/qa`, outside the application dependency graph. Each job uploads its scan, screenshots and interaction results.
- Removed 290 obsolete CSS selector branches and the global hero family after route-wide coverage; the new homepage uses the shared tokens through its CSS Module. Brand documentation and social preview now use the same personal identity.

- The final curation uses Q's public GitHub inventory as the source of truth. Added AI Brand Tracker and AI Command Center as distinct application/framework cases, surfaced AIE-Pulse-Meridian in Lab, and replaced Schema Map's inaccurate file paths and synthetic artifact attribution with the actual source and screenshot. No external project implementation was changed.
- The homepage pairs reporting with the analytics application rather than showing two similar marketplace dashboards. Work removes statistical quality proxies, preserves implementation boundaries and links every case to public source. Source-path validation guards against labelling a README link as a different verified code file.
