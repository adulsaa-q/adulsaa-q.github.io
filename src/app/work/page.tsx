import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/content/projects";
import { textLang } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description: "Reporting, data pipelines, internal tools and AI workflows by Q, with source code and implementation decisions.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Selected projects / Public source</p>
          <h1>Work</h1>
        </div>
        <p className="page-intro__note">
          Reporting, data pipelines, internal tools and AI workflows. Explore what
          I built, the decisions behind it, and the public source on GitHub.
        </p>
      </header>

      <section className="work-list" aria-label="Portfolio projects">
        {projects.map((project, index) => {
          const isSimulated = project.evidence.some((item) => item.class === "SIMULATED");
          const scopeLabel = isSimulated ? "DEMONSTRATION DATA" : project.status === "EXPERIMENTAL" ? "EXPERIMENTAL" : "PUBLIC IMPLEMENTATION";

          return (
            <article className="work-card" key={project.slug} data-kind={project.kind.toLowerCase().replace(/\s+/g, "-")}>
              <div className="work-card__number-col">
                <span className="work-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="work-card__kind">{project.kind}</span>
              </div>

              <div className="work-card__main">
                <div className="work-card__header">
                  <h2>
                    <Link href={`/work/${project.slug}`} className="work-card__title-link">
                      {project.name}
                    </Link>
                    <span lang={textLang(project.displayTitle)}>{project.displayTitle}</span>
                  </h2>
                  <span className={`scope-label scope-label--${isSimulated ? "simulated" : "verified"}`}>
                    {scopeLabel}
                  </span>
                </div>

                <p className="work-card__summary">{project.summary}</p>

                <p className="work-card__stack" aria-label={`${project.name} technology stack`}>
                  {project.stack.join(" · ")}
                </p>

                <div className="work-card__details">
                  <p className="work-card__impact-line">
                    <strong className="work-card__meta-label">What it enables:</strong> {project.impact}
                  </p>
                  <p className="work-card__limitations-line" lang={textLang(project.limitations[0])}>
                    <strong className="work-card__meta-label">Boundaries:</strong> {project.limitations[0]}
                  </p>
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
                <a
                  className="source-link"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub source
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
