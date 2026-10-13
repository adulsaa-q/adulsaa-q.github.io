import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ArchivePage from "@/app/archive/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import { archiveRecords } from "@/content/archive";

describe("archive page", () => {
  it("renders the secondary source records with accurate availability", () => {
    const html = renderToStaticMarkup(<ArchivePage />);

    expect(archiveRecords).toHaveLength(3);
    expect(archiveRecords.map(({ name }) => name)).toEqual([
      "kbank-finance-pipeline",
      "housemark",
      "AIE-Pulse-Meridian",
    ]);
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
  });

  it("keeps the research prototype visibly experimental", () => {
    const html = renderToStaticMarkup(<ArchivePage />);

    expect(html.match(/data-status="EXPERIMENTAL"/g)).toHaveLength(1);
    expect(html).toContain("could not be verified");
    expect(html).toContain("brand guidelines");
  });
});

describe("about page", () => {
  it("introduces Q and links to method and services without inventing credentials", () => {
    const html = renderToStaticMarkup(<AboutPage />);
    expect(html).toContain("Adul Sa-a / Q");
    expect(html).toContain("Bangkok");
    expect(html).toContain("Start with the operational source");
    expect(html).toContain('href="/method"');
    expect(html).toContain('href="/services"');
    expect(html).not.toMatch(/years of experience|worked at|clients include|award/i);
  });
});

describe("contact page", () => {
  it("offers GitHub, LinkedIn and an email route without Fastwork", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain('href="https://github.com/adulsaa-q"');
    expect(html).toContain('href="https://www.linkedin.com/in/adulsaa"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toMatch(/fastwork/i);
  });

  it("provides a working email link before hydration and without JavaScript", () => {
    const html = renderToStaticMarkup(<ContactPage />);
    expect(html).toContain('href="mailto:adulsaa.q@gmail.com"');
    expect(html).not.toContain("[at]");
  });

  it("tells the visitor what to include in a first message", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain("What helps in a first message");
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
