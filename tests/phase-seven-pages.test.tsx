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

    expect(archiveRecords).toHaveLength(4);
    expect(archiveRecords.map(({ name }) => name)).toEqual([
      "fastwork-status",
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

  it("keeps both research prototypes visibly experimental", () => {
    const html = renderToStaticMarkup(<ArchivePage />);

    expect(html.match(/data-status="EXPERIMENTAL"/g)).toHaveLength(2);
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
  it("offers GitHub, an email route and the approved Fastwork profile", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain('href="https://github.com/adulsaa-q"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toMatch(/href="https:\/\/fastwork\.co\/user\/adulsaa\.q"/);
    expect(html).not.toContain("Link pending approval");
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
