"use client";

import { useState } from "react";

type ViewMode = "erd" | "obsidian";

interface Column {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  fkTarget?: string;
}

interface TableNode {
  id: string;
  name: string;
  schema: string;
  recordEstimate: string;
  columns: Column[];
  obsidianTags: string[];
  x: number; // percentage in graph canvas
  y: number;
}

interface Edge {
  from: string;
  to: string;
  label: string;
  fkCol: string;
}

const TABLES: TableNode[] = [
  {
    id: "customers",
    name: "customers",
    schema: "public",
    recordEstimate: "45,000",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "email", type: "VARCHAR(255)" },
      { name: "tier", type: "VARCHAR(32)" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
    obsidianTags: ["#entity/dimension", "#source/crm"],
    x: 20,
    y: 28,
  },
  {
    id: "orders",
    name: "orders",
    schema: "public",
    recordEstimate: "185,000",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "customer_id", type: "UUID", isFk: true, fkTarget: "customers.id" },
      { name: "order_date", type: "TIMESTAMPTZ" },
      { name: "total_amount", type: "NUMERIC(12,2)" },
      { name: "status", type: "VARCHAR(40)" },
    ],
    obsidianTags: ["#entity/fact", "#domain/commerce"],
    x: 50,
    y: 35,
  },
  {
    id: "order_items",
    name: "order_items",
    schema: "public",
    recordEstimate: "520,000",
    columns: [
      { name: "id", type: "BIGINT", isPk: true },
      { name: "order_id", type: "UUID", isFk: true, fkTarget: "orders.id" },
      { name: "product_id", type: "UUID", isFk: true, fkTarget: "products.id" },
      { name: "quantity", type: "INT" },
      { name: "unit_price", type: "NUMERIC(10,2)" },
    ],
    obsidianTags: ["#entity/fact_detail", "#lineage/core"],
    x: 80,
    y: 45,
  },
  {
    id: "products",
    name: "products",
    schema: "public",
    recordEstimate: "3,200",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "category_id", type: "INT", isFk: true, fkTarget: "categories.id" },
      { name: "sku", type: "VARCHAR(64)" },
      { name: "price", type: "NUMERIC(10,2)" },
    ],
    obsidianTags: ["#entity/catalog", "#mdm/master"],
    x: 75,
    y: 80,
  },
  {
    id: "categories",
    name: "categories",
    schema: "public",
    recordEstimate: "85",
    columns: [
      { name: "id", type: "INT", isPk: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "slug", type: "VARCHAR(120)" },
    ],
    obsidianTags: ["#entity/lookup"],
    x: 40,
    y: 82,
  },
  {
    id: "payment_transactions",
    name: "payment_transactions",
    schema: "public",
    recordEstimate: "192,000",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "order_id", type: "UUID", isFk: true, fkTarget: "orders.id" },
      { name: "gateway", type: "VARCHAR(50)" },
      { name: "amount", type: "NUMERIC(12,2)" },
      { name: "settled_at", type: "TIMESTAMPTZ" },
    ],
    obsidianTags: ["#entity/finance", "#compliance/audit"],
    x: 20,
    y: 65,
  },
];

const EDGES: Edge[] = [
  { from: "orders", to: "customers", label: "1:N", fkCol: "customer_id" },
  { from: "order_items", to: "orders", label: "1:N", fkCol: "order_id" },
  { from: "order_items", to: "products", label: "1:N", fkCol: "product_id" },
  { from: "products", to: "categories", label: "1:N", fkCol: "category_id" },
  { from: "payment_transactions", to: "orders", label: "1:N", fkCol: "order_id" },
];

export function SchemaGraphViewer() {
  const [activeTableId, setActiveTableId] = useState<string>("orders");
  const [viewMode, setViewMode] = useState<ViewMode>("erd");
  const [copied, setCopied] = useState(false);

  const activeTable = TABLES.find((t) => t.id === activeTableId) ?? TABLES[1];

  // Connected nodes
  const connectedNeighbors = new Set<string>([activeTableId]);
  EDGES.forEach((edge) => {
    if (edge.from === activeTableId) connectedNeighbors.add(edge.to);
    if (edge.to === activeTableId) connectedNeighbors.add(edge.from);
  });

  const generatedMarkdown = `---
table: ${activeTable.name}
schema: ${activeTable.schema}
estimated_records: ${activeTable.recordEstimate}
tags: [${activeTable.obsidianTags.join(", ")}]
---

# ${activeTable.name} (PostgreSQL Schema)

## Relational Dependencies
${EDGES.filter((e) => e.from === activeTable.id)
  .map((e) => `- Foreign Key: \`${e.fkCol}\` → [[${e.to}]]`)
  .join("\n")}
${EDGES.filter((e) => e.to === activeTable.id)
  .map((e) => `- Referenced by: [[${e.from}]] (\`${e.fkCol}\`)`)
  .join("\n")}

## DDL Schema
\`\`\`sql
CREATE TABLE ${activeTable.schema}.${activeTable.name} (
${activeTable.columns
  .map(
    (c) =>
      `  ${c.name.padEnd(16)} ${c.type}${c.isPk ? " PRIMARY KEY" : ""}${
        c.isFk ? ` REFERENCES ${c.fkTarget?.split(".")[0]}(${c.fkTarget?.split(".")[1]})` : ""
      }`,
  )
  .join(",\n")}
);
\`\`\`
`;

  function copyMarkdown() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(generatedMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className="schema-graph-viewer"
      role="region"
      aria-label="PostgreSQL schema to Obsidian knowledge graph visualizer"
    >
      {/* Top Controller Bar */}
      <div className="schema-graph-viewer__header">
        <div className="schema-graph-viewer__title-group">
          <div className="schema-graph-viewer__badge">
            <span className="schema-graph-viewer__indicator" aria-hidden="true" />
            <span>SCHEMA-MAP ENGINE</span>
          </div>
          <span className="schema-graph-viewer__subtitle">
            PostgreSQL DDL &amp; Foreign Keys → Obsidian Graph View
          </span>
        </div>

        <div className="schema-graph-viewer__controls">
          <div className="schema-graph-viewer__tabs" role="tablist" aria-label="Graph display mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "erd"}
              className={`schema-tab-btn${viewMode === "erd" ? " is-active" : ""}`}
              onClick={() => setViewMode("erd")}
            >
              Relational ERD
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "obsidian"}
              className={`schema-tab-btn${viewMode === "obsidian" ? " is-active" : ""}`}
              onClick={() => setViewMode("obsidian")}
            >
              Obsidian Graph View
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="schema-graph-viewer__stage">
        {/* Visual Graph Canvas (SVG) */}
        <div className="schema-graph-canvas" aria-hidden="true">
          <svg className="schema-graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--signal-primary)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--signal-information)" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {EDGES.map((edge) => {
              const source = TABLES.find((t) => t.id === edge.from);
              const target = TABLES.find((t) => t.id === edge.to);
              if (!source || !target) return null;

              const isConnected =
                edge.from === activeTableId || edge.to === activeTableId;

              return (
                <g key={`${edge.from}-${edge.to}`} className="schema-edge-group">
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    className={`schema-edge-line${isConnected ? " is-highlighted" : ""}`}
                    stroke={isConnected ? "var(--signal-primary)" : "var(--line-strong)"}
                    strokeWidth={isConnected ? "1.8" : "0.9"}
                    strokeDasharray={viewMode === "obsidian" ? "2 2" : undefined}
                    strokeOpacity={isConnected ? 0.9 : 0.35}
                  />

                  {/* Flowing pulse packet along Foreign Key direction */}
                  {isConnected && (
                    <circle
                      r="1.5"
                      fill="var(--signal-primary)"
                      className="schema-edge-packet"
                    >
                      <animateMotion
                        path={`M ${source.x},${source.y} L ${target.x},${target.y}`}
                        dur="3.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Table Nodes */}
          {TABLES.map((table) => {
            const isSelected = table.id === activeTableId;
            const isNeighbor = connectedNeighbors.has(table.id);

            return (
              <button
                key={table.id}
                type="button"
                className={`schema-node schema-node--${viewMode}${
                  isSelected ? " is-selected" : ""
                }${!isNeighbor ? " is-dimmed" : ""}`}
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                }}
                onClick={() => setActiveTableId(table.id)}
                aria-label={`Inspect table ${table.name}`}
              >
                {viewMode === "erd" ? (
                  <div className="schema-node__card">
                    <div className="schema-node__header">
                      <span className="schema-node__icon">⌗</span>
                      <span className="schema-node__name">{table.name}</span>
                      <span className="schema-node__count">{table.recordEstimate}</span>
                    </div>
                    <ul className="schema-node__columns">
                      {table.columns.slice(0, 3).map((col) => (
                        <li key={col.name} className="schema-col-item">
                          <span
                            className={`schema-col-badge${
                              col.isPk ? " is-pk" : col.isFk ? " is-fk" : ""
                            }`}
                          >
                            {col.isPk ? "PK" : col.isFk ? "FK" : "•"}
                          </span>
                          <span className="schema-col-name">{col.name}</span>
                          <span className="schema-col-type">{col.type}</span>
                        </li>
                      ))}
                      {table.columns.length > 3 && (
                        <li className="schema-col-more">
                          +{table.columns.length - 3} more columns
                        </li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="schema-node__obsidian-circle">
                    <span className="obsidian-pulse-ring" />
                    <span className="obsidian-dot" />
                    <span className="obsidian-label">{table.name}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-Time Inspector Side Panel */}
        <aside className="schema-inspector" aria-label="Selected table inspector">
          <div className="schema-inspector__header">
            <div className="schema-inspector__title-row">
              <span className="schema-inspector__tag">POSTGRES TABLE</span>
              <span className="schema-inspector__records">
                Est. {activeTable.recordEstimate} rows
              </span>
            </div>
            <h4 className="schema-inspector__table-name">
              <code>{activeTable.schema}.{activeTable.name}</code>
            </h4>
          </div>

          {/* Connected Foreign Keys */}
          <div className="schema-inspector__section">
            <h5 className="schema-inspector__section-heading">Relational Foreign Keys</h5>
            <ul className="schema-inspector__relations">
              {EDGES.filter((e) => e.from === activeTable.id).map((edge) => (
                <li key={edge.to} className="relation-item relation-item--outgoing">
                  <span className="relation-dir">→ Outgoing FK:</span>
                  <code>{edge.fkCol}</code> references <strong>[[{edge.to}]]</strong>
                </li>
              ))}
              {EDGES.filter((e) => e.to === activeTable.id).map((edge) => (
                <li key={edge.from} className="relation-item relation-item--incoming">
                  <span className="relation-dir">← Referenced by:</span>
                  <strong>[[{edge.from}]]</strong> via <code>{edge.fkCol}</code>
                </li>
              ))}
              {EDGES.filter((e) => e.from === activeTable.id || e.to === activeTable.id)
                .length === 0 && (
                <li className="relation-item">Root isolated entity (no foreign keys).</li>
              )}
            </ul>
          </div>

          {/* Obsidian Output Preview */}
          <div className="schema-inspector__section">
            <div className="schema-inspector__section-header">
              <h5 className="schema-inspector__section-heading">Generated Obsidian Note</h5>
              <button
                type="button"
                className="schema-copy-btn"
                onClick={copyMarkdown}
                aria-label="Copy markdown"
              >
                {copied ? "Copied ✓" : "Copy Note"}
              </button>
            </div>
            <pre className="schema-markdown-preview">
              <code>{generatedMarkdown}</code>
            </pre>
          </div>
        </aside>
      </div>

      {/* Footer System Annotation */}
      <footer className="schema-graph-viewer__footer">
        <div className="schema-graph-stat">
          <span className="schema-graph-stat__label">Extracted Tables:</span>
          <span className="schema-graph-stat__val">{TABLES.length} relational entities</span>
        </div>
        <div className="schema-graph-stat">
          <span className="schema-graph-stat__label">FK Relationships:</span>
          <span className="schema-graph-stat__val">{EDGES.length} referential constraints</span>
        </div>
        <div className="schema-graph-stat">
          <span className="schema-graph-stat__label">Output Destination:</span>
          <span className="schema-graph-stat__val">Obsidian Graph View (.md wikilinks)</span>
        </div>
      </footer>
    </div>
  );
}
