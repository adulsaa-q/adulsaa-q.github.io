# GitHub source review and final curation

Reviewed 9 September 2026 after Q confirmed that GitHub is the primary collection of his work.
Public profile: [adulsaa-q](https://github.com/adulsaa-q). Public API inventory: 12 repositories;
none marked archived. This review covers public source only. Snapshot commit IDs and source
path checks are recorded in the accompanying evidence files.

## Curation

| Public repository | What the public material supports | Portfolio treatment |
|---|---|---|
| ecommerce-sales-pipeline | Power Query, DAX definitions, sample exports and committed dashboard images | Retain as the lead BI case. Demonstration data remains explicit. |
| ai_brand_tracker | Provider adapters, query generation, DuckDB persistence, analytics, API, dashboard, tests and candid feature-status documentation | Add full case study and second homepage feature. Separate search results from generative answers; no market-leadership claim. |
| finance-etl-pipeline | Python ingestion/orchestration, Postgres migrations and test sources | Retain full engineering case. No invented processing savings or production adoption. |
| shopee-thailand-analytics | SQL analyses, schema documentation and dashboard artifacts | Retain full case in Work; a second marketplace dashboard is less useful than showing broader capability on the homepage. |
| timelimit | Electron/TypeScript application, clock logic, local persistence, tests and screenshots | Retain internal-tool/desktop case. No signing or security-hardening claim. |
| schema-map | One SQLAlchemy inspection/export script, generated Pagila Markdown notes and actual Obsidian screenshot | Correct inaccurate file paths and artifact attribution; retain full case. Remove duplicate secondary listing. |
| ai-command-center | Architecture documentation, workspace templates, SQLite DDL and two small Python utilities | Add framework case with a source excerpt; link from homepage. Distinguish documented policy from enforced controls. |
| AIE-Pulse-Meridian | Experimental Trends/RSS collection, normalization, signal detection, AI commentary and HTML output | Add to Lab/source index. Do not claim forecasting accuracy or validated business impact. |
| housemark | Frontend rules, references, starter files and integration instructions | Retain as a supporting utility; no duplicate showcase case. |
| fastwork-status | Public read-only service-status interface | Retain supporting prototype. Its presence does not prove uptime or monitoring service levels. |
| adulsaa-q | Profile README | Identity and links, not an additional project. |
| adulsaa-q.github.io | This portfolio's implementation and delivery pipeline | Implementation proof; footer/source access, not a self-promotional homepage case. |

The previously listed `kbank-finance-pipeline` has no reachable public repository in this
inventory. Preserve an unavailable record without linking to a 404 or restating unverified
implementation details. “Unavailable” does not mean the project was deleted or never existed.

## Corrections established from source

**Schema Map — P1, confirmed.** The old record named `src/schema_map/inspector.py` and
`src/schema_map/exporter.py`, while linking to README/repository roots. Those files do not
exist in the public tree. The implementation is `schema_to_obsidian.py`; generated notes
are in `schema_filemd/`. The old local SVG was not the committed Obsidian screenshot.
The portfolio now uses the actual public screenshot and links the actual script/notes.

The source counts rows with SELECT COUNT and emits Markdown sections. It does not require
only catalog access, does not emit exact DDL in frontmatter, and does not establish that
foreign-key relationships form an acyclic graph. Those assertions were removed. Relationship
cardinality labeling is a heuristic; composite-key cases require review. The interactive
portfolio graph remains visibly illustrative and separate from the source screenshot.

**AI Brand Tracker — source-strength plus boundary.** `src/runner.py` writes observations and
reloads the canonical DuckDB store for analytics. Its code and status document separate answer
surfaces and live/mock modes. The committed screenshot is a small Serper search-result run.
Its “market leadership” wording is not supported by that sample and is not adopted as a
portfolio claim. Preserve the screenshot as source evidence with a clear caption rather than
retouching it. The status document explicitly reports missing live-key integration tests,
in-process jobs and unvalidated recommendations/simulation. Those limits stay visible.

**AI Command Center — framework, not hosted orchestration.** The SQLite schema creates six
tables but no immutability triggers. The lock helper checks for a file before writing it; it
is advisory and not an atomic mutex. Present the actual templates, schema and utilities.
Do not promote the README's operational claims into independent evidence of safety,
adoption or productivity. Source code was inspected; external providers were not invoked.

**Profile claims.** The profile emphasizes financial semantic modeling and AI workflows.
Its financial reconciliation numbers and enterprise claims were not independently
established by the inspected public files. They are not imported as homepage statistics,
client outcomes or credentials. The AI-workflow breadth is now represented by actual public
projects, while BI/data modeling remains the principal service positioning.

## Prevention and maintenance

- All 25 case-study evidence paths checked against public repository trees; no missing paths
  after correction. See `github-source-path-check.json`.
- A content validator now rejects a VERIFIED GitHub source path linked to a different file;
  a regression test covers the old README-as-code failure mode. It does not certify runtime
  behavior or replace periodic external existence checks.
- Original screenshots are preserved. Responsive WebP variants are produced by the existing
  image script; no external screenshot/CDN dependency is introduced.
- Work distinguishes demonstration data, experimental projects and public implementations.
  Removed the misleading “Evidence-Led” count and source-link statistics as quality proxies.
- Repository descriptions and README test badges are treated as authored claims, not fresh
  measurements. No other repository was modified during this portfolio review.
