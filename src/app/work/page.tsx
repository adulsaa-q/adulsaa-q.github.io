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
          An authoritative register of implemented data, BI, and automation systems.
          Each record documents verifiable inputs, dimensional models, committed source code,
          and transparent evidence boundaries.
        </p>
      </header>

      {/* Register Overview Stats Strip */}
      <div className="work-register-stats" aria-label="Register statistics">
        <div className="work-stat">
          <span className="work-stat__label">Total Systems</span>
          <strong className="work-stat__value">{String(projects.length).padStart(2, "0")}</strong>
        </div>
        <div className="work-stat">
          <span className="work-stat__label">Evidence-Led</span>
          <strong className="work-stat__value">
            {String(projects.filter((p) => !p.evidence.some((e) => e.class === "SIMULATED")).length).padStart(2, "0")}
          </strong>
        </div>
        <div className="work-stat">
          <span className="work-stat__label">Simulated Datasets</span>
          <strong className="work-stat__value">
            {String(projects.filter((p) => p.evidence.some((e) => e.class === "SIMULATED")).length).padStart(2, "0")}
          </strong>
        </div>
        <div className="work-stat">
          <span className="work-stat__label">Total Evidence Links</span>
          <strong className="work-stat__value">
            {String(projects.reduce((acc, p) => acc + p.evidence.length, 0)).padStart(2, "0")}
          </strong>
        </div>
      </div>

      <section className="work-list" aria-label="Portfolio projects">
        {projects.map((project, index) => {
          const isSimulated = project.status === "FEATURED" && project.evidence.some((item) => item.class === "SIMULATED");
          const scopeLabel = isSimulated ? "SIMULATED" : "EVIDENCE LED";

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

                {/* Stack badges */}
                <div className="work-card__stack" aria-label={`${project.name} technology stack`}>
                  {project.stack.map((tech) => (
                    <span key={tech} className="work-card__tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="work-card__details">
                  <p className="work-card__services-line">
                    <strong className="work-card__meta-label">Services:</strong> {project.services.join(" / ")}
                  </p>
                  <p className="work-card__impact-line">
                    <strong className="work-card__meta-label">Operational impact:</strong> {project.impact}
                  </p>
                  <p className="work-card__inputs-line">
                    <strong className="work-card__meta-label">Inputs:</strong> {project.input.join(", ")}
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
