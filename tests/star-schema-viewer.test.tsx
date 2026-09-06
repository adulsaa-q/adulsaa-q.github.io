// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { StarSchemaViewer } from "@/components/project/star-schema-viewer";

afterEach(cleanup);

describe("StarSchemaViewer Component", () => {
  it("renders interactive star schema for ecommerce-sales-pipeline", async () => {
    const user = userEvent.setup();
    render(<StarSchemaViewer projectSlug="ecommerce-sales-pipeline" />);

    // Region heading
    expect(screen.getByRole("region", { name: "Interactive Star Schema Blueprint" })).toBeTruthy();
    expect(screen.getByText("Multi-Channel Conformed Star Schema")).toBeTruthy();

    // Tables in tablist
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(5);

    // Initial selected table is Fact_Orders
    expect(screen.getByRole("tab", { name: /Fact_Orders/i })).toBeTruthy();
    expect(screen.getByText("Granular normalized order records across Shopee and Lazada exports.")).toBeTruthy();
    expect(screen.getByText("PK: order_id")).toBeTruthy();

    // Click Dim_Date table
    const dimDateBtn = screen.getByRole("tab", { name: /Dim_Date/i });
    await user.click(dimDateBtn);

    // Verify inspector updates to Dim_Date
    expect(screen.getByText("Conformed date dimension enabling equal elapsed-day MoM comparisons.")).toBeTruthy();
    expect(screen.getByText("calendar_date")).toBeTruthy();
    expect(screen.getByText("elapsed_days_window")).toBeTruthy();
  });

  it("renders interactive star schema for shopee-thailand-analytics", async () => {
    render(<StarSchemaViewer projectSlug="shopee-thailand-analytics" />);

    expect(screen.getByText("Marketplace Analytical Star Schema")).toBeTruthy();
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(4);
    expect(screen.getByRole("tab", { name: /Dim_Customer/i })).toBeTruthy();
  });

  it("returns null safely for projects without a defined star schema", () => {
    const { container } = render(<StarSchemaViewer projectSlug="finance-etl-pipeline" />);
    expect(container.firstChild).toBeNull();
  });
});
