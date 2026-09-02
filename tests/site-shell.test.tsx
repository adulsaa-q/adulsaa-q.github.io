// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";

afterEach(cleanup);

describe("site header", () => {
  it("provides a skip link and direct, meaningful navigation", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Skip to content").getAttribute("href")).toBe(
      "#main-content",
    );
    for (const [name, href] of [
      ["Work", "/work"],
      ["Services", "/services"],
      ["Archive", "/archive"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ] as const) {
      expect(screen.getAllByRole("link", { name })[0]?.getAttribute("href")).toBe(href);
    }
  });

  it("uses the selected Orbit Q mark instead of a boxed text initial", () => {
    render(<SiteHeader />);

    const mark = screen.getByTestId("brand-mark");
    expect(mark.tagName).toBe("svg");
    expect(mark.getAttribute("viewBox")).toBe("0 0 120 120");
  });

  it("contains focus while open and restores it after Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("dialog", { name: "Site navigation" })).toBeTruthy();

    const close = screen.getByRole("button", { name: "Close menu" });
    expect(document.activeElement).toBe(close);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(
      screen.getAllByRole("link", { name: "Contact" }).at(-1),
    );

    await user.tab();
    expect(document.activeElement).toBe(close);

    await user.keyboard("{Escape}");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("provides a persistent, labelled theme control", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Switch to dark theme" });
    await user.click(toggle);

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeTruthy();
  });
});
