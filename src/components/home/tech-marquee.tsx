"use client";

import { useState } from "react";

type CategoryKey = "all" | "bi" | "automation" | "engineering";

interface TechItem {
  name: string;
  category: "bi" | "automation" | "engineering";
  role: string;
}

const techCatalog: TechItem[] = [
  { name: "Power BI", category: "bi", role: "Star schema models, DAX semantic measures, interactive dashboards" },
  { name: "Power Query/M", category: "bi", role: "Cross-platform data transformation, Buddhist-era year normalization" },
  { name: "DAX", category: "bi", role: "Time-intelligence, elapsed-day AOV calculations, blended ROAS" },
  { name: "SQL", category: "bi", role: "Complex aggregations, CTEs, window functions for revenue analysis" },
  { name: "PostgreSQL", category: "bi", role: "Relational data store with ACID guarantees & idempotent upsert logic" },
  { name: "Supabase", category: "bi", role: "Postgres-backed operational backend with row-level security" },
  { name: "SQLite", category: "bi", role: "Local embedded database for isolated local desktop utilities" },
  { name: "Python", category: "automation", role: "Core pipeline runtime for data ingestion, PDF parsing, and validation" },
  { name: "Gmail IMAP", category: "automation", role: "Automated retrieval of bank statement e-mails and CSV attachments" },
  { name: "PDF parsing", category: "automation", role: "Extraction of tabular data from KBank e-statement PDFs (pdfplumber)" },
  { name: "Google Sheets API", category: "automation", role: "Automated operational handovers and real-time client sync" },
  { name: "SQLAlchemy", category: "automation", role: "Schema migrations and transactional database management" },
  { name: "TypeScript", category: "engineering", role: "Strictly typed web frontends, evidence registries, and data contracts" },
  { name: "Electron", category: "engineering", role: "Cross-platform offline desktop utilities (e.g. Timelimit)" },
  { name: "Vite", category: "engineering", role: "High-performance frontend bundling and development environment" },
  { name: "Vitest", category: "engineering", role: "Fast unit and regression test runner (100% test pass record)" },
  { name: "GitHub Actions", category: "engineering", role: "Automated CI/CD workflows, static generation, and deployment" },
  { name: "Obsidian", category: "engineering", role: "Knowledge base graph and architecture documentation system" },
  { name: "Pydantic", category: "automation", role: "Schema-level data validation and multi-tier data sanitization" },
  { name: "Docker", category: "engineering", role: "Containerized pipeline execution and reproducible local environments" },
];

export function TechMarquee() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  const filteredTech = activeCategory === "all"
    ? techCatalog
    : techCatalog.filter((item) => item.category === activeCategory);

  return (
    <section className="tech-marquee" aria-label="Verified technology stack">
      <div className="tech-marquee__header">
        <p className="tech-marquee__label">Verified stack</p>
        <div className="tech-marquee__filters" role="tablist" aria-label="Filter technology stack">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`filter-btn ${activeCategory === "all" ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All ({techCatalog.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "bi"}
            className={`filter-btn ${activeCategory === "bi" ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory("bi")}
          >
            BI &amp; SQL (7)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "automation"}
            className={`filter-btn ${activeCategory === "automation" ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory("automation")}
          >
            Data Pipelines (5)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "engineering"}
            className={`filter-btn ${activeCategory === "engineering" ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory("engineering")}
          >
            Engineering &amp; Tools (8)
          </button>
        </div>
      </div>

      <ul className="tech-marquee__track">
        {filteredTech.map((tech) => (
          <li
            key={tech.name}
            className={`tech-pill ${activeTech?.name === tech.name ? "tech-pill--active" : ""}`}
            onMouseEnter={() => setActiveTech(tech)}
            onMouseLeave={() => setActiveTech(null)}
            tabIndex={0}
            onFocus={() => setActiveTech(tech)}
            onBlur={() => setActiveTech(null)}
          >
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>

      {activeTech && (
        <div className="tech-tooltip-card" role="status">
          <strong>{activeTech.name}:</strong>
          <span>{activeTech.role}</span>
        </div>
      )}
    </section>
  );
}
