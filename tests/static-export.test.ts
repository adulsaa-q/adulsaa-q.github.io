import { describe, expect, it } from "vitest";

import nextConfig from "../next.config";
import { dynamic as robotsDynamic } from "@/app/robots";
import { dynamic as sitemapDynamic } from "@/app/sitemap";
import { normalizeBasePath, withBasePath } from "@/lib/base-path";

describe("static export configuration", () => {
  it("emits trailing-slash pages with unoptimized local images", () => {
    expect(nextConfig).toMatchObject({
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    });
  });

  it("emits static metadata routes for GitHub Pages", () => {
    expect(sitemapDynamic).toBe("force-static");
    expect(robotsDynamic).toBe("force-static");
  });

  it("normalizes an optional project-page base path", () => {
    expect(normalizeBasePath(undefined)).toBe("");
    expect(normalizeBasePath("")).toBe("");
    expect(normalizeBasePath("portfolio/")).toBe("/portfolio");
    expect(normalizeBasePath("/portfolio/")).toBe("/portfolio");
  });

  it("prefixes public assets without changing external URLs", () => {
    expect(withBasePath("/images/work.png", "/portfolio/")).toBe(
      "/portfolio/images/work.png",
    );
    expect(withBasePath("https://example.com/source", "/portfolio")).toBe(
      "https://example.com/source",
    );
  });
});
