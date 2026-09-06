"use client";

import { useState } from "react";

const stages = [
  {
    key: "DATA",
    subtitle: "Source Ingestion & Extraction",
    note: "messy source exports",
    details: "Ingesting heterogeneous source streams: Shopee CSVs, Lazada Seller Center exports, KBank PDF e-statements, and Gmail IMAP. Cryptographic hashes preserved for strict auditability.",
    tech: ["pdfplumber", "imaplib", "Pydantic v2", "Regex normalizer"],
  },
  {
    key: "MODEL",
    subtitle: "Conformed Star Schema",
    note: "one legible structure",
    details: "Single-truth dimensional architecture: Dim_Date, Dim_Platform, and Dim_Product connected to Fact_Orders with zero many-to-many ambiguity and zero fan-out calculation traps.",
    tech: ["Star Schema", "Power Query M", "PostgreSQL", "Surrogate Keys"],
  },
  {
    key: "DECISION",
    subtitle: "Semantic DAX & Metrics",
    note: "measures and rules",
    details: "Business-critical logic: Elapsed-Day MoM comparative windows, blended ROAS across CPAS and marketplace ads, and customer cohort repurchase frequency.",
    tech: ["DAX Measures", "Time Intelligence", "Safe DIVIDE", "Power BI"],
  },
  {
    key: "HANDOVER",
    subtitle: "Verification & Documentation",
    note: "tests and docs",
    details: "Repeatable, audited deliverable package: automated test coverage (Vitest), comprehensive data dictionaries, idempotent migrations, and clean handover specs.",
    tech: ["Vitest (100% pass)", "TypeScript", "GitHub Actions", "Audit Logs"],
  },
] as const;

/**
 * The working path, drawn rather than listed. Decorative-but-informative:
 * it restates the four stages the site is organised around with interactive inspection.
 */
export function PipelineDiagram() {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  return (
    <figure className="pipeline-diagram" aria-label="From source data to handover: data, model, decision, handover">
      <div className="pipeline-diagram__track">
        {stages.map((stage, index) => {
          const isSelected = selectedStage === index;
          return (
            <button
              type="button"
              className={`pipeline-node ${isSelected ? "pipeline-node--active" : ""}`}
              key={stage.key}
              onClick={() => setSelectedStage(index)}
              aria-pressed={isSelected}
            >
              <span className="pipeline-node__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="pipeline-node__label">{stage.key}</span>
              <span className="pipeline-node__note">{stage.note}</span>
              {index < stages.length - 1 ? (
                <span className="pipeline-node__link" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="pipeline-inspector">
        <div className="pipeline-inspector__header">
          <div className="pipeline-inspector__stage-badge">
            <span>STAGE {String(selectedStage + 1).padStart(2, "0")}</span>
            <strong>{stages[selectedStage].key}</strong>
          </div>
          <span className="pipeline-inspector__subtitle">{stages[selectedStage].subtitle}</span>
        </div>
        <p className="pipeline-inspector__desc">{stages[selectedStage].details}</p>
        <ul className="pipeline-inspector__tech" aria-label={`Technologies for ${stages[selectedStage].key}`}>
          {stages[selectedStage].tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
