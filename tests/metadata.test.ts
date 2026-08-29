import { describe, expect, it } from "vitest";

import { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { projects } from "@/content/projects";
import { canonicalUrl } from "@/lib/site-url";

describe("root metadata", () => {
  it("describes the bilingual data, BI and automation portfolio", () => {
    expect(metadata).toMatchObject({
      title: {
        default: "Q — Data, BI & Automation Systems",
        template: "%s — Q",
      },
    });
    expect(metadata.description).toContain("operational data");
    expect(metadata.description).toContain("ข้อมูล");
  });

  it("defines a canonical root and a local neutral social image", () => {
    expect(metadata.alternates).toMatchObject({
      canonical: "https://adulsaa-q.github.io/",
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://adulsaa-q.github.io/",
      images: [
        expect.objectContaining({
          url: "https://adulsaa-q.github.io/og/q-portfolio.png",
          width: 1200,
          height: 630,
        }),
      ],
    });
  });
});

describe("canonical URL strategy", () => {
  it("supports root and optional project-page static exports", () => {
    expect(canonicalUrl("/about", { siteUrl: "https://example.com" })).toBe(
      "https://example.com/about/",
    );
    expect(
      canonicalUrl("/about", {
        siteUrl: "https://example.com",
        basePath: "/q-portfolio/",
      }),
    ).toBe("https://example.com/q-portfolio/about/");
  });

  it("lists all stable and project routes in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);

    for (const route of ["/", "/work", "/services", "/archive", "/about", "/contact"]) {
      expect(urls).toContain(canonicalUrl(route));
    }
    projects.forEach(({ slug }) => {
      expect(urls).toContain(canonicalUrl(`/work/${slug}`));
    });
  });

  it("allows crawling and points robots to the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: canonicalUrl("/sitemap.xml"),
    });
  });
});
