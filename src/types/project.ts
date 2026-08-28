export const evidenceClasses = [
  "VERIFIED_CODE",
  "VERIFIED_TEST",
  "VERIFIED_ARTIFACT",
  "README_REPORTED",
  "SIMULATED",
  "EXPERIMENTAL",
  "PLANNED",
  "UNKNOWN",
] as const;

export type EvidenceClass = (typeof evidenceClasses)[number];

export type ProjectStatus = "FEATURED" | "ARCHIVE" | "EXPERIMENTAL";

export interface EvidenceItem {
  class: EvidenceClass;
  label: string;
  sourcePath: string;
  sourceUrl: string;
  note?: string;
}

export type ArtifactType =
  | "SCREENSHOT"
  | "SYSTEM_DIAGRAM"
  | "SCHEMA"
  | "TEST_EVIDENCE"
  | "SOURCE_REGISTER";

export interface Artifact {
  type: ArtifactType;
  src?: string;
  alt: string;
  caption: string;
  reconstructed: boolean;
}

export interface ProjectDecision {
  title: string;
  why: string;
}

export interface Project {
  slug: string;
  name: string;
  displayTitle: string;
  year?: string;
  status: ProjectStatus;
  summary: string;
  context: string;
  problem: string;
  constraints: string[];
  input: string[];
  system: string[];
  decisions: ProjectDecision[];
  implementation: string[];
  stack: string[];
  evidence: EvidenceItem[];
  limitations: string[];
  artifacts: Artifact[];
  services: string[];
  repository: string;
}
