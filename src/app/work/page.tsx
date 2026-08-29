import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/content/projects";
import { textLang } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description: "Evidence-led data, BI and automation project records by Q.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
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
              <span lang={textLang(project.displayTitle)}>{project.displayTitle}</span>
            </h2>
            <div className="work-card__info">
              <p className="work-card__summary">{project.summary}</p>
              <div className="work-card__details">
                <span className="scope-label">{project.evidence.some((item) => item.class === "SIMULATED") ? "SIMULATED" : "EVIDENCE LED"}</span>
                <p>{project.services.join(" / ")}</p>
                <p><strong>Impact:</strong> {project.impact}</p>
                <p lang={textLang(project.limitations[0])}>{project.limitations[0]}</p>
              </div>
            </div>
            <div className="work-card__actions">
              <Link
                className="work-card__link"
                href={`/work/${project.slug}`}
                aria-label={`View ${project.name}`}
              >
                <span aria-hidden="true">↗</span>
              </Link>
              <a className="source-link" href={project.repository} target="_blank" rel="noreferrer">
                GitHub source
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
