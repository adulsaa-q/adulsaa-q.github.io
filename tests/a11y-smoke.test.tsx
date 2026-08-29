import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ArchivePage from "@/app/archive/page";
import ContactPage from "@/app/contact/page";
import Home from "@/app/page";
import NotFound from "@/app/not-found";
import ServicesPage from "@/app/services/page";
import WorkPage from "@/app/work/page";
import ProjectPage from "@/app/work/[slug]/page";
import { projects } from "@/content/projects";

async function markup(node: ReactElement | Promise<ReactElement>) {
  return renderToStaticMarkup(await node);
}

const staticPages: [string, ReactElement][] = [
  ["home", <Home key="h" />],
  ["work", <WorkPage key="w" />],
  ["services", <ServicesPage key="s" />],
  ["archive", <ArchivePage key="a" />],
  ["about", <AboutPage key="ab" />],
  ["contact", <ContactPage key="c" />],
  ["not-found", <NotFound key="nf" />],
];

describe("accessibility smoke", () => {
  it.each(staticPages)("%s has one h1 and a labelled main landmark", (_name, node) => {
    const html = renderToStaticMarkup(node);

    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
    expect(html).toContain('id="main-content"');
  });

  it.each(staticPages)("%s has no empty links or buttons", (_name, node) => {
    const html = renderToStaticMarkup(node);

    // <a ...></a> or <button ...></button> with only whitespace inside
    expect(html).not.toMatch(/<a\b[^>]*>\s*<\/a>/);
    expect(html).not.toMatch(/<button\b[^>]*>\s*<\/button>/);
  });

  it("every project page has one h1 and keeps heading landmarks", async () => {
    for (const project of projects) {
      const html = await markup(
        ProjectPage({ params: Promise.resolve({ slug: project.slug }) }),
      );
      expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
      expect(html).toContain('aria-label="More projects"');
      expect(html).not.toMatch(/<a\b[^>]*>\s*<\/a>/);
    }
  });
});
