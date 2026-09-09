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
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain("I turn messy operational data into systems people can actually use.");
    expect(html.match(/data-project-entry=/g)).toHaveLength(2);
    expect(html).toContain('data-presentation="dashboard-plate"');
    expect(html).toContain('data-presentation="schema-led"');
    expect(html).not.toContain('data-presentation="system-flow"');
    expect(html).not.toContain('data-presentation="offline-instrument"');
    expect(html).toContain('href="/work"');
    expect(html).toContain("Explore all work");
    expect(html).toContain("GitHub source");
    expect(html).toContain(projects[0].repository);
    expect(html).toContain(projects[1].repository);
    expect(html).toContain("Power BI reporting");
    expect(html).toContain("What the system enables");
    expect(html).toContain(projects[0].impact);

    projects.slice(0, 2).forEach((project) => expect(html).toContain(project.name));
  });

  it("makes identity, work and contact available in server-rendered HTML", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain("Adul Sa-a / Q");
    expect(html).toContain('href="#selected-work"');
    expect(html).toContain('id="selected-work"');
    expect(html).toContain('href="mailto:adulsaa.q@gmail.com"');
    expect(html).toContain('href="/services"');
    expect(html).not.toContain("15 / 15 PASS");
    expect(html).not.toContain("19 / 19 COMPILED");
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
      expect(html).toContain(project.repository);
      expect(html).toContain(project.services[0]);
      expect(html).toContain(project.status === "FEATURED" && project.evidence.some((item) => item.class === "SIMULATED") ? "SIMULATED" : "EVIDENCE LED");
    });
  });

  it("statically enumerates every content project slug", async () => {
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
    expect(html).toContain("Operational impact");
    expect(html).toContain(project.impact);
    expect(html).toContain(project.repository);
    expect(metadata.title).toBe(`${project.name} — Work`);
  });

  it("ends every case study with a forward path, not a dead end", async () => {
    const project = projects[0];
    const page = await ProjectPage({ params: Promise.resolve({ slug: project.slug }) });
    const html = renderToStaticMarkup(page);

    expect(html).toContain('href="/contact#work-enquiries"');
    expect(html).toContain('aria-label="More projects"');
    const siblingLinks = projects.filter((item) => item.slug !== project.slug);
    expect(
      siblingLinks.some((item) => html.includes(`/work/${item.slug}`)),
    ).toBe(true);
    expect(html).toContain('application/ld+json');
  });
});
