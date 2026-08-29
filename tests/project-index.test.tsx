// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProjectIndex } from "@/components/project/project-index";
import { projects } from "@/content/projects";

afterEach(cleanup);

describe("project index", () => {
  it("uses instant navigation when reduced motion is requested", async () => {
    const scrollIntoView = vi.fn();
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: matchMedia });

    render(
      <>
        <ProjectIndex projects={projects.slice(0, 2)} />
        <article id={`project-${projects[1].slug}`} />
      </>,
    );

    Element.prototype.scrollIntoView = scrollIntoView;
    await userEvent.setup().click(screen.getByRole("button", { name: /shopee thailand analytics/i }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "center" });
  });
});
