import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description: "Evidence-led data, BI and automation project records by Q.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Project register / 2026</p>
          <h1>Work</h1>
        </div>
        <p className="page-intro__note">
          A compact index of implemented systems, their evidence base and the limits of
          what each public repository can prove.
        </p>
      </header>

      <section className="work-list" aria-label="Portfolio projects">
        {projects.map((project, index) => (
          <article className="work-card" key={project.slug}>
            <span className="work-card__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>
              {project.name}
              <span>{project.displayTitle}</span>
            </h2>
            <p className="work-card__summary">{project.summary}</p>
            <Link
              className="work-card__link"
              href={`/work/${project.slug}`}
              aria-label={`View ${project.name}`}
            >
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
