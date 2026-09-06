"use client";

import { useState } from "react";

type SchemaTable = {
  id: string;
  name: string;
  type: "fact" | "dimension";
  primaryKey: string;
  foreignKeys?: string[];
  columns: string[];
  description: string;
};

const SCHEMA_DATA: Record<string, { title: string; factName: string; tables: SchemaTable[] }> = {
  "ecommerce-sales-pipeline": {
    title: "Multi-Channel Conformed Star Schema",
    factName: "Fact_Orders & Fact_Marketing",
    tables: [
      {
        id: "fact_orders",
        name: "Fact_Orders",
        type: "fact",
        primaryKey: "order_id",
        foreignKeys: ["date_key", "platform_id", "product_id"],
        columns: ["order_id", "date_key", "platform_id", "product_id", "gmv", "net_payout", "shipping_fee"],
        description: "Granular normalized order records across Shopee and Lazada exports.",
      },
      {
        id: "fact_marketing",
        name: "Fact_Marketing",
        type: "fact",
        primaryKey: "marketing_row_id",
        foreignKeys: ["date_key", "platform_id"],
        columns: ["marketing_row_id", "date_key", "platform_id", "ad_spend", "cpas_spend", "impressions"],
        description: "Daily aggregated campaign, affiliate, and Meta CPAS ad performance.",
      },
      {
        id: "dim_date",
        name: "Dim_Date",
        type: "dimension",
        primaryKey: "date_key",
        columns: ["date_key", "calendar_date", "day_of_month", "month_year", "elapsed_days_window"],
        description: "Conformed date dimension enabling equal elapsed-day MoM comparisons.",
      },
      {
        id: "dim_platform",
        name: "Dim_Platform",
        type: "dimension",
        primaryKey: "platform_id",
        columns: ["platform_id", "platform_code", "channel_name", "fee_structure_tier"],
        description: "Normalized channel dimension bridging Shopee and Lazada order schemas.",
      },
      {
        id: "dim_product",
        name: "Dim_Product",
        type: "dimension",
        primaryKey: "product_id",
        columns: ["product_id", "sku_code", "master_category", "product_tier"],
        description: "Harmonized catalog dimension reconciling divergent marketplace SKU naming.",
      },
    ],
  },
  "shopee-thailand-analytics": {
    title: "Marketplace Analytical Star Schema",
    factName: "Fact_Orders",
    tables: [
      {
        id: "fact_orders",
        name: "Fact_Orders",
        type: "fact",
        primaryKey: "order_id",
        foreignKeys: ["customer_id", "product_id", "campaign_id", "date_key"],
        columns: ["order_id", "date_key", "customer_id", "product_id", "campaign_id", "gross_revenue", "order_status"],
        description: "Central transaction grain across the simulated Shopee Thailand marketplace dataset.",
      },
      {
        id: "dim_customer",
        name: "Dim_Customer",
        type: "dimension",
        primaryKey: "customer_id",
        columns: ["customer_id", "province", "region", "cohort_month", "repeat_buyer_tier"],
        description: "Buyer segmentation dimension powering provincial maps and retention analysis.",
      },
      {
        id: "dim_product",
        name: "Dim_Product",
        type: "dimension",
        primaryKey: "product_id",
        columns: ["product_id", "product_title", "category_level1", "price_band"],
        description: "Product catalog hierarchy supporting category contribution analysis.",
      },
      {
        id: "dim_campaign",
        name: "Dim_Campaign",
        type: "dimension",
        primaryKey: "campaign_id",
        columns: ["campaign_id", "campaign_type", "mega_sale_flag", "discount_structure"],
        description: "Double-digit and pay-day campaign dimension connecting promotion to sales volume.",
      },
    ],
  },
};

export function StarSchemaViewer({ projectSlug }: { projectSlug: string }) {
  const schema = SCHEMA_DATA[projectSlug];
  const [selectedTableId, setSelectedTableId] = useState<string>(
    schema?.tables[0]?.id ?? "",
  );

  if (!schema) {
    return null;
  }

  const selectedTable =
    schema.tables.find((t) => t.id === selectedTableId) ?? schema.tables[0];

  return (
    <div className="schema-viewer" role="region" aria-label="Interactive Star Schema Blueprint">
      <div className="schema-viewer__header">
        <div className="schema-viewer__header-title">
          <span className="schema-viewer__badge">DIMENSIONAL ARCHITECTURE</span>
          <h3>{schema.title}</h3>
        </div>
        <p className="schema-viewer__hint">
          Select any table node to inspect its grain, keys, and conformed role.
        </p>
      </div>

      <div className="schema-viewer__canvas">
        <div className="schema-nodes-strip" role="tablist" aria-label="Schema tables">
          {schema.tables.map((table) => {
            const isSelected = table.id === selectedTable.id;
            return (
              <button
                key={table.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`schema-node-btn schema-node-btn--${table.type} ${
                  isSelected ? "schema-node-btn--active" : ""
                }`}
                onClick={() => setSelectedTableId(table.id)}
              >
                <span className="schema-node-btn__tag">
                  {table.type === "fact" ? "FACT [★]" : "DIM [1:N]"}
                </span>
                <strong className="schema-node-btn__name">{table.name}</strong>
                <span className="schema-node-btn__pk">PK: {table.primaryKey}</span>
              </button>
            );
          })}
        </div>

        <div className="schema-table-inspector">
          <div className="schema-table-inspector__header">
            <div>
              <span className="schema-table-inspector__type-pill">
                {selectedTable.type === "fact" ? "Fact Table (Measurable Events)" : "Conformed Dimension"}
              </span>
              <h4>{selectedTable.name}</h4>
            </div>
            <span className="schema-table-inspector__pk-badge">
              Primary Key: <code>{selectedTable.primaryKey}</code>
            </span>
          </div>

          <p className="schema-table-inspector__desc">{selectedTable.description}</p>

          <div className="schema-table-inspector__columns">
            <span className="schema-table-inspector__section-label">Field Definitions:</span>
            <ul className="schema-table-inspector__col-list">
              {selectedTable.columns.map((col) => {
                const isPk = col === selectedTable.primaryKey;
                const isFk = selectedTable.foreignKeys?.includes(col);
                return (
                  <li
                    key={col}
                    className={`schema-col-item ${
                      isPk ? "schema-col-item--pk" : isFk ? "schema-col-item--fk" : ""
                    }`}
                  >
                    <code>{col}</code>
                    {isPk ? <span className="schema-col-tag">PK</span> : null}
                    {isFk ? <span className="schema-col-tag schema-col-tag--fk">FK ➔ JOIN</span> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
