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
    name: "fastwork-status",
    status: "ARCHIVE",
    summary: "Operational service status board and response-time monitoring prototype.",
    limitation:
      "Service-level status only; does not expose internal worker logs, credentials, or control actions.",
    repository: "https://github.com/adulsaa-q/fastwork-status",
  },
  {
    name: "kbank-finance-pipeline",
    status: "EXPERIMENTAL",
    summary: "KBank statement transaction extraction and ledger reconciliation toolkit.",
    limitation:
      "Format-dependent parser; altered banking layout formats require updated parsing patterns.",
    repository: "https://github.com/adulsaa-q/kbank-finance-pipeline",
  },
  {
    name: "housemark",
    status: "EXPERIMENTAL",
    summary: "Deterministic frontend engineering standard and code craftsmanship rulebook.",
    limitation:
      "Technical floor standard; does not dictate company brand guidelines or visual art direction.",
    repository: "https://github.com/adulsaa-q/housemark",
  },
];
