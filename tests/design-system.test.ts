import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

describe("global design system", () => {
  it("defines the authoritative semantic color, layout and motion tokens", () => {
    expect(css).toContain("--surface-primary: oklch(");
    expect(css).toContain("--surface-secondary: oklch(");
    expect(css).toContain("--surface-inverse: oklch(");
    expect(css).toContain("--text-primary: oklch(");
    expect(css).toContain("--signal-primary: oklch(");
    expect(css).toContain("--signal-information: oklch(");
    expect(css).toContain(':root[data-theme="dark"]');
    expect(css).toContain("@media (prefers-color-scheme: dark)");
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
    // A bounded min-height, not a full-viewport hero.
    const heroMin = css.match(/\.hero\s*\{[\s\S]*?min-height:\s*min\((\d+)rem,/);
    expect(heroMin).not.toBeNull();
    expect(Number(heroMin![1])).toBeLessThanOrEqual(34);
    // Display headings are clamped to a calm ceiling, not a viewport-scaled shout.
    const heroClamp = css.match(/\.hero h1,[\s\S]*?font-size:\s*clamp\(([^)]+)\)/);
    expect(heroClamp).not.toBeNull();
    const max = heroClamp![1].split(",").at(-1)!.trim();
    expect(parseFloat(max)).toBeLessThanOrEqual(5);
    expect(max.endsWith("rem")).toBe(true);
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

  it("keeps gradient, glass and glow effects deliberate: token-driven and non-decorative-only", () => {
    // The 2026-09 direction allows gradient/blur/glass, scoped to a few named
    // moments (hero glow, nav glass, project-visual spotlight) — not scattered
    // everywhere, and always mixed from the brand's own signal tokens rather
    // than an arbitrary hex/rgb value. See docs/BRAND.md "Bold surfaces".
    // Non-greedy up to the declaration's closing `;`, not the gradient's own
    // first `)` — a radial-gradient's `at var(--spot-x, 50%)` argument closes
    // its own paren well before the token reference the gradient ends on.
    const gradientCalls = [...css.matchAll(/gradient\([\s\S]*?;/gi)];
    expect(gradientCalls.length).toBeGreaterThan(0);
    for (const [call] of gradientCalls) {
      expect(call).toMatch(/var\(--(signal|surface|text|line)-/);
    }
    expect(css).toMatch(/backdrop-filter:\s*blur\(/);
  });

  it("keeps authored colors on the oklch token system — no raw hex or rgb/hsl literals", () => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/(?:rgb|hsl)a?\s*\(/i);
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
