import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import FastworkStatusPage, { metadata } from "@/app/fastwork-status/page";

describe("Fastwork status page", () => {
  it("publishes a read-only, unlisted rebuild summary without private machine details", () => {
    const html = renderToStaticMarkup(<FastworkStatusPage />);

    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(html).toContain("Fastwork Rebuild Status");
    expect(html).toContain("9");
    expect(html).toContain("8");
    expect(html).toContain("Excel Sales Dashboard");
    expect(html).toContain("Executive KPI Deck");
    expect(html).toContain("Draft-first");
    expect(html).not.toMatch(/127\.0\.0\.1|100\.69\.|\/Users\/|adulsaa-q|api[_-]?key|token|password/i);
  });
});
