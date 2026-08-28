import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import { validateProjects } from "@/lib/content-validation";

describe("portfolio content", () => {
  it("contains the four evidence-backed featured projects", () => {
    expect(projects.filter((project) => project.status === "FEATURED")).toHaveLength(4);
    expect(projects.map((project) => project.slug)).toEqual(
      expect.arrayContaining([
        "ecommerce-sales-pipeline",
        "shopee-thailand-analytics",
        "finance-etl-pipeline",
        "timelimit",
      ]),
    );
  });

  it("passes the evidence integrity validator", () => {
    expect(validateProjects(projects)).toEqual([]);
  });
});
