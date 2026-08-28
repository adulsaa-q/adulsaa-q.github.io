export type ArchiveStatus = "ARCHIVE" | "EXPERIMENTAL";

export interface ArchiveRecord {
  name: string;
  status: ArchiveStatus;
  summary: string;
  limitation: string;
  repository: string;
}

export const archiveRecords: ArchiveRecord[] = [
  {
    name: "schema-map",
    status: "ARCHIVE",
    summary: "PostgreSQL metadata to Markdown/Obsidian relationship map.",
    limitation:
      "Schema metadata can be sensitive; use requires least-privilege access and private handling.",
    repository: "https://github.com/adulsaa-q/schema-map",
  },
  {
    name: "AI Command Center",
    status: "ARCHIVE",
    summary: "Governance and evidence templates for agent workflows.",
    limitation:
      "External integrations are configuration placeholders; no test metrics, run metrics or product screenshots are claimed.",
    repository: "https://github.com/adulsaa-q/ai-command-center",
  },
  {
    name: "AIE Pulse Meridian",
    status: "EXPERIMENTAL",
    summary: "Market-monitoring and HTML report prototype.",
    limitation:
      "Historical samples and live sources may drift; this experimental record is not investment advice.",
    repository: "https://github.com/adulsaa-q/AIE-Pulse-Meridian",
  },
  {
    name: "AI Brand Visibility Tracker",
    status: "EXPERIMENTAL",
    summary: "Gemini-grounded brand-mention research prototype.",
    limitation:
      "CSV, notebook and README metrics need reconciliation; raw first-position/string-match is not semantic ranking.",
    repository: "https://github.com/adulsaa-q/ai_brand_tracker",
  },
];
