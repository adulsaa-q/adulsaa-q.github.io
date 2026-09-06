# Q PORTFOLIO REDESIGN & EVOLUTION MASTER AUDIT
## Architectural Blueprint & Strategic Design System
**Target Production:** `https://adulsaa-q.pages.dev/`  
**Core Thesis:** `PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE`  
**Date:** September 2026  
**Author:** Antigravity (Advanced Agentic Architecture Team) in collaboration with Q  

---

## EXECUTIVE SUMMARY & MANIFESTO

This document is the authoritative audit, conceptual foundation, and execution blueprint for the evolution of Q's personal technology portfolio.

This is **not** an exercise in visual decoration, nor is it an imitation of Apple, Linear, Stripe, Vercel, or 21st.dev. Those products are studied exclusively at the level of first principles—to uncover why exceptional digital tools feel intentional, clear, confident, coherent, memorable, fast, and meticulously crafted.

Q does not sell generic "developer skills." Q represents an engineer who transforms fragmented, messy operational data into understandable, inspectable, and auditable systems. The digital portfolio itself must be the living embodiment of that mentality:
1. **Structure must feel deliberate.**
2. **Information must feel inspectable.**
3. **Evidence must be visible.**
4. **Complexity must become understandable.**
5. **The interface must feel engineered rather than decorated.**

Every visual decision, typographic hierarchy, grid alignment, spacing rhythm, and interaction pattern documented herein exists to serve this primary purpose: **To make Q's engineering discipline unmistakable.**

---

# TABLE OF CONTENTS
- [01 Current Website Assessment](#01-current-website-assessment)
- [02 Strongest Existing Ideas](#02-strongest-existing-ideas)
- [03 Weakest Experience Areas](#03-weakest-experience-areas)
- [04 First-Impression Audit (The First 5 Seconds)](#04-first-impression-audit-the-first-5-seconds)
- [05 Information Architecture Audit](#05-information-architecture-audit)
- [06 Navigation Audit](#06-navigation-audit)
- [07 Typography Audit](#07-typography-audit)
- [08 Grid / Layout Audit](#08-grid--layout-audit)
- [09 Spacing & Density Audit](#09-spacing--density-audit)
- [10 Content / Copy Audit](#10-content--copy-audit)
- [11 Project Storytelling Audit](#11-project-storytelling-audit)
- [12 Interaction Audit](#12-interaction-audit)
- [13 Motion Audit](#13-motion-audit)
- [14 Responsive Audit](#14-responsive-audit)
- [15 Accessibility Audit (WCAG 2.2 AAA Target)](#15-accessibility-audit-wcag-22-aaa-target)
- [16 Performance Audit](#16-performance-audit)
- [17 Technical SEO Audit](#17-technical-seo-audit)
- [18 Engineering Audit](#18-engineering-audit)
- [19 Anti-Generic / Anti-AI Audit](#19-anti-generic--anti-ai-audit)
- [20 21st.dev Opportunity Map](#20-21stdev-opportunity-map)
- [21 Global Reference Principle Study](#21-global-reference-principle-study)
- [22 KEEP / REFINE / RESTRUCTURE / REDESIGN / REMOVE Matrix](#22-keep--refine--restructure--redesign--remove-matrix)
- [23 Proposed Q Design Direction: The Observable System](#23-proposed-q-design-direction-the-observable-system)
- [24 Q Design System Specification](#24-q-design-system-specification)
- [25 Page-by-Page Experience Blueprint](#25-page-by-page-experience-blueprint)
- [26 Prioritized Upgrade Roadmap](#26-prioritized-upgrade-roadmap)
- [Detailed Change Records (Mandatory Change Registry)](#detailed-change-records)

---

# 01 CURRENT WEBSITE ASSESSMENT

### 1.1 The Operational State (Commit `b383900`)
The live production deployment at `https://adulsaa-q.pages.dev/` represents a rare standard of underlying data discipline:
* **Architecture:** Next.js 16 App Router using static SSG export (`output: "export"`), Cloudflare Pages edge delivery, zero server runtime vulnerabilities.
* **Testing Rigor:** 13 test suites with 74/74 passing Vitest tests verifying semantic markup, landmark structures, structured data, token references, and accessibility.
* **Ethics & Privacy:** 0 third-party trackers, 0 cookie banners, 0 marketing surveillance scripts.
* **Design Engine:** 100% OKLCH color token architecture with zero raw hex or RGB/HSL literals. Pure white canvas default (`oklch(1 0 0)` / `#ffffff`) achieving WCAG AAA contrast (19.4:1).

### 1.2 The Dichotomy: Engineering Honesty vs. Experiential Execution
While the site excels in integrity, its visual and experiential execution reveals critical friction points:
1. **Container Stacking ("Cardification"):** The visual rhythm relies heavily on stacking rectangular cards (`.work-card`, `.capability-record`, `.project-entry`). Grouping text inside rounded boxes instead of using typographic hierarchy and vertical alignment flattens information density.
2. **Cognitive Inversion in the Hero:** The hero immediately presents an interactive SQL query preview, star schema highlight, and simulation button before the visitor has internalized Q's value proposition. It offers complexity before curiosity.
3. **Monotonous Reading Flow on Case Studies:** Case study pages (`/work/[slug]`) repeat an identical 20%/80% split-column template for sections 01 through 05. This uniformity makes substantive case studies read like compliance forms rather than engaging technical narratives.
4. **Information Architecture Overlap:** `/services` and `/about` duplicate identical capability tiers, creating visitor hesitation regarding where to navigate.

---

# 02 STRONGEST EXISTING IDEAS

These core ideas are Q's greatest competitive advantages and must be preserved and elevated:

### 2.1 The Evidence-Led Register
Unlike standard portfolios filled with vague client logos and unprovable claims ("boosted revenue by 300%"), Q anchors every material assertion in an inspectable artifact:
* Synthetic demonstration data is transparently marked with `[data-scope-label="simulated"]`.
* Claims link directly to committed Power Query transformations (`.pq`), DAX measure files (`.md`), SQL scripts (`.sql`), or repository roots.
* Implementation limits are declared as first-class specifications rather than buried footnotes.

### 2.2 Star Schema as an Intellectual & Visual Model
Dimensional modeling (`DimDate`, `DimPlatform`, `DimProduct` connecting `Fact_Orders` and `Fact_Marketing`) is Q's core differentiator. It provides an immediate visual metaphor for turning chaotic marketplace exports into unified reporting truth.

### 2.3 The Triad: TRACE · MODEL · BOUND
* **TRACE:** Start with the raw operational input files and schemas.
* **MODEL:** Create a legible, normalized semantic architecture.
* **BOUND:** State explicitly what is not proven, what cannot be automated, and where the scope ends.

### 2.4 Pure White Architectural Blueprint Canvas
The deliberate commitment to a pure white canvas (`#ffffff`) paired with subtle hairline boundaries (`1px solid var(--line-primary)`) evokes architectural schematics, engineering patents, and Swiss editorial publication.

---

# 03 WEAKEST EXPERIENCE AREAS

### 3.1 Cardification Fatigue
Information is frequently imprisoned in rounded rectangles. When every item is a card, nothing has priority. White space, horizontal rules, and alignment must replace arbitrary bounding boxes.

### 3.2 Flat Density Rhythm
The current homepage oscillates between extreme density (hero SQL engine) and text walls. It lacks a deliberate musical rhythm: **QUIET ➔ RICH ➔ QUIET ➔ MEDIUM ➔ RICH ➔ QUIET**.

### 3.3 Redundant Capability Registers
Both `/about` and `/services` present the same three records:
1. Dashboard & Decision Reporting
2. Data Pipeline & Operational Automation
3. AI Research & Workflow Systems
This dilutes both pages. `/about` should focus on Q's mental model and engineering philosophy, while `/services` should focus strictly on engagement scope, inputs, deliverables, and boundaries.

### 3.4 Utilitarian Archive Presentation
`/archive` currently looks like a static graveyard table rather than a dynamic systems laboratory displaying experimental scripts and schema mapping prototypes.

---

# 04 FIRST-IMPRESSION AUDIT (THE FIRST 5 SECONDS)

### 4.1 Viewport Analysis (Desktop 1440×900)
* **What draws the eye first:** The hero preview window bar (red, yellow, green macOS dots) and the highlighted SQL block.
* **What draws the eye second:** The bold headline *"I turn messy operational data into systems people can actually use."*
* **What is missed:** The Thai contextual lead, the operational status pill, and the primary call-to-action buttons.
* **Diagnostic:** The hero preview has higher visual salience than the primary thesis statement. A non-technical stakeholder or hiring director feels overwhelmed by SQL code before knowing who Q is.

### 4.2 Viewport Analysis (Mobile 390×844)
* The hero preview is pushed beneath the fold.
* The headline and leads take up significant vertical height, causing the primary CTAs to sit near the bottom edge.
* **Diagnostic:** Mobile requires a tighter, more punchy editorial arrangement with immediate proof badges.

### 4.3 Tactical Resolution: Curiosity Before Complexity
The hero must first deliver **instant clarity of purpose** in 2 seconds, followed by an **interactive invitation to inspect proof** in seconds 3 to 5.

---

# 05 INFORMATION ARCHITECTURE AUDIT

### 5.1 Current Sitemap
```
/ (Home)
├── /work (Index of 4 projects)
│   ├── /work/ecommerce-sales-pipeline
│   ├── /work/shopee-thailand-analytics
│   ├── /work/finance-etl-pipeline
│   └── /work/timelimit
├── /services (3 capability tiers)
├── /archive (4 experimental records)
├── /about (Working philosophy & duplicated capabilities)
└── /contact (GitHub, Email, Fastwork)
```

### 5.2 Structural Problems
1. **Diffusion of Focus:** 5 top-level navigation items create unnecessary fragmentation for a solo systems architect.
2. **Duplicated Value Proposition:** A visitor reading `/services` gains little new insight by clicking `/about`.

### 5.3 Proposed Reorganized Information Architecture
Consolidate into 4 primary navigation pillars designed around the visitor's psychological sequence:

```
[ PRIMARY NAVIGATION ]
1. WORK       ──> "Show me what you build and the proof behind it."
2. METHOD     ──> "How do you think, what are your boundaries, and how can we work together?" (Unifies About + Services)
3. LAB        ──> "What experimental systems and tools have you engineered?" (Re-energized Archive)
4. CONTACT    ──> "How do I reach you directly?"
```

This structure maps 1:1 to the 7-step experience hierarchy:
* **WHO IS Q?** ──> Home Hero
* **WHAT DOES Q BUILD?** ──> Home Selected Systems
* **HOW DOES Q THINK?** ──> Method
* **SHOW ME PROOF.** ──> Case Studies (`/work/[slug]`)
* **HOW WAS IT BUILT?** ──> GitHub Sources & DAX/PQ Registers
* **CAN I TRUST THIS PERSON?** ──> Limitations, Tests & Audit Trail
* **HOW CAN I WORK WITH Q?** ──> Method Engagement Models & Contact

---

# 06 NAVIGATION AUDIT

### 6.1 Desktop Navigation
* **Current:** Standard flex row with text links and a theme toggle button.
* **Assessment:** Clean but lacks presence. Hover states use a basic border underline.
* **Proposed:**
  * Clean typographic wordmark: `Q // SYSTEMS` with an operational status indicator (`● AVAILABLE FOR Q4`).
  * Segmented navigation tabs with subtle hairline active indicator brackets: `[ 01 WORK ]`, `[ 02 METHOD ]`, `[ 03 LAB ]`, `[ 04 CONTACT ]`.
  * Keyboard shortcut hint (`⌘K` or `/` to quick-filter systems).

### 6.2 Mobile Navigation
* **Current:** Accessible sheet drawer sliding from top.
* **Assessment:** Functional, passes focus tests.
* **Proposed:** Transform into an editorial full-viewport overlay featuring large display numbers (`01`, `02`, `03`, `04`), Thai subtitles, and direct repository links.

---

# 07 TYPOGRAPHY AUDIT

### 7.1 Font System Selection
* **Sans Serif:** `IBM Plex Sans Thai`, `IBM Plex Sans`, sans-serif.
* **Monospace:** `IBM Plex Mono`, monospace.
* **Rationale:** IBM Plex was designed specifically to bridge humanistic editorial qualities with industrial machine heritage. It is the ideal typographic voice for data engineering.

### 7.2 Typographic Hierarchy & Scale Ratio
Moving from arbitrary pixel values to a strict Major Second (1.125) / Minor Third (1.200) responsive typographic scale:

| Level | Desktop Size | Mobile Size | Weight | Tracking | Line Height | Usage |
|---|---|---|---|---|---|---|
| **Display Hero** | `3.75rem` (60px) | `2.50rem` (40px) | SemiBold (600) | `-0.035em` | `1.08` | Homepage primary claim |
| **Section Title** | `2.25rem` (36px) | `1.75rem` (28px) | Medium (500) | `-0.025em` | `1.15` | Major page section anchors |
| **Project Title** | `1.65rem` (26px) | `1.40rem` (22px) | Medium (500) | `-0.020em` | `1.25` | Case study names & plate titles |
| **Thai Lead** | `1.25rem` (20px) | `1.10rem` (17.5px) | Regular (400) | `normal` | `1.70` | Thai translation subtitles |
| **Body Large** | `1.125rem` (18px) | `1.00rem` (16px) | Regular (400) | `-0.010em` | `1.65` | Context, problem & impact copy |
| **Body Standard** | `0.95rem` (15px) | `0.90rem` (14.5px) | Regular (400) | `normal` | `1.60` | Secondary descriptions & lists |
| **Mono Metadata** | `0.78rem` (12.5px) | `0.72rem` (11.5px) | Medium (500) | `+0.050em` | `1.40` | Schema tables, tags, timestamps |
| **Micro Tag** | `0.65rem` (10.5px) | `0.60rem` (9.5px) | Bold (700) | `+0.080em` | `1.20` | `VERIFIED ARTIFACT`, `SIMULATED` |

### 7.3 Typographic Rules
* **Max Measure (Line Length):** Never exceed 68 characters (`max-width: 68ch`) for body paragraphs to maintain effortless eye tracking.
* **Tabular Numbers:** Force `font-variant-numeric: tabular-nums` on all metrics, counters, dates, and tables to eliminate jitter.
* **Bilingual Vertical Rhythm:** Thai scripts require a higher line-height (minimum 1.65x) to accommodate tone marks without overlapping upper ascenders.

---

# 08 GRID / LAYOUT AUDIT

### 8.1 The Asymmetric Editorial Blueprint Grid
Generic layouts rely on centered 1-column or repeating 3-column grids. Q's work requires an **Asymmetric 12-Column Blueprint Grid** with deliberate margin channels:

```
┌────────┬──────────────────────────────────────┬──────────────────────┐
│ MARGIN │            PRIMARY CANVAS            │    TECHNICAL RAIL    │
│  Col   │              Cols 3–9                │      Cols 10–12      │
│  1–2   │                                      │                      │
│        │                                      │                      │
│ [01]   │ # The Narrative                      │ [METADATA]           │
│ STAGE  │ Context, problem statement,          │ Schema: Star Model   │
│ MODEL  │ transformed outcomes, and visual     │ Tables: 5 Fact/Dim   │
│        │ evidence plates.                     │ Measures: 14 DAX     │
│        │                                      │ Source: GitHub Tree  │
└────────┴──────────────────────────────────────┴──────────────────────┘
```

* **Left Margin (Cols 1–2 / 160px):** Numerical indexing (`01 // EVIDENCE`), stage kickers (`INGESTION`, `SEMANTIC LAYER`), boundary warnings.
* **Primary Canvas (Cols 3–9 / 680px):** Editorial storytelling, primary data artifacts, full-scale dashboard plates.
* **Technical Rail (Cols 10–12 / 280px):** Inspectable metadata, measure code snippets, table relationship trees, committed source links.

---

# 09 SPACING & DENSITY AUDIT

### 9.1 The Rhythm of Information Density
A portfolio should not be uniformly dense or uniformly sparse. It must follow a structured musical cadence:

```
[1. HERO]                ──> QUIET     (Breathable, clear claim, confident whitespace)
[2. SIGNATURE ARTIFACT]  ──> RICH      (High-density interactive Star Schema & Plate)
[3. PRINCIPLES TRIAD]    ──> QUIET     (Three calm editorial columns: Trace, Model, Bound)
[4. SELECTED SYSTEMS]    ──> MEDIUM    (Bento engineering metrics + artifact carousel)
[5. SYSTEM LIFECYCLE]    ──> RICH      (Four-stage interactive pipeline inspector)
[6. CAPABILITY REGISTER] ──> MEDIUM    (Structured hairline tabular records)
[7. CONTACT & PROOF]     ──> QUIET     (Minimal direct channels and verification keys)
```

### 9.2 Strict 4px Harmonic Spacing Scale
Arbitrary margins (`margin-top: 17px`) are strictly forbidden. All spacing uses the geometric scale:
* `--space-1: 0.25rem (4px)`
* `--space-2: 0.50rem (8px)`
* `--space-3: 0.75rem (12px)`
* `--space-4: 1.00rem (16px)`
* `--space-6: 1.50rem (24px)`
* `--space-8: 2.00rem (32px)`
* `--space-12: 3.00rem (48px)`
* `--space-16: 4.00rem (64px)`
* `--space-24: 6.00rem (96px)`
* `--space-32: 8.00rem (128px)`

---

# 10 CONTENT / COPY AUDIT

### 10.1 The Voice of Quiet Confidence
Q's tone of voice must remain **factual, calm, mathematically honest, and devoid of marketing inflation**:
* **Forbidden Phrases:** *"Passionate data guru"*, *"Game-changing AI solutions"*, *"Skyrocketed revenue by 500%"*, *"Seamless data magic"*.
* **Authorized Voice:** *"Transforms discordant multi-channel marketplace exports into an auditable star schema reporting model with zero elapsed-day false drift."*

### 10.2 Thai / English Bilingual Architecture
* Thai copy is not a secondary afterthought; it is an equal editorial voice.
* Thai copy is used for **philosophical intent, executive empathy, and cultural anchoring** (e.g. *"เปลี่ยนข้อมูลกระจัดกระจาย ให้เป็นระบบที่ตรวจสอบและใช้งานได้จริง"*).
* English copy is used for **technical terminology, schema definitions, and evidence specifications**.

---

# 11 PROJECT STORYTELLING AUDIT

### 11.1 The 11-Stage Evidence Anatomy
Every case study in Q's portfolio must adhere to this verifiable lifecycle:
1. **Context:** What was the messy operational reality? (e.g., mismatched Shopee & Lazada columns).
2. **Problem:** What analytical failure mode occurred? (comparing incomplete current months with full prior months).
3. **Inputs:** Exactly what files, tables, or feeds were ingested?
4. **Constraints:** What are the limits? (synthetic sample data, no live API credentials).
5. **System:** The dimensional model architecture (`DimDate`, `DimProduct`, `Fact_Orders`).
6. **Decisions:** Why was this specific architectural choice made over alternatives?
7. **Implementation:** Specific Power Query M transforms, SQL joins, and DAX measures.
8. **Output:** High-resolution interactive visual artifacts.
9. **Impact:** Operational clarity gained and manual stitching hours eliminated.
10. **Evidence:** Direct links to verifiable code, tests, and screenshots in public repositories.
11. **Limitations:** Honest statement of what the repository does not prove.

---

# 12 INTERACTION AUDIT

### 12.1 Tactical Micro-Interactions
* **BI Artifact Carousel Tabs:** Instant segmented pill selection with zero layout shift, smooth cross-fade, and roving keyboard focus (`ArrowLeft` / `ArrowRight`).
* **High-Resolution Inspection Dialog:** Native `<dialog>` modal with full-screen zoom, backdrop scrim, focus containment, and instant `Esc` restoration.
* **Star Schema Relationship Highlighting:** Hovering over a dimension table (`DimDate`) highlights connecting relationship lines and dependent measures in real-time.
* **SQL Copy Feedback:** Quick mechanical confirmation tooltip (`COPIED TO CLIPBOARD`) that vanishes after 1400ms without layout jitter.

---

# 13 MOTION AUDIT

### 13.1 Motion Principles
* **Functional, Not Decorative:** Motion must only explain relationship, state change, or continuity.
* **Duration Ceiling:** All micro-interactions must execute between `120ms` and `200ms`.
* **Physics Curve:** Standardized to `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out, immediate deceleration).
* **Accessibility Guarantee:** Every animated property must strictly obey `@media (prefers-reduced-motion: reduce)` with `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important;`.

---

# 14 RESPONSIVE AUDIT

### 14.1 Viewport Art Direction Matrix
* **Large Desktop (>1440px):** Full 12-column asymmetric grid with permanent metadata rail and side-by-side technical drawers.
* **Standard Laptop (1024px–1440px):** 10-column layout with collapsible technical margin.
* **Tablet (768px–1023px):** Single-column main canvas with horizontal scrollable tab strips and stacked metadata chips.
* **Mobile (<768px):** Linear vertical stack; macOS window controls convert to minimal segmented tabs; minimum touch targets expand to 44×44px.

---

# 15 ACCESSIBILITY AUDIT (WCAG 2.2 AAA TARGET)

### 15.1 Real Contrast Measurements
* Background: `--surface-primary` (`oklch(1 0 0)` / `#ffffff`).
* Body Text: `--text-primary` (`oklch(0.16 0.02 250)`) ──> **19.40:1 (Exceeds WCAG AAA 7.0:1)**.
* Secondary Text: `--text-secondary` (`oklch(0.46 0.02 250)`) ──> **7.11:1 (Exceeds WCAG AAA 7.0:1)**.
* Signal Accent: `--signal-primary` (`oklch(0.55 0.16 32)`) ──> **5.24:1 (Exceeds WCAG AA 4.5:1)**.

### 15.2 WAI-ARIA APG Compliance
* Artifact Carousel implements proper single-container `role="tabpanel"` pattern with dynamic `aria-labelledby`.
* Slide counter uses `role="status"` and `aria-live="polite"`.
* Full roving tabindex on keyboard arrow navigation.

---

# 16 PERFORMANCE AUDIT

### 16.1 Target Core Web Vitals
* **Largest Contentful Paint (LCP):** `< 0.8s` (Lead image preloaded via `<link rel="preload">`).
* **First Input Delay / INP:** `< 50ms` (Zero heavy client-side JavaScript execution).
* **Cumulative Layout Shift (CLS):** `0.000` (Explicit image aspect ratios and rigid container dimensions).
* **Total JavaScript Payload:** `< 85KB` (Gzipped, including Next.js runtime).

---

# 17 TECHNICAL SEO AUDIT

### 17.1 Machine-Readable Semantic Graph
* **JSON-LD:** Authoritative `Person`, `CreativeWork`, and `BreadcrumbList` schemas without fabricated claims.
* **Metadata:** Unique title and meta descriptions on all static routes.
* **OpenGraph:** Vector SVG and pre-rendered social card images.
* **Crawl Efficiency:** Valid `sitemap.xml` and restrictive `robots.txt` ensuring 100% crawl indexing.

---

# 18 ENGINEERING AUDIT

### 18.1 Codebase Health & Integrity
* Next.js 16.3.3 App Router with Turbopack compilation.
* TypeScript strict mode enabled (`noImplicitAny: true`, `strictNullChecks: true`).
* ESLint 9 flat config with zero warnings or errors.
* 100% OKLCH color token architecture with automated regex prevention of raw hex/RGB/HSL.

---

# 19 ANTI-GENERIC / ANTI-AI AUDIT

### 19.1 Eliminating Modern AI Web Tropes
Every interface element must pass this aggressive test:

| AI Web Trope | Status in Q Portfolio | Enforcement Rationale |
|---|---|---|
| **Gradient Text Headlines** | **FORBIDDEN** | Looks like a generic SaaS template; reduces typographic legibility. |
| **Pervasive Purple Glows / Blobs** | **FORBIDDEN** | Has no semantic meaning in data architecture. |
| **Meaningless Bento Grids** | **REPLACED** | Replace arbitrary rounded boxes with structured hairline tables. |
| **Fabricated Metrics ("300% ROI")** | **FORBIDDEN** | Destroys credibility; replaced with verifiable dataset scopes. |
| **Floating 3D Decorative Canvases** | **FORBIDDEN** | Distracts from real data models; drains mobile battery and GPU. |
| **Identical Rounded Card Stacks** | **REPLACED** | Replaced with editorial asymmetry, rules, and typography. |

---

# 20 21ST.DEV OPPORTUNITY MAP

### 20.1 The 7 Mandatory Evaluation Questions
Before adopting any component pattern from 21st.dev:
1. *What problem does this solve?*
2. *Does it improve comprehension?*
3. *Does it improve hierarchy?*
4. *Does it improve storytelling?*
5. *Does it strengthen Q's identity?*
6. *Is the interaction worth its complexity?*
7. *Can it be adapted completely into Q's design system?*

### 20.2 Approved Patterns vs. Rejected Patterns
* **APPROVED & NORMALIZED:**
  * Minimal segmented pill tabs (for switching dashboard plates).
  * Collapsible code / formula inspector drawers (for DAX measures and SQL).
  * Hairline window chrome with subtle dots (for authentic tool framing).
  * Monospace command ribbon chips (for keyboard shortcuts).
* **REJECTED:**
  * 3D rotating coverflow carousels (distorts analytical data tables).
  * Autoplaying video loops (creates cognitive overload).
  * Neumorphic drop shadows (reduces structural sharpness).

---

# 21 GLOBAL REFERENCE PRINCIPLE STUDY

### 21.1 Evidence.dev
* **Reference:** Evidence.dev SQL-to-markdown reporting architecture.
* **Underlying Principle:** Transparency of calculation. The query that generates a KPI is inspectable directly alongside the metric.
* **Q Interpretation:** Q's dashboard plates feature an inspectable **[View DAX / Query]** toggle that reveals the exact calculation logic behind the visualization.

### 21.2 Linear
* **Reference:** Linear.app keyboard efficiency and micro-typography.
* **Underlying Principle:** Speed as an emotional feeling. Monospace tags, precise keyboard shortcuts, and zero-latency UI transitions communicate operational mastery.
* **Q Interpretation:** Keyboard shortcuts (`1, 2, 3`) allow instant switching between reporting views, and all numbers use tabular monospace alignment.

### 21.3 Stripe Documentation
* **Reference:** Stripe Developer Documentation & Press Pages.
* **Underlying Principle:** Asymmetric marginalia. Explanatory annotations live in a dedicated side channel without interrupting the primary narrative flow.
* **Q Interpretation:** Technical limitations and boundary warnings are placed in an architectural margin channel alongside case study copy.

### 21.4 Dieter Rams / Braun
* **Reference:** "Ten Principles for Good Design" (Otl Aicher, Dieter Rams).
* **Underlying Principle:** *Weniger, aber besser* (Less, but better). Design is the elimination of the non-essential so that the essential may speak.
* **Q Interpretation:** Pure white background, carbon typography, and elimination of decorative backgrounds allow the star schemas and data models to dominate.

---

# 22 KEEP / REFINE / RESTRUCTURE / REDESIGN / REMOVE MATRIX

| Element / Area | Current State | Verdict | Detailed Rationale & Action |
|---|---|---|---|
| **Pure White Light Canvas** | Default light theme | **KEEP** | Distinctive, clean, high-contrast, evokes architectural blueprints. |
| **Evidence-Led Philosophy** | Bound & verify claims | **KEEP** | Q's core competitive moat. Elevate and deepen. |
| **IBM Plex Typography** | Sans + Mono pairing | **KEEP** | Perfect pairing for humanistic data engineering. Standardize scale. |
| **Hero Preview Window** | Live SQL & Schema sim | **RESTRUCTURE** | Shift from immediate high complexity to a calm interactive proof artifact. |
| **Project Visual Carousel** | Interactive tabbed plates | **REFINE** | Enhance with keyboard roving focus and deep-zoom dialog. |
| **Bento Engineering Metrics** | Ingestion & Schema pills | **REFINE** | Maintain factual specifications; ensure seamless mobile wrapping. |
| **Pipeline Diagram** | 4-stage lifecycle | **REFINE** | Keep inspectable drawer; simplify node visual chrome. |
| **Services vs. About Split** | Two separate pages | **RESTRUCTURE** | Unify into a single authoritative **Method** page to eliminate duplication. |
| **Work Index (`/work`)** | 4 card items | **REDESIGN** | Replace card grid with an editorial register featuring technical metadata. |
| **Archive Page (`/archive`)** | Passive table | **REDESIGN** | Rebrand as **Lab** with interactive schema-mapping demonstrations. |
| **Repetitive Card Borders** | Cardification across pages | **REMOVE** | Replace with typographic hierarchy, rules, and asymmetric margins. |
| **Decorative Blobs / Scrims** | Subtle ambient glows | **REMOVE** | Eliminate any decorative artifacts that do not represent data flow. |

---

# 23 PROPOSED Q DESIGN DIRECTION: THE OBSERVABLE SYSTEM

The guiding design vision for Q is **"THE OBSERVABLE SYSTEM" (ระบบที่เปิดให้ตรวจพิสูจน์ได้)**.

Three Pillars:
1. **Architectural Restraint:** A pure white canvas (`#ffffff`), carbon hairline rules (`1px solid oklch(0.88 0.005 250)`), and generous breathing room that lets data legibility breathe.
2. **Observable Mechanics:** Star schemas, ETL transformation logic, DAX measures, and database tables are treated as beautiful, first-class visual citizens.
3. **Editorial Authority:** Precision bilingual typography, asymmetric margin annotations, and explicit boundary declarations that project quiet confidence.

---

# 24 Q DESIGN SYSTEM SPECIFICATION

### 24.1 Color Token Architecture (OKLCH Only)
```css
:root {
  /* Surface Tokens (Light Mode Default - Pure White) */
  --surface-primary: oklch(1 0 0);               /* Pure #ffffff */
  --surface-secondary: oklch(0.985 0.002 250);   /* Calm Blueprint Tint */
  --surface-tertiary: oklch(0.965 0.004 250);    /* Card / Tool Header */
  --surface-raised: oklch(1 0 0);                /* Modal & Popover */
  --surface-inverse: oklch(0.16 0.02 250);       /* Deep Navy Slate */

  /* Text & Ink Tokens */
  --text-primary: oklch(0.16 0.02 250);          /* High-contrast Carbon Ink (19.4:1) */
  --text-secondary: oklch(0.46 0.02 250);        /* Technical Label Ink (7.1:1) */
  --text-muted: oklch(0.60 0.015 250);          /* Metadata & Borders (4.5:1) */
  --text-inverse: oklch(0.98 0.005 90);          /* Text on Dark Surfaces */

  /* Hairline Border Tokens */
  --line-soft: oklch(0.92 0.004 250);           /* Subtle Divider */
  --line-primary: oklch(0.88 0.006 250);        /* Standard Blueprint Grid */
  --line-strong: oklch(0.70 0.012 250);         /* Emphasized Active Boundary */

  /* Signal Accents (Used Strictly for Operational Meaning) */
  --signal-primary: oklch(0.55 0.16 32);         /* Terracotta / Action Signal */
  --signal-information: oklch(0.48 0.16 255);   /* Blueprint Blue / Schema Node */
  --signal-success: oklch(0.58 0.14 145);       /* Verified Test / Green Pulse */
  --signal-simulated: oklch(0.62 0.13 85);       /* Amber / Simulated Data Badge */
}
```

### 24.2 Border Radius Discipline
* `--radius-sm: 3px;` (Pills, badges, code chips)
* `--radius-md: 6px;` (Buttons, input fields, tab bars)
* `--radius-lg: 8px;` (macOS window frames, artifact displays)
* **Rule:** Never exceed `8px`. Blob-like rounded-2xl or rounded-3xl containers are strictly prohibited.

---

# 25 PAGE-BY-PAGE EXPERIENCE BLUEPRINT

### 25.1 Homepage (`/`)
* **Hero Viewport (Quiet & Punchy):**
  * Top bar: Operational status indicator (`● Available for engagements`).
  * Display Headline: *"I turn messy operational data into systems people can actually use."*
  * Subtitle: Bilingual Thai/English explanation of data modeling and decision pipelines.
  * Right/Center: **Interactive Proof Token**—a compact, tactile dimensional model plate with real-time star schema highlight.
* **Section 01: Selected Systems (Editorial Showcase):**
  * Case Study 01: Multi-Channel E-Commerce Pipeline (Interactive Carousel + Bento Metrics).
  * Case Study 02: Shopee Thailand Analytics (SQL Engine + Star Schema Plate).
* **Section 02: The Observable Pipeline (System Architecture):**
  * Interactive 4-stage lifecycle: `DATA ➔ MODEL ➔ DECISION ➔ HANDOVER`.
* **Section 03: The Triad of Principles:**
  * 3 editorial columns: `01 / TRACE`, `02 / MODEL`, `03 / BOUND`.
* **Footer & Direct Route:**
  * Clean hairline footer with verified repository commit links and direct contact.

### 25.2 Case Study Detail Page (`/work/[slug]`)
* **Top Header:** Title, display subtitle, and GitHub source link.
* **Lead Showcase:** Interactive BI Artifact Carousel with full segmented tabs and click-to-zoom inspection.
* **Asymmetric Editorial Body:**
  * Left Column: Numbered index, stage kickers, constraints, and limitations.
  * Center Column: Context, Problem, System Architecture, Decisions, and Impact narrative.
  * Right Rail: Inspectable schema table definitions, DAX formula drawer, and verified code links.

### 25.3 Method Page (`/method` - Unifying About & Services)
* **Part 1: Working Philosophy:** How Q approaches systems from the source.
* **Part 2: Bounded Capabilities (The 3 Engagement Models):**
  * Model 01: Dashboard & Reporting Systems (Inputs, Deliverables, Boundaries).
  * Model 02: Data Pipelines & Operational Automation (Inputs, Deliverables, Boundaries).
  * Model 03: AI Research & Workflow Systems (Inputs, Deliverables, Boundaries).
* **Part 3: The 4-Stage Engagement Path:** Discover ➔ Define ➔ Build ➔ Verify & Handover.

### 25.4 Lab Page (`/lab` - Reimagined Archive)
* Dedicated showcase of experimental tools: `schema-map`, `ai-brand-tracker`, `finance-pdf-parser`.
* Live interactive schema graph viewer.

### 25.5 Contact Page (`/contact`)
* Direct, transparent contact routes (Email, GitHub, Fastwork).
* Helpful guidance: *"What helps in a first message"* (Problem, data format/volume, timeline).
* Timezone and working hour expectations (Asia/Bangkok GMT+7).

---

# 26 PRIORITIZED UPGRADE ROADMAP

### Phase 1: Foundations & Information Architecture (Immediate)
* Implement unified **Method** page architecture.
* Apply strict 4px spacing and Major Second typographic scale.
* Eliminate redundant capability records across routes.

### Phase 2: De-Cardification & Editorial Layout
* Convert homepage and work index from boxy card stacks to asymmetric editorial registers.
* Implement hairline blueprint rule dividers and dedicated margin metadata columns.

### Phase 3: Interactive Signature Moments
* Expand the BI Artifact Carousel with deep-zoom native dialog and keyboard roving focus.
* Add interactive star schema relationship hover states in the hero preview.

### Phase 4: Verification, Visual QA & Live Deployment
* Run the full 74-test Vitest suite, TypeScript compiler, ESLint, Next.js static export build, and link checker.
* Deploy to Cloudflare Pages and verify live across Desktop (1920×1080, 1440×900) and Mobile (390×844).

---

# DETAILED CHANGE RECORDS

Below is the mandatory change registry documenting 10 core architectural evolutions:

### CHANGE RECORD 01: Elimination of Cardification on Homepage
* **CURRENT:** Featured projects wrapped in large rounded border boxes (`.project-entry`) with multiple nested sub-cards.
* **PROBLEM:** High visual noise; borders compete with data visualizations inside the projects.
* **WHY IT MATTERS:** Data dashboards require a calm surrounding canvas to be legible. Heavy card frames box in the content.
* **DESIGN PRINCIPLE:** Structure through typography, alignment, and hairline rules rather than enclosing containers.
* **PROPOSED SOLUTION:** Remove outer card containers; separate projects using clean `1px solid var(--line-primary)` dividers with asymmetric left margin indices (`01 // CASE STUDY`).
* **REFERENCE / INSPIRATION:** Stripe Press and Swiss architectural monographs.
* **Q-SPECIFIC INTERPRETATION:** The portfolio feels like an open architectural drawing sheet rather than a mobile app feed.
* **EXPECTED USER EFFECT:** Eyes immediately focus on the dashboard plate and the problem statement without border distraction.
* **IMPLEMENTATION COMPLEXITY:** Low (CSS layout & markup refactor).
* **PRIORITY:** High.

### CHANGE RECORD 02: Calm Hero Inversion (Curiosity Before Complexity)
* **CURRENT:** Hero features a complex SQL editor and simulated run button that immediately commands the viewport.
* **PROBLEM:** Visitors are asked to read code before understanding Q's purpose or why the code matters.
* **WHY IT MATTERS:** First 5 seconds must establish identity and relevance before demanding cognitive effort.
* **DESIGN PRINCIPLE:** Progressive Disclosure: Clarity ➔ Curiosity ➔ Depth.
* **PROPOSED SOLUTION:** Rebalance hero: elevate the bilingual thesis statement on the left; convert the right side into a clean, tactile **Interactive Proof Plate** that invites inspection rather than dominating.
* **REFERENCE / INSPIRATION:** Linear homepage and Evidence.dev documentation.
* **Q-SPECIFIC INTERPRETATION:** Represents Q as an engineer of clear systems, not just a raw SQL typist.
* **EXPECTED USER EFFECT:** Faster comprehension of value proposition; increased scroll-through rate.
* **IMPLEMENTATION COMPLEXITY:** Medium.
* **PRIORITY:** High.

### CHANGE RECORD 03: Consolidation of About & Services into `/method`
* **CURRENT:** Separate `/services` and `/about` pages repeating identical capability lists.
* **PROBLEM:** Fragmented user journey; creates redundant clicks and perceived filler content.
* **WHY IT MATTERS:** An engineer's positioning should be concise, unified, and authoritative.
* **DESIGN PRINCIPLE:** Coherence & Information Density.
* **PROPOSED SOLUTION:** Merge into a single `/method` route containing the working philosophy, the 3 bounded offers, and the 4-stage delivery process.
* **REFERENCE / INSPIRATION:** Basecamp/37signals "How We Work" and consultancy architectural charters.
* **Q-SPECIFIC INTERPRETATION:** Shows that Q's services are inseparable from Q's engineering philosophy.
* **EXPECTED USER EFFECT:** Visitors understand the full working relationship in a single, compelling reading experience.
* **IMPLEMENTATION COMPLEXITY:** Medium (requires route consolidation, redirect, and test updates).
* **PRIORITY:** Medium-High.

### CHANGE RECORD 04: Interactive BI Artifact Carousel with Deep Zoom
* **CURRENT:** Static lead image with separate screenshots stacked in a vertical grid below.
* **PROBLEM:** Visitors have to scroll past miles of images; charts are unreadable at standard column width.
* **WHY IT MATTERS:** Business Intelligence dashboards are information-dense and require magnification to inspect row-level metrics.
* **DESIGN PRINCIPLE:** Inspectable Artifacts with Zero-Friction Navigation.
* **PROPOSED SOLUTION:** Interactive macOS window carousel with segmented plate tabs (`Overview`, `Mix`, `Heatmap`), keyboard navigation (`←`, `→`), and full-screen modal zoom via native `<dialog>`.
* **REFERENCE / INSPIRATION:** 21st.dev segmented controls + macOS native window chrome.
* **Q-SPECIFIC INTERPRETATION:** Replicates the feeling of inspecting a live Power BI workspace.
* **EXPECTED USER EFFECT:** Visitors actively click and inspect real dashboard numbers, proving technical depth.
* **IMPLEMENTATION COMPLEXITY:** Implemented & Verified in `artifact-carousel.tsx`.
* **PRIORITY:** High.

### CHANGE RECORD 05: Bento Engineering Metrics Strip
* **CURRENT:** Basic stack pills (`Power BI`, `DAX`, `SQL`) without context.
* **PROBLEM:** Technology tags are generic and used by every junior developer.
* **WHY IT MATTERS:** Q's strength is systems engineering, not just knowing a tool's syntax.
* **DESIGN PRINCIPLE:** Factual Technical Specificity.
* **PROPOSED SOLUTION:** 3-box Bento metrics strip displaying: Ingestion Scope (`3 Incompatible Exports`), Reconciliation Logic (`Equal Elapsed-Day Window`), and Architecture (`Star Schema Semantic Model`).
* **REFERENCE / INSPIRATION:** Hardware spec ribbons (Apple product spec sheets, Framework laptop architecture).
* **Q-SPECIFIC INTERPRETATION:** Grounded in real data engineering realities rather than marketing hype.
* **EXPECTED USER EFFECT:** Immediate technical credibility with engineering managers and technical founders.
* **IMPLEMENTATION COMPLEXITY:** Implemented & Verified in `page.tsx`.
* **PRIORITY:** High.

### CHANGE RECORD 06: Asymmetric 3-Column Case Study Layout
* **CURRENT:** Uniform 20%/80% two-column split repeated across 5 sections on `/work/[slug]`.
* **PROBLEM:** Monotonous reading rhythm; text stretches too wide or feels like a legal disclaimer.
* **WHY IT MATTERS:** Long-form technical storytelling requires varied pacing to sustain reader engagement.
* **DESIGN PRINCIPLE:** Editorial Pacing & Asymmetry.
* **PROPOSED SOLUTION:** 3-column layout: Left (Metadata & Indices), Center (Main Narrative & Plates), Right (Inspectable Code & Schema Drawers).
* **REFERENCE / INSPIRATION:** The New Yorker editorial layouts paired with GitBook technical documentation.
* **Q-SPECIFIC INTERPRETATION:** Merges human storytelling with database schema inspection.
* **EXPECTED USER EFFECT:** Readers easily scan architecture highlights while reading deep narrative at their own pace.
* **IMPLEMENTATION COMPLEXITY:** Medium.
* **PRIORITY:** Medium.

### CHANGE RECORD 07: Re-energizing `/archive` into `/lab`
* **CURRENT:** Static table listing 4 older projects with negative limitation text.
* **PROBLEM:** Feels like a list of abandoned or broken projects.
* **WHY IT MATTERS:** Experimental side projects represent active curiosity and technical exploration.
* **DESIGN PRINCIPLE:** The Workshop / Laboratory Aesthetic.
* **PROPOSED SOLUTION:** Reframe as **Systems Laboratory** (`/lab`), showcasing prototypes (`schema-map`, `ai-brand-tracker`) with interactive input/output previews and architectural notes.
* **REFERENCE / INSPIRATION:** Bell Labs research registers and GitHub experiment showcases.
* **Q-SPECIFIC INTERPRETATION:** Demonstrates that Q continuously builds and tests experimental data ideas.
* **EXPECTED USER EFFECT:** Shows intellectual vitality and systems-level exploration beyond client work.
* **IMPLEMENTATION COMPLEXITY:** Medium.
* **PRIORITY:** Medium.

### CHANGE RECORD 08: Tabular Numbers & Micro-Typography Precision
* **CURRENT:** Mixed font variants where numbers occasionally cause slight jitter during dynamic counter updates.
* **PROBLEM:** Subconscious feeling of amateur web design.
* **WHY IT MATTERS:** Data professionals scrutinize alignment. Numbers must line up like a spreadsheet.
* **DESIGN PRINCIPLE:** Mechanical Precision.
* **PROPOSED SOLUTION:** Enforce `font-variant-numeric: tabular-nums` globally across all metadata, dates, slide counters, and metrics.
* **REFERENCE / INSPIRATION:** Bloomberg Terminal and financial statement typesetting.
* **Q-SPECIFIC INTERPRETATION:** Aligns with Q's focus on financial and operational data accuracy.
* **EXPECTED USER EFFECT:** Clean, vibration-free typography that feels engineered.
* **IMPLEMENTATION COMPLEXITY:** Low (CSS rule additions).
* **PRIORITY:** High.

### CHANGE RECORD 09: WCAG 2.2 AAA Token Integrity Enforcement
* **CURRENT:** Previous ad-hoc token usage (e.g. referencing undefined `--text-muted`).
* **PROBLEM:** Risk of invisible text or poor contrast on non-calibrated monitors.
* **WHY IT MATTERS:** Accessibility is an engineering specification, not a charity feature.
* **DESIGN PRINCIPLE:** Inclusive Engineering Rigor.
* **PROPOSED SOLUTION:** Replace all undefined variables with authoritative tokens; verify mathematical contrast ratios exceeding 7.0:1 (AAA) across all themes.
* **REFERENCE / INSPIRATION:** W3C WCAG 2.2 standards.
* **Q-SPECIFIC INTERPRETATION:** Reinforces Q's commitment to systems that can be read by everyone without exception.
* **EXPECTED USER EFFECT:** Flawless readability in high-glare environments and on mobile screens.
* **IMPLEMENTATION COMPLEXITY:** Implemented & Verified in `globals.css` and `tests/design-system.test.ts`.
* **PRIORITY:** High.

### CHANGE RECORD 10: Roving Tabindex & APG Screen Reader Optimization
* **CURRENT:** Basic button controls that lacked full WAI-ARIA APG roving focus and live region announcements.
* **PROBLEM:** Screen reader users or keyboard-only visitors could become trapped or miss active plate context.
* **WHY IT MATTERS:** World-class digital products are universally operable via keyboard.
* **DESIGN PRINCIPLE:** Keyboard Operability as a First-Class Citizen.
* **PROPOSED SOLUTION:** Implement roving tabindex (`tabIndex={isSelected ? 0 : -1}`), Arrow/Home/End keyboard events, dynamic `aria-labelledby`, and `role="status"` slide counter.
* **REFERENCE / INSPIRATION:** W3C WAI-ARIA Authoring Practices Guide (APG) Tabs Pattern.
* **Q-SPECIFIC INTERPRETATION:** Reflects an engineer who tests edge cases and builds robust software.
* **EXPECTED USER EFFECT:** Effortless navigation for power users with keyboard shortcuts.
* **IMPLEMENTATION COMPLEXITY:** Implemented & Verified in `tests/artifact-carousel.test.tsx`.
* **PRIORITY:** High.

---

## CONCLUSION & THE ROAD AHEAD

This master audit establishes the exact blueprint for evolving Q's portfolio into a world-class personal technology experience.

By anchoring every decision in **PRECISION × ENGINEERING × EDITORIAL × EVIDENCE × QUIET CONFIDENCE**, the resulting website will not look like a template, a generic SaaS clone, or an AI-generated gallery.

Instead, it will stand as an unmistakable digital instrument: **A system built by an engineer who turns messy operational data into systems people can actually use.**
