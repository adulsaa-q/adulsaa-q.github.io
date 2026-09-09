import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LabPage from "@/app/lab/page";
import MethodPage from "@/app/method/page";
import { archiveRecords } from "@/content/archive";

describe("method page", () => {
  it("renders philosophy and lifecycle, with a separate service discovery path", () => {
    const html = renderToStaticMarkup(<MethodPage />);

    expect(html).toContain('id="main-content"');
    expect(html).toContain("Start with the operational source.");
    expect(html).toContain("01 / TRACE");
    expect(html).toContain("02 / MODEL");
    expect(html).toContain("03 / BOUND");

    expect(html).toContain('href="/services"');

    // 4 Delivery Lifecycle stages
    expect(html).toContain("DISCOVER");
    expect(html).toContain("DEFINE");
    expect(html).toContain("BUILD");
    expect(html).toContain("VERIFY &amp; HANDOVER");

    // Forward path
    expect(html).toContain('href="/contact#work-enquiries"');
    expect(html).toContain('href="/work"');
  });
});

describe("lab page", () => {
  it("renders all experimental systems with boundaries and repository links", () => {
    const html = renderToStaticMarkup(<LabPage />);

    expect(html).toContain('id="main-content"');
    expect(html).toContain("Systems Laboratory / Experimental Work");

    archiveRecords.forEach((record) => {
      expect(html).toContain(record.name);
      expect(html).toContain(record.summary);
      expect(html).toContain(record.limitation);
      if (record.sourceUnavailable) {
        expect(html).not.toContain(`href="${record.repository}"`);
        expect(html).toContain("Public source unavailable");
      } else {
        expect(html).toContain(record.repository);
      }
    });

    // Recovery / forward links
    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/method"');
  });
});
