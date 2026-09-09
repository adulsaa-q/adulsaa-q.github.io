import { describe, expect, it } from "vitest";

import { validateProjects } from "@/lib/content-validation";
import type { Project } from "@/types/project";

const baseProject: Project = {
  slug: "sample",
  name: "Sample",
  displayTitle: "Sample project",
  kind: "Case study",
  status: "FEATURED",
  summary: "A bounded project summary.",
  context: "A verifiable context.",
  problem: "A concrete problem.",
  impact: "A measurable operational improvement target.",
  constraints: ["No production claim."],
  input: ["Synthetic CSV export."],
  system: ["Validated transformation."],
  decisions: [{ title: "Keep a source register", why: "Claims remain inspectable." }],
  implementation: ["Typed static content."],
  stack: ["TypeScript"],
  evidence: [
    {
      class: "VERIFIED_CODE",
      label: "Transformation module",
      sourcePath: "src/pipeline/transform.ts",
      sourceUrl: "https://github.com/adulsaa-q/example/blob/main/src/pipeline/transform.ts",
    },
  ],
  limitations: ["Demonstration only."],
  artifacts: [
    {
      type: "SYSTEM_DIAGRAM",
      alt: "A reconstructed data flow diagram.",
      caption: "Reconstructed from implementation.",
      reconstructed: true,
    },
  ],
  services: ["Data pipeline"],
  repository: "https://github.com/adulsaa-q/example",
};

describe("validateProjects", () => {
  it("accepts a complete featured project with source-backed evidence", () => {
    expect(validateProjects([baseProject])).toEqual([]);
  });

  it("rejects a claimed source file linked to a different GitHub file", () => {
    const mismatch: Project = {
      ...baseProject,
      evidence: [{ ...baseProject.evidence[0], sourceUrl: "https://github.com/adulsaa-q/example/blob/main/README.md" }],
    };
    expect(validateProjects([mismatch])).toContain("sample: verified source path must match its linked file or directory");
  });

  it("requires a limitation for a simulated project", () => {
    const simulated: Project = {
      ...baseProject,
      limitations: [],
      evidence: [
        {
          ...baseProject.evidence[0],
          class: "SIMULATED",
        },
      ],
    };

    expect(validateProjects([simulated])).toContain(
      "sample: simulated or experimental work requires a visible limitation",
    );
  });

  it("requires an artifact caption and alt text", () => {
    const missingArtifactText: Project = {
      ...baseProject,
      artifacts: [
        {
          ...baseProject.artifacts[0],
          alt: "",
          caption: "",
        },
      ],
    };

    expect(validateProjects([missingArtifactText])).toContain(
      "sample: artifact 1 requires alt text and a caption",
    );
  });
});
