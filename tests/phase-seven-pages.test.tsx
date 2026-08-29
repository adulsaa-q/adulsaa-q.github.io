import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ArchivePage from "@/app/archive/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import { archiveRecords } from "@/content/archive";

describe("archive page", () => {
  it("renders exactly the four archive-only records verified in Phase 0", () => {
    const html = renderToStaticMarkup(<ArchivePage />);

    expect(archiveRecords).toHaveLength(4);
    expect(archiveRecords.map(({ name }) => name)).toEqual([
      "schema-map",
      "AI Command Center",
      "AIE Pulse Meridian",
      "AI Brand Visibility Tracker",
    ]);
    archiveRecords.forEach((record) => {
      expect(html).toContain(record.name);
      expect(html).toContain(record.summary);
      expect(html).toContain(record.limitation);
      expect(html).toContain(record.repository);
    });
  });

  it("keeps both research prototypes visibly experimental", () => {
    const html = renderToStaticMarkup(<ArchivePage />);

    expect(html.match(/data-status="EXPERIMENTAL"/g)).toHaveLength(2);
    expect(html).toContain("not investment advice");
    expect(html).toContain("not semantic ranking");
  });
});

describe("about page", () => {
  it("states working philosophy and narrow capability boundaries without biography", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html).toContain("Start with the operational source");
    expect(html).toContain("Dashboard &amp; Decision Reporting");
    expect(html).toContain("Data Pipeline &amp; Operational Automation");
    expect(html).toContain("AI Research &amp; Workflow Systems");
    expect(html).toContain("Not included");
    expect(html).toContain("DISCOVER");
    expect(html).toContain("DEFINE");
    expect(html).toContain("BUILD");
    expect(html).toContain("VERIFY &amp; HANDOVER");
    expect(html).not.toMatch(/years of experience|worked at|clients include|award/i);
  });
});

describe("contact page", () => {
  it("offers GitHub and a clearly nonfunctional Fastwork placeholder", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain('href="https://github.com/adulsaa-q"');
    expect(html).toContain('rel="noreferrer"');
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain("Link pending approval");
    expect(html).not.toMatch(/href="[^"]*fastwork/i);
    expect(html).not.toContain("mailto:");
  });
});

describe("not found page", () => {
  it("explains the missing record and provides useful recovery routes", () => {
    const html = renderToStaticMarkup(<NotFound />);

    expect(html).toContain("404");
    expect(html).toContain("This record is not in the archive");
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/work"');
  });
});
