import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ServicesPage, { metadata } from "@/app/services/page";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

describe("services page", () => {
  it("presents exactly three bounded services, each with a boundary", () => {
    expect(services).toHaveLength(3);
    services.forEach((service) => {
      expect(service.boundary.trim().length).toBeGreaterThan(0);
      expect(service.deliverables.length).toBeGreaterThan(0);
    });
  });

  it("links each service to a demonstrating case study or the archive", () => {
    const html = renderToStaticMarkup(<ServicesPage />);

    services.forEach((service) => {
      if (service.caseStudySlug) {
        expect(projects.some((p) => p.slug === service.caseStudySlug)).toBe(true);
        expect(html).toContain(`/work/${service.caseStudySlug}`);
      }
    });
    expect(html).toContain('href="/contact#work-enquiries"');
  });

  it("does not publish prices or outcome guarantees", () => {
    const html = renderToStaticMarkup(<ServicesPage />).toLowerCase();

    expect(html).not.toMatch(/\bguarantee[ds]?\b/);
    expect(html).not.toMatch(/\b(thb|usd|\$|฿)\s?\d/);
    expect(metadata.title).toBe("Services");
  });
});
