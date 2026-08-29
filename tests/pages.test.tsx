import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import WorkPage from "@/app/work/page";
import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/work/[slug]/page";
import { projects } from "@/content/projects";

describe("homepage", () => {
  it("curates two featured entries while pointing to the complete work index", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('id="main-content"');
    expect(html).toContain("I turn messy operational data into systems people can actually use.");
    expect(html.match(/data-project-entry=/g)).toHaveLength(2);
    expect(html).toContain('data-presentation="dashboard-plate"');
    expect(html).toContain('data-presentation="schema-led"');
    expect(html).not.toContain('data-presentation="system-flow"');
    expect(html).not.toContain('data-presentation="offline-instrument"');
    expect(html).toContain('href="/work"');
    expect(html).toContain("Explore all work");

    projects.slice(0, 2).forEach((project) => expect(html).toContain(project.name));
  });

  it("offers a keyboard-accessible project index for intentional navigation", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('aria-label="Selected project navigator"');
    expect(html).toContain("Browse systems");
    projects.slice(0, 2).forEach((project, index) => {
      expect(html).toContain(`id="project-${project.slug}"`);
      expect(html).toContain(`aria-controls="project-${project.slug}"`);
      expect(html).toContain(String(index + 1).padStart(2, "0"));
    });
  });

  it("keeps local artifacts and explicit simulated labels on the featured work", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("/images/ecommerce/data-model-overview-1.png");
    expect(html).toContain("/images/shopee/page1_sales.png");
    expect(html).not.toContain("/images/timelimit/timelimit-widget.png");
    expect(html.match(/data-scope-label="simulated"/g)).toHaveLength(2);
    expect(html).not.toContain("RECONSTRUCTED FROM IMPLEMENTATION");
    expect(html).not.toContain("300,000");
  });
});

describe("work routes", () => {
  it("renders a work index with a detail link for every content record", () => {
    const html = renderToStaticMarkup(<WorkPage />);

    projects.forEach((project) => {
      expect(html).toContain(project.name);
      expect(html).toContain(`/work/${project.slug}`);
    });
  });

  it("statically enumerates exactly the four existing project slugs", async () => {
    await expect(generateStaticParams()).resolves.toEqual(
      projects.map(({ slug }) => ({ slug })),
    );
  });

  it("renders a detailed evidence and limitations narrative", async () => {
    const project = projects[0];
    const page = await ProjectPage({ params: Promise.resolve({ slug: project.slug }) });
    const html = renderToStaticMarkup(page);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: project.slug }),
    });

    expect(html).toContain(project.name);
    expect(html).toContain("Evidence");
    expect(html).toContain("Limitations");
    expect(html).toContain(project.repository);
    expect(metadata.title).toBe(`${project.name} — Work`);
  });
});
