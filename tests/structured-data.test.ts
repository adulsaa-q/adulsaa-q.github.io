import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import {
  breadcrumbSchema,
  creativeWorkSchema,
  personSchema,
  websiteSchema,
} from "@/lib/structured-data";

const forbiddenKeys = ["aggregateRating", "review", "offers", "priceRange"];

function assertNoFabricatedTrustSignals(schema: Record<string, unknown>) {
  const serialized = JSON.stringify(schema).toLowerCase();
  for (const key of forbiddenKeys) {
    expect(serialized).not.toContain(`"${key.toLowerCase()}"`);
  }
}

describe("structured data", () => {
  it("describes Q as a Person with a verifiable identity graph", () => {
    const schema = personSchema();

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Q");
    expect(schema.sameAs).toContain("https://github.com/adulsaa-q");
    assertNoFabricatedTrustSignals(schema);
  });

  it("declares a bilingual WebSite", () => {
    const schema = websiteSchema();

    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toBe("https://adulsaa-q.pages.dev/");
    expect(schema.inLanguage).toEqual(["th-TH", "en"]);
  });

  it("maps every project to a CreativeWork pointing at its public repository", () => {
    projects.forEach((project) => {
      const schema = creativeWorkSchema(project);

      expect(schema["@type"]).toBe("CreativeWork");
      expect(schema.name).toBe(project.name);
      expect(schema.description).toBe(project.summary);
      expect(schema.codeRepository).toBe(project.repository);
      expect(schema.url).toBe(`https://adulsaa-q.pages.dev/work/${project.slug}/`);
      assertNoFabricatedTrustSignals(schema);
    });
  });

  it("builds an ordered breadcrumb trail", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: "TIMELIMIT", path: "/work/timelimit" },
    ]);

    expect(schema["@type"]).toBe("BreadcrumbList");
    const items = schema.itemListElement as { position: number; name: string }[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items[2].name).toBe("TIMELIMIT");
  });
});
