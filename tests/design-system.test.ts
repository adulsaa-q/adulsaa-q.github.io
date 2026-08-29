import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

describe("global design system", () => {
  it("defines the authoritative semantic color, layout and motion tokens", () => {
    expect(css).toContain("--surface-primary: #fdfdfd");
    expect(css).toContain("--surface-secondary: #f7f7f5");
    expect(css).toContain("--surface-inverse: #111111");
    expect(css).toContain("--text-primary: #0e0e0e");
    expect(css).toContain("--signal-primary: #c75543");
    expect(css).toContain("--signal-information: #2155d6");
    expect(css).toContain("--content-max: 82rem");
    expect(css).toContain("--motion-ease: cubic-bezier(0.16, 1, 0.3, 1)");
  });

  it("uses the specified bilingual IBM Plex typography rather than a generic system fallback", () => {
    expect(css).toContain('--font-sans: "IBM Plex Sans Thai", "IBM Plex Sans", sans-serif');
    expect(css).toContain('--font-mono: "IBM Plex Mono", monospace');
    expect(css).not.toContain('--font-sans: Arial');
  });

  it("disables non-essential motion when reduced motion is requested", () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toContain("scroll-behavior: auto");
  });

  it("keeps desktop navigation links visually separated", () => {
    expect(css).toMatch(/\.desktop-navigation\s*\{[\s\S]*?display:\s*flex[\s\S]*?gap:\s*1\.25rem/);
  });

  it("keeps the desktop hero breathable rather than viewport-filling", () => {
    expect(css).toContain("min-height: min(34rem, calc(100svh - 10rem))");
    expect(css).toContain("font-size: clamp(3rem, 5.8vw, 6rem)");
    expect(css).toContain("line-height: 1");
  });

  it("does not paint every navigation item with a primary-color underline", () => {
    expect(css).toMatch(/\.desktop-navigation a\s*\{[\s\S]*?border-bottom:\s*1px solid transparent/);
    expect(css).toMatch(/\.desktop-navigation a:hover\s*\{[\s\S]*?border-bottom-color:\s*var\(--text-primary\)/);
  });

  it("keeps the mobile menu trigger large enough for touch", () => {
    expect(css).toMatch(/\.menu-trigger\s*\{[\s\S]*?min-height:\s*2\.75rem/);
  });

  it("uses hairline grid records for capability information rather than an unstructured text wall", () => {
    expect(css).toMatch(/\.capability-register\s*\{[\s\S]*?border-top:\s*1px solid var\(--line-strong\)/);
    expect(css).toMatch(/\.capability-record\s*\{[\s\S]*?display:\s*grid[\s\S]*?border-bottom:\s*1px solid var\(--line-primary\)/);
    expect(css).toMatch(/\.capability-record dl > div\s*\{[\s\S]*?border-top:\s*1px solid var\(--line-primary\)/);
  });

  it("does not introduce prohibited gradient or glass styling", () => {
    expect(css).not.toMatch(/gradient\s*\(/i);
    expect(css).not.toMatch(/backdrop-filter/i);
    expect(css).not.toMatch(/filter:\s*blur/i);
  });

  it("defines every line token it references", () => {
    const referenced = new Set(
      [...css.matchAll(/var\((--line-[a-z]+)\)/g)].map((match) => match[1]),
    );
    for (const token of referenced) {
      expect(css).toContain(`${token}:`);
    }
  });

  it("styles the contact, archive and not-found pages instead of leaving them unstyled", () => {
    expect(css).toMatch(/\.contact-route\s*\{[\s\S]*?border-bottom:\s*1px solid var\(--line-primary\)/);
    expect(css).toMatch(/\.archive-row\s*\{[\s\S]*?border-bottom:\s*1px solid var\(--line-primary\)/);
    expect(css).toMatch(/\.not-found-page\s*\{[\s\S]*?padding-block/);
    expect(css).toMatch(/\.source-link\s*\{[\s\S]*?font-family:\s*var\(--font-mono\)/);
  });
});
