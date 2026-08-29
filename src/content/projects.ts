import type { Project } from "@/types/project";

import { validateProjects } from "@/lib/content-validation";

export const projects: Project[] = [
  {
    slug: "ecommerce-sales-pipeline",
    name: "Multi-Channel E-commerce Sales Pipeline",
    displayTitle: "หนึ่ง dashboard จาก marketplace exports ที่ไม่เหมือนกัน",
    year: "Case study",
    status: "FEATURED",
    summary:
      "Power Query/M pipeline and Power BI model for aligning Shopee, Lazada and advertising exports into one inspectable reporting layer.",
    context:
      "Marketplace sales and advertising exports arrive with incompatible columns, status labels, fee fields and reporting periods.",
    problem:
      "A reporting view needs comparable platform, order and marketing data without treating incomplete months as completed periods.",
    impact:
      "Creates one comparable reporting layer so a team can inspect channel performance, payout and advertising signals without stitching exports by hand.",
    constraints: [
      "Repository assets use synthetic/anonymized demonstration data.",
      "The public repository does not include a Power BI PBIX file, live API integration or scheduled refresh proof.",
    ],
    input: [
      "Shopee Seller Center order exports",
      "Lazada CSV/Excel order exports",
      "Shopee/Lazada ads, affiliate/AMS and Meta CPAS exports",
    ],
    system: [
      "Power Query standardizes headers, statuses, types, platform and campaign labels.",
      "DimDate, DimPlatform and DimProduct connect Fact_Orders and Fact_Marketing in a documented star schema.",
      "DAX measures express revenue, net payout, AOV, ad spend and elapsed-day-aware month-over-month comparisons.",
    ],
    decisions: [
      {
        title: "Compare equal elapsed-day windows",
        why: "An incomplete current month should not be compared directly with a completed prior month.",
      },
      {
        title: "Keep raw channel exports separate from semantic reporting measures",
        why: "Source-specific cleaning stays visible while cross-channel calculations remain consistent in the model.",
      },
    ],
    implementation: [
      "Power Query/M transformations for orders, ads and CPAS inputs.",
      "Documented DAX measure register and dimensional Power BI model.",
    ],
    stack: ["Power Query/M", "Power BI", "DAX", "CSV", "Excel", "Star schema"],
    evidence: [
      {
        class: "VERIFIED_CODE",
        label: "Shopee order normalization query",
        sourcePath: "power_query/pq_order_sp.pq",
        sourceUrl:
          "https://github.com/adulsaa-q/ecommerce-sales-pipeline/blob/main/power_query/pq_order_sp.pq",
      },
      {
        class: "VERIFIED_CODE",
        label: "DAX measures register",
        sourcePath: "dax/measures.md",
        sourceUrl:
          "https://github.com/adulsaa-q/ecommerce-sales-pipeline/blob/main/dax/measures.md",
      },
      {
        class: "VERIFIED_ARTIFACT",
        label: "Committed dashboard images",
        sourcePath: "images/",
        sourceUrl:
          "https://github.com/adulsaa-q/ecommerce-sales-pipeline/tree/main/images",
      },
      {
        class: "SIMULATED",
        label: "Synthetic/anonymized sample inputs",
        sourcePath: "csv/",
        sourceUrl:
          "https://github.com/adulsaa-q/ecommerce-sales-pipeline/tree/main/csv",
      },
    ],
    limitations: [
      "ข้อมูลตัวอย่างเป็น synthetic/anonymized demonstration data — not client performance.",
      "No claim of live API ingestion, scheduled refresh, deployment or client outcome.",
    ],
    artifacts: [
      {
        type: "SCREENSHOT",
        src: "/images/ecommerce/data-model-overview-1.png",
        alt: "Power BI e-commerce dashboard showing marketplace filters, reporting KPIs and charts.",
        caption: "Committed project artifact. Figures are demonstration data.",
        reconstructed: false,
      },
    ],
    services: ["Power BI reporting", "Power Query data cleaning", "E-commerce reporting"],
    repository: "https://github.com/adulsaa-q/ecommerce-sales-pipeline",
  },
  {
    slug: "shopee-thailand-analytics",
    name: "Shopee Thailand Analytics",
    displayTitle: "Marketplace analytics for sales, customers, campaigns and delivery",
    year: "2022–2025 simulated case",
    status: "FEATURED",
    summary:
      "SQL analysis modules and a documented Power BI/DAX model for examining sales, customer behavior, campaigns and delivery performance.",
    context:
      "A simulated Shopee Thailand marketplace dataset is used as a portfolio case to explore executive-level commercial and operational questions.",
    problem:
      "Operational marketplace records need a legible model for connecting sales trends, customer retention, campaign activity and courier performance.",
    impact:
      "Turns separate commercial and logistics questions into a shared analytical model for clearer review of sales, retention, campaigns and delivery.",
    constraints: [
      "The README describes a simulated 300,000-order case; this is not Shopee internal/client data.",
      "The public repository has no committed PBIX, automated tests, CI workflow or licence file.",
    ],
    input: ["Simulated orders", "customers", "products", "campaigns", "shipments", "reviews"],
    system: [
      "Documented star schema centered on marketplace orders.",
      "SQL modules for sales performance, customer segmentation, campaign effectiveness and logistics performance.",
      "README-documented DAX calculations for segmentation, YoY and repeat rate.",
    ],
    decisions: [
      {
        title: "Separate commercial and logistics questions",
        why: "Revenue, retention, campaign and courier questions require different operational views of the same modeled data.",
      },
    ],
    implementation: ["MySQL-style SQL analysis", "Documented Power BI/DAX semantic-model logic"],
    stack: ["SQL", "Power BI", "DAX", "Star schema", "Kaggle simulated dataset"],
    evidence: [
      {
        class: "VERIFIED_CODE",
        label: "Sales-performance SQL module",
        sourcePath: "sql/01_sales_performance.sql",
        sourceUrl:
          "https://github.com/adulsaa-q/shopee-thailand-analytics/blob/main/sql/01_sales_performance.sql",
      },
      {
        class: "VERIFIED_ARTIFACT",
        label: "Sales, customer and data-model screenshots",
        sourcePath: "insights/screenshots/",
        sourceUrl:
          "https://github.com/adulsaa-q/shopee-thailand-analytics/tree/main/insights/screenshots",
      },
      {
        class: "README_REPORTED",
        label: "Dataset scope and documented model",
        sourcePath: "README.md",
        sourceUrl: "https://github.com/adulsaa-q/shopee-thailand-analytics/blob/main/README.md",
      },
      {
        class: "SIMULATED",
        label: "Marketplace case-study dataset",
        sourcePath: "README.md",
        sourceUrl: "https://github.com/adulsaa-q/shopee-thailand-analytics/blob/main/README.md",
      },
    ],
    limitations: [
      "กรณีศึกษานี้ใช้ข้อมูลจำลอง; displayed figures are not Shopee or client internal results.",
      "README-reported figures are not presented as independently reproduced outcomes.",
    ],
    artifacts: [
      {
        type: "SCREENSHOT",
        src: "/images/shopee/page1_sales.png",
        alt: "Shopee analytics sales performance dashboard with filters and revenue trend charts.",
        caption: "Committed case-study screenshot using simulated data.",
        reconstructed: false,
      },
      {
        type: "SCHEMA",
        src: "/images/shopee/data_model.png",
        alt: "Power BI data model screenshot for the simulated Shopee analytics case study.",
        caption: "Committed data-model artifact.",
        reconstructed: false,
      },
    ],
    services: ["SQL analytics", "Power BI dashboard", "E-commerce sales analysis"],
    repository: "https://github.com/adulsaa-q/shopee-thailand-analytics",
  },
  {
    slug: "finance-etl-pipeline",
    name: "Finance ETL Pipeline",
    displayTitle: "From e-statement PDF to an auditable data pipeline",
    year: "Pipeline case study",
    status: "FEATURED",
    summary:
      "A Python pipeline design for extracting KBank e-statements, validating transactions, loading PostgreSQL idempotently and preserving operational audit records.",
    context:
      "Spreadsheet-based processes can create incompatible layouts and weak traceability when repeated scripts write directly to reporting surfaces.",
    problem:
      "A financial-data workflow needs a database source of truth, repeatable parsing, explicit validation tiers and a recoverable audit trail.",
    impact:
      "Creates a repeatable path from statement input to validated, traceable records, reducing ambiguity when financial-data loads are retried or reviewed.",
    constraints: [
      "Current parser scope is KBank PDF statements plus a basic generic fallback.",
      "Statements, transaction data, email content and error payloads are sensitive and are never displayed on this portfolio.",
    ],
    input: ["Gmail IMAP statement email", "KBank PDF attachment", "keyword categorisation rules"],
    system: [
      "Select statement attachment, extract PDF text, normalize Thai/Buddhist-era dates and parse transactions.",
      "Validate PASS/WARNING/REJECT tiers before idempotent PostgreSQL loading.",
      "Preserve source-message, source-document, ETL-run and parser-error audit records; optional Sheets export reads downstream from PostgreSQL.",
    ],
    decisions: [
      {
        title: "Use PostgreSQL as source of truth",
        why: "Reporting sheets remain downstream output rather than becoming the system of record.",
      },
      {
        title: "Use Decimal and database numeric values for money",
        why: "Financial values should not depend on floating-point arithmetic.",
      },
      {
        title: "Make repeated loads idempotent",
        why: "Deterministic identity plus conflict-safe inserts prevent duplicate transactions during retries.",
      },
    ],
    implementation: [
      "Python orchestration, parsing, normalization and validation layers.",
      "PostgreSQL migrations, audit entities and idempotent upsert behavior.",
      "Unit/integration test files including database-gated integration coverage.",
    ],
    stack: [
      "Python",
      "Pydantic",
      "psycopg 3",
      "pdfplumber",
      "pandas",
      "PostgreSQL",
      "Supabase",
      "Gmail IMAP",
      "Google Sheets API",
      "pytest",
      "GitHub Actions",
    ],
    evidence: [
      {
        class: "VERIFIED_CODE",
        label: "Pipeline orchestrator",
        sourcePath: "src/pipeline/orchestrator.py",
        sourceUrl:
          "https://github.com/adulsaa-q/finance-etl-pipeline/blob/master/src/pipeline/orchestrator.py",
      },
      {
        class: "VERIFIED_CODE",
        label: "PostgreSQL migration and audit schema",
        sourcePath: "db/migrations/0001_init.sql",
        sourceUrl:
          "https://github.com/adulsaa-q/finance-etl-pipeline/blob/master/db/migrations/0001_init.sql",
      },
      {
        class: "VERIFIED_TEST",
        label: "Unit and PostgreSQL integration test suite",
        sourcePath: "tests/",
        sourceUrl:
          "https://github.com/adulsaa-q/finance-etl-pipeline/tree/master/tests",
      },
    ],
    limitations: [
      "KBank-specific parser scope; do not imply broad multi-bank production support.",
      "No public evidence of a successful finance ETL workflow run with live credentials.",
      "No claim of encryption-at-rest, retention/deletion, RLS, masking or production access-control policy.",
    ],
    artifacts: [
      {
        type: "SYSTEM_DIAGRAM",
        alt: "Reconstructed data flow from statement email and PDF parsing through validation, PostgreSQL audit records and optional reporting export.",
        caption: "Reconstructed from implementation; no financial record is shown.",
        reconstructed: true,
      },
    ],
    services: ["Python ETL", "PostgreSQL data pipeline", "Operational reporting automation"],
    repository: "https://github.com/adulsaa-q/finance-etl-pipeline",
  },
  {
    slug: "timelimit",
    name: "TIMELIMIT",
    displayTitle: "Offline-first desktop deadline instrument",
    year: "Desktop application",
    status: "FEATURED",
    summary:
      "An Electron/TypeScript desktop widget that makes long-term deadlines visible through timestamp-based time calculation, deduction rules and local persistence.",
    context:
      "A long commitment can lose urgency when it has no visible, daily accountability mechanism.",
    problem:
      "The deadline tool needs to preserve correct remaining-time behavior across sleep/resume, calendar boundaries and local state changes.",
    impact:
      "Keeps a long-term deadline visible and derived from the current timestamp, so local users can review remaining time without relying on a drifting counter.",
    constraints: [
      "The project is portfolio code, not a signed or hardened production release.",
      "The app is local/offline; it does not demonstrate external SaaS/API integration.",
    ],
    input: ["start date", "commitment years", "deduction events", "local user settings"],
    system: [
      "Renderer UI calls clock, deduction and UTC date engines.",
      "A narrow contextBridge connects local UI state to Electron main-process capabilities.",
      "State persistence follows temporary file, fsync and rename behavior in the app user-data directory.",
    ],
    decisions: [
      {
        title: "Calculate from timestamps rather than decrementing a counter",
        why: "Time remaining stays derived from the current clock after sleep/resume rather than drifting with a running counter.",
      },
      {
        title: "Persist state atomically",
        why: "Temporary-file write, fsync and rename reduce partial-write exposure for local state.",
      },
    ],
    implementation: [
      "Electron renderer/main/preload layers with a narrow IPC bridge.",
      "UTC-aware date math, deduction engine, translations and local window/tray controls.",
      "Five committed Vitest files declaring 27 test cases.",
    ],
    stack: ["Electron", "TypeScript", "Vite", "Vitest", "electron-builder", "HTML", "CSS"],
    evidence: [
      {
        class: "VERIFIED_CODE",
        label: "Timestamp clock engine",
        sourcePath: "src/clock/clockEngine.ts",
        sourceUrl: "https://github.com/adulsaa-q/timelimit/blob/main/src/clock/clockEngine.ts",
      },
      {
        class: "VERIFIED_TEST",
        label: "Five Vitest files declaring 27 cases",
        sourcePath: "tests/",
        sourceUrl: "https://github.com/adulsaa-q/timelimit/tree/main/tests",
      },
      {
        class: "VERIFIED_ARTIFACT",
        label: "Committed desktop UI screenshots",
        sourcePath: "docs/images/",
        sourceUrl: "https://github.com/adulsaa-q/timelimit/tree/main/docs/images",
      },
    ],
    limitations: [
      "No claim of independently verified public CI execution, signing or hardened production security.",
      "Electron configuration includes sandbox:false; do not position as a security-hardened release.",
    ],
    artifacts: [
      {
        type: "SCREENSHOT",
        src: "/images/timelimit/timelimit-widget.png",
        alt: "Dark offline TIMELIMIT desktop widget with a tabular countdown display and deduction control.",
        caption: "Committed desktop UI artifact.",
        reconstructed: false,
      },
    ],
    services: ["Desktop MVP", "Electron", "Offline internal tool"],
    repository: "https://github.com/adulsaa-q/timelimit",
  },
];

const validationErrors = validateProjects(projects);

if (validationErrors.length > 0) {
  throw new Error(`Invalid portfolio content:\n${validationErrors.join("\n")}`);
}
