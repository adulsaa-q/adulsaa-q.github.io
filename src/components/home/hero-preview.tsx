"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

type TabKey = "dashboard" | "schema" | "pipeline";

export function HeroDataPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [copied, setCopied] = useState(false);
  const [highlightedEntity, setHighlightedEntity] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedStage, setSimulatedStage] = useState(1);

  // Keyboard navigation: 1 for Dashboard, 2 for Schema, 3 for Pipeline
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "1") setActiveTab("dashboard");
      if (e.key === "2") setActiveTab("schema");
      if (e.key === "3") setActiveTab("pipeline");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Copy SQL query to clipboard
  function handleCopySQL() {
    const query = "SELECT date_trunc('month', date) AS month, sum(gross_gmv) AS gmv, sum(net_payout) AS payout FROM fact_orders GROUP BY 1";
    try {
      navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard fallback
    }
  }

  // Simulate pipeline execution
  function triggerSimulation() {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedStage(0);
    setTimeout(() => setSimulatedStage(1), 700);
    setTimeout(() => setSimulatedStage(2), 1400);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedStage(1);
    }, 2400);
  }

  return (
    <div className="hero-preview" aria-label="Interactive systems preview">
      <div className="app-window">
        <div className="app-window__header">
          <div className="app-window__dots" aria-hidden="true">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <div className="app-window__meta">
            <span className="app-window__title">evidence-workspace // q-analytics</span>
            <span className="keyboard-hint" aria-hidden="true">Keys [1, 2, 3]</span>
          </div>
          <div className="app-window__tabs" role="tablist" aria-label="System views">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "dashboard"}
              className={`app-tab ${activeTab === "dashboard" ? "app-tab--active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              01 / BI Dashboard
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "schema"}
              className={`app-tab ${activeTab === "schema" ? "app-tab--active" : ""}`}
              onClick={() => setActiveTab("schema")}
            >
              02 / Star Schema
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pipeline"}
              className={`app-tab ${activeTab === "pipeline" ? "app-tab--active" : ""}`}
              onClick={() => setActiveTab("pipeline")}
            >
              03 / ETL Pipeline
            </button>
          </div>
        </div>

        <div className="app-window__body">
          <div className="preview-query-bar">
            <div className="preview-query-bar__spec">
              <span className="query-badge">
                {activeTab === "dashboard" ? "SQL QUERY" : activeTab === "schema" ? "SCHEMA SPEC" : "ETL FLOW"}
              </span>
              <code className="query-code">
                {activeTab === "dashboard" && "SELECT date_trunc('month', date) AS month, sum(gross_gmv) AS gmv, sum(net_payout) AS payout FROM fact_orders GROUP BY 1"}
                {activeTab === "schema" && "fact_orders ──(1:N)──> dim_date, dim_platform, dim_product [0 many-to-many bridges]"}
                {activeTab === "pipeline" && "extract(pdf) ➔ validate(pydantic_v2) ➔ upsert(postgresql) [idempotent audit]"}
              </code>
            </div>
            <div className="preview-query-bar__actions">
              {activeTab === "dashboard" && (
                <button
                  type="button"
                  onClick={handleCopySQL}
                  className="query-action-btn"
                  title="Copy SQL Query"
                  aria-label="Copy SQL Query"
                >
                  {copied ? "✓ Copied" : "Copy SQL"}
                </button>
              )}
              {activeTab === "pipeline" && (
                <button
                  type="button"
                  onClick={triggerSimulation}
                  className="query-action-btn"
                  disabled={isSimulating}
                  aria-label="Simulate pipeline run"
                >
                  {isSimulating ? "● Running..." : "▶ Simulate"}
                </button>
              )}
              <span className="query-status">
                {activeTab === "dashboard" && "● COMPILED (12ms)"}
                {activeTab === "schema" && "● VALIDATED"}
                {activeTab === "pipeline" && (isSimulating ? "● EXECUTING" : "● SCHEDULED (06:00)")}
              </span>
            </div>
          </div>

          {activeTab === "dashboard" && (
            <div className="preview-pane preview-pane--dashboard">
              <div className="preview-kpi-bar">
                <div className="preview-kpi">
                  <span className="preview-kpi__label">Consolidated Revenue</span>
                  <strong className="preview-kpi__value">฿12.4M</strong>
                  <small className="preview-kpi__note">Shopee + Lazada (+18.4% YoY)</small>
                </div>
                <div className="preview-kpi">
                  <span className="preview-kpi__label">Elapsed-Day AOV</span>
                  <strong className="preview-kpi__value">฿1,280</strong>
                  <small className="preview-kpi__note">Equal elapsed window</small>
                </div>
                <div className="preview-kpi">
                  <span className="preview-kpi__label">Blended ROAS</span>
                  <strong className="preview-kpi__value">4.82x</strong>
                  <small className="preview-kpi__note">CPAS + On-platform ads</small>
                </div>
              </div>

              <figure className="preview-image-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath("/images/ecommerce/data-model-overview-1.png")}
                  alt="Multi-channel e-commerce Power BI reporting dashboard"
                  width={1920}
                  height={1095}
                  loading="eager"
                />
                <figcaption className="preview-caption">
                  <span>LIVE ARTIFACT</span> Power BI reporting layer aligning inconsistent Shopee, Lazada and advertising exports.
                  <Link href="/work/ecommerce-sales-pipeline" className="preview-caption__link">
                    Inspect case study →
                  </Link>
                </figcaption>
              </figure>
            </div>
          )}

          {activeTab === "schema" && (
            <div className="preview-pane preview-pane--schema">
              <div className="schema-visualizer">
                <div className="schema-col">
                  <div
                    className={`schema-table-card ${highlightedEntity === "fact" ? "schema-table-card--linked" : ""}`}
                    onMouseEnter={() => setHighlightedEntity("dim_date")}
                    onMouseLeave={() => setHighlightedEntity(null)}
                  >
                    <span className="schema-table-card__type">DIMENSION</span>
                    <h4>Dim_Date</h4>
                    <ul>
                      <li>DateKey [PK]</li>
                      <li>Date, Month, Quarter, Year</li>
                      <li>IsElapsedDayWindow (Boolean)</li>
                    </ul>
                  </div>
                  <div
                    className={`schema-table-card ${highlightedEntity === "fact" ? "schema-table-card--linked" : ""}`}
                    onMouseEnter={() => setHighlightedEntity("dim_platform")}
                    onMouseLeave={() => setHighlightedEntity(null)}
                  >
                    <span className="schema-table-card__type">DIMENSION</span>
                    <h4>Dim_Platform</h4>
                    <ul>
                      <li>PlatformKey [PK]</li>
                      <li>Channel (Shopee / Lazada)</li>
                      <li>FeeStructureTier</li>
                    </ul>
                  </div>
                </div>

                <div className="schema-col schema-col--center">
                  <div
                    className={`schema-table-card schema-table-card--fact ${highlightedEntity ? "schema-table-card--highlighted" : ""}`}
                    onMouseEnter={() => setHighlightedEntity("fact")}
                    onMouseLeave={() => setHighlightedEntity(null)}
                  >
                    <span className="schema-table-card__type schema-table-card__type--accent">FACT TABLE</span>
                    <h4>Fact_Orders</h4>
                    <p className="schema-table-card__desc">Normalized cross-platform transactions</p>
                    <ul>
                      <li>OrderNumber, DateKey, PlatformKey</li>
                      <li>GrossGMV, PlatformFee, NetPayout</li>
                      <li>OrderStatus, SKU, Quantity</li>
                    </ul>
                  </div>
                  <div className="schema-connector">
                    <span>1:N star relation</span>
                  </div>
                  <div
                    className="schema-table-card schema-table-card--fact"
                    onMouseEnter={() => setHighlightedEntity("fact")}
                    onMouseLeave={() => setHighlightedEntity(null)}
                  >
                    <span className="schema-table-card__type schema-table-card__type--accent">FACT TABLE</span>
                    <h4>Fact_Marketing</h4>
                    <p className="schema-table-card__desc">CPAS &amp; On-platform advertising</p>
                    <ul>
                      <li>CampaignKey, DateKey, PlatformKey</li>
                      <li>AdSpend, Impressions, Clicks</li>
                    </ul>
                  </div>
                </div>

                <div className="schema-col">
                  <div
                    className={`schema-table-card ${highlightedEntity === "fact" ? "schema-table-card--linked" : ""}`}
                    onMouseEnter={() => setHighlightedEntity("dim_product")}
                    onMouseLeave={() => setHighlightedEntity(null)}
                  >
                    <span className="schema-table-card__type">DIMENSION</span>
                    <h4>Dim_Product</h4>
                    <ul>
                      <li>ProductKey [PK]</li>
                      <li>MasterSKU, Category</li>
                      <li>CostPrice, BasePrice</li>
                    </ul>
                  </div>
                  <div className="schema-table-card schema-table-card--measures">
                    <span className="schema-table-card__type">DAX MEASURES</span>
                    <h4>Semantic Logic</h4>
                    <ul>
                      <li>[Net Revenue] = SUM(NetPayout)</li>
                      <li>[Elapsed MoM %] = CALCULATE(...)</li>
                      <li>[Blended ROAS] = DIVIDE(GMV, AdSpend)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="schema-footer">
                <p>Star schema modeled to eliminate many-to-many ambiguity and ensure zero-drift date calculations.</p>
                <Link href="/work/ecommerce-sales-pipeline" className="text-link">
                  View DAX &amp; Power Query specs →
                </Link>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className="preview-pane preview-pane--pipeline">
              <div className="pipeline-flow-grid">
                <div className={`flow-step ${simulatedStage === 0 ? "flow-step--active" : ""}`}>
                  <span className="flow-step__badge">INPUT</span>
                  <h4>01 / Raw Unstructured</h4>
                  <p>Incompatible formats: KBank PDF e-statements, Shopee CSVs, Gmail IMAP attachments.</p>
                  <div className="flow-step__code">
                    <code>pdfplumber.extract_text()</code>
                    <code>imaplib.fetch_mail()</code>
                  </div>
                </div>

                <div className="flow-arrow-indicator" aria-hidden="true">→</div>

                <div className={`flow-step ${simulatedStage === 1 ? "flow-step--active" : ""}`}>
                  <span className="flow-step__badge flow-step__badge--primary">TRANSFORM</span>
                  <h4>02 / Normalization &amp; Tiers</h4>
                  <p>Buddhist-era date conversion, regex transaction parsing, and Pydantic validation tiers (PASS / WARN / REJECT).</p>
                  <div className="flow-step__code">
                    <code>Pydantic.validator</code>
                    <code>Decimal(money) != float</code>
                  </div>
                </div>

                <div className="flow-arrow-indicator" aria-hidden="true">→</div>

                <div className={`flow-step ${simulatedStage === 2 ? "flow-step--active" : ""}`}>
                  <span className="flow-step__badge">LOAD &amp; AUDIT</span>
                  <h4>03 / PostgreSQL Upsert</h4>
                  <p>Idempotent conflict-safe writes, source document tracking, and recoverable audit runs.</p>
                  <div className="flow-step__code">
                    <code>INSERT ON CONFLICT DO UPDATE</code>
                    <code>etl_runs audit record</code>
                  </div>
                </div>
              </div>

              <div className="schema-footer">
                <p>Designed for financial precision: Decimal arithmetic, idempotent retries, and preserved document hashes.</p>
                <Link href="/work/finance-etl-pipeline" className="text-link">
                  Inspect pipeline architecture →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
