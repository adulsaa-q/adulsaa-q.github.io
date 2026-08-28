import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

describe("global design system", () => {
  it("defines the authoritative semantic color, layout and motion tokens", () => {
    expect(css).toContain("--surface-primary: #fdfdfd");
    expect(css).toContain("--surface-secondary: #f7f7f5");
    expect(css).toContain("--surface-inverse: #111111");
    expect(css).toContain("--text-primary: #0e0e0e");
    expect(css).toContain("--signal-primary: #e7472e");
    expect(css).toContain("--signal-information: #2155d6");
    expect(css).toContain("--content-max: 90rem");
    expect(css).toContain("--motion-ease: cubic-bezier(0.16, 1, 0.3, 1)");
  });

  it("disables non-essential motion when reduced motion is requested", () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toContain("scroll-behavior: auto");
  });

  it("keeps desktop navigation links visually separated", () => {
    expect(css).toMatch(/\.desktop-navigation\s*\{[\s\S]*?display:\s*flex[\s\S]*?gap:\s*1\.25rem/);
  });

  it("does not introduce prohibited gradient or glass styling", () => {
    expect(css).not.toMatch(/gradient\s*\(/i);
    expect(css).not.toMatch(/backdrop-filter/i);
    expect(css).not.toMatch(/filter:\s*blur/i);
  });
});
