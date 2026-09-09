export type ArchiveStatus = "UTILITY" | "EXPERIMENTAL" | "UNAVAILABLE";

export interface ArchiveRecord {
  name: string;
  status: ArchiveStatus;
  summary: string;
  limitation: string;
  repository: string;
  /** Public availability checked during the September 2026 audit. */
  sourceUnavailable?: boolean;
}

export const archiveRecords: ArchiveRecord[] = [
  {
    name: "fastwork-status",
    status: "EXPERIMENTAL",
    summary: "Public service-status interface prototype.",
    limitation:
      "Service-level status only; does not expose internal worker logs, credentials, or control actions.",
    repository: "https://github.com/adulsaa-q/fastwork-status",
  },
  {
    name: "kbank-finance-pipeline",
    sourceUnavailable: true,
    status: "UNAVAILABLE",
    summary: "Previously listed finance-parser project; its public source is currently unavailable.",
    limitation:
      "Current implementation and maintenance status could not be verified from a public repository.",
    repository: "https://github.com/adulsaa-q/kbank-finance-pipeline",
  },
  {
    name: "housemark",
    status: "UTILITY",
    summary: "Deterministic frontend engineering standard and code craftsmanship rulebook.",
    limitation:
      "Technical floor standard; does not dictate company brand guidelines or visual art direction.",
    repository: "https://github.com/adulsaa-q/housemark",
  },
  {
    name: "AIE-Pulse-Meridian",
    status: "EXPERIMENTAL",
    summary: "Python pipeline combining Trends/RSS collection, signal detection and an HTML intelligence report.",
    limitation: "Experimental monitoring workflow; threshold-based signals and AI commentary are not validated forecasts or investment advice.",
    repository: "https://github.com/adulsaa-q/AIE-Pulse-Meridian",
  },
];
