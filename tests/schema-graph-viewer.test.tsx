// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SchemaGraphViewer } from "@/components/project/schema-graph-viewer";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("SchemaGraphViewer Component", () => {
  it("renders with proper accessibility landmarks and controls", () => {
    render(<SchemaGraphViewer />);

    expect(
      screen.getByRole("region", {
        name: "PostgreSQL schema to Obsidian knowledge graph visualizer",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("group", { name: "Graph display mode" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Relational ERD" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Obsidian Graph View" })).toBeTruthy();
  });

  it("allows switching between Relational ERD and Obsidian Graph View modes", async () => {
    const user = userEvent.setup();
    render(<SchemaGraphViewer />);

    const erdTab = screen.getByRole("button", { name: "Relational ERD" });
    const obsidianTab = screen.getByRole("button", { name: "Obsidian Graph View" });

    expect(erdTab.getAttribute("aria-pressed")).toBe("true");
    expect(obsidianTab.getAttribute("aria-pressed")).toBe("false");

    await user.click(obsidianTab);
    expect(obsidianTab.getAttribute("aria-pressed")).toBe("true");
    expect(erdTab.getAttribute("aria-pressed")).toBe("false");
  });

  it("selects a table and displays foreign keys and column schemas", async () => {
    const user = userEvent.setup();
    render(<SchemaGraphViewer />);

    // Default selected table is orders
    expect(screen.getByText("public.orders")).toBeTruthy();

    // Click on order_items table node
    const orderItemsNode = screen.getByRole("button", { name: /Inspect table order_items/i });
    await user.click(orderItemsNode);

    expect(screen.getByText("public.order_items")).toBeTruthy();
    expect(screen.getByText("Est. 520,000 rows")).toBeTruthy();
    expect(screen.getByText("Relational Foreign Keys")).toBeTruthy();
  });

  it("renders the generated Obsidian note with wikilinks and tags", () => {
    render(<SchemaGraphViewer />);

    expect(screen.getByText("Generated Obsidian Note")).toBeTruthy();
    expect(screen.getByText(/type: database_table/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy markdown" })).toBeTruthy();
  });
  it("does not report copy success when the clipboard rejects the write", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Permission denied"));
    render(<SchemaGraphViewer />);
    await user.click(screen.getByRole("button", { name: "Copy markdown" }));
    expect(await screen.findByText("Copy unavailable. Select the text below to copy it manually.")).toBeTruthy();
    expect(screen.queryByText("Markdown copied.")).toBeNull();
    expect(screen.getByRole("region", { name: "Generated Markdown preview" }).getAttribute("tabindex")).toBe("0");
  });

});
