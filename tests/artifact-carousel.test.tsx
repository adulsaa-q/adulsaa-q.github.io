// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ArtifactCarousel } from "@/components/project/artifact-carousel";
import type { Artifact } from "@/types/project";

const mockArtifacts: Artifact[] = [
  {
    type: "SCREENSHOT",
    src: "/mock/plate-1.png",
    alt: "Overview KPI dashboard plate",
    caption: "Executive summary showing gross margins and GMV.",
    reconstructed: false,
  },
  {
    type: "SCREENSHOT",
    src: "/mock/plate-2.png",
    alt: "Daily sales mix plate",
    caption: "Category mix breakdown by promotional campaign.",
    reconstructed: false,
  },
  {
    type: "SCREENSHOT",
    src: "/mock/plate-3.png",
    alt: "Hourly traffic heatmap plate",
    caption: "Hourly conversion distribution across flash-sale windows.",
    reconstructed: false,
  },
];

beforeEach(() => {
  // Mock HTMLDialogElement methods in JSDOM
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.open = true;
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.open = false;
    this.removeAttribute("open");
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ArtifactCarousel Accessibility & Responsive UX", () => {
  it("renders correct ARIA attributes for tabs, tablist and tabpanel", () => {
    render(
      <ArtifactCarousel
        projectSlug="ecommerce-sales-pipeline"
        projectName="E-Commerce Pipeline"
        artifacts={mockArtifacts}
      />,
    );

    // 1. Tablist ARIA
    const tablist = screen.getByRole("tablist", {
      name: "E-Commerce Pipeline analytical plates",
    });
    expect(tablist).toBeTruthy();
    expect(tablist.getAttribute("aria-orientation")).toBe("horizontal");

    // 2. Tabs ARIA
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);

    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[0].getAttribute("tabindex")).toBe("0");
    expect(tabs[0].getAttribute("aria-controls")).toBe("panel-ecommerce-sales-pipeline");

    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
    expect(tabs[1].getAttribute("tabindex")).toBe("-1");
    expect(tabs[1].getAttribute("aria-controls")).toBe("panel-ecommerce-sales-pipeline");

    expect(tabs[2].getAttribute("aria-selected")).toBe("false");
    expect(tabs[2].getAttribute("tabindex")).toBe("-1");
    expect(tabs[2].getAttribute("aria-controls")).toBe("panel-ecommerce-sales-pipeline");

    // 3. Tabpanel ARIA & IDREF integrity
    const panel = screen.getByRole("tabpanel");
    expect(panel.id).toBe("panel-ecommerce-sales-pipeline");
    expect(panel.getAttribute("aria-labelledby")).toBe(tabs[0].id);
    expect(panel.getAttribute("tabindex")).toBe("0");

    // 4. Slide Counter ARIA
    const counterGroup = screen.getByRole("group", { name: "Slide navigation" });
    expect(counterGroup).toBeTruthy();

    const statusEl = screen.getByRole("status");
    expect(statusEl.getAttribute("aria-live")).toBe("polite");
    expect(statusEl.textContent).toContain("Slide 1 of 3");
  });

  it("handles ArrowRight, ArrowLeft, Home, and End keyboard navigation with roving focus", async () => {
    const user = userEvent.setup();
    render(
      <ArtifactCarousel
        projectSlug="ecommerce-sales-pipeline"
        projectName="E-Commerce Pipeline"
        artifacts={mockArtifacts}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);

    // ArrowRight: advances to plate 2 and focuses tab 1
    await user.keyboard("{ArrowRight}");
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[1]);

    // ArrowRight: advances to plate 3 and focuses tab 2
    await user.keyboard("{ArrowRight}");
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[2]);

    // ArrowRight at end: wraps back to plate 1
    await user.keyboard("{ArrowRight}");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[0]);

    // ArrowLeft: wraps backwards to plate 3 and focuses tab 2
    await user.keyboard("{ArrowLeft}");
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[2]);

    // Home: moves directly to plate 1 and focuses tab 0
    await user.keyboard("{Home}");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[0]);

    // End: moves directly to plate 3 and focuses tab 2
    await user.keyboard("{End}");
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[2]);
  });

  it("handles modal dialog inspection opening, ARIA labelling, Escape, and focus restoration", async () => {
    const user = userEvent.setup();
    render(
      <ArtifactCarousel
        projectSlug="ecommerce-sales-pipeline"
        projectName="E-Commerce Pipeline"
        artifacts={mockArtifacts}
      />,
    );

    const zoomBtn = screen.getByRole("button", { name: /Enlarge plate/i });
    zoomBtn.focus();
    await user.click(zoomBtn);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    const dialog = document.querySelector("dialog.image-dialog") as HTMLDialogElement;
    expect(dialog).toBeTruthy();
    expect(dialog.getAttribute("aria-labelledby")).toBe("dialog-title-ecommerce-sales-pipeline");

    const dialogTitle = document.getElementById("dialog-title-ecommerce-sales-pipeline");
    expect(dialogTitle?.textContent).toContain("E-Commerce Pipeline");

    // Close button
    const closeBtn = screen.getByRole("button", { name: "Close enlarged image" });
    expect(closeBtn).toBeTruthy();

    // Trigger Escape inside the dialog
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
});
