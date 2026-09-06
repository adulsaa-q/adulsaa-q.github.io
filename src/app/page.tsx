import Link from "next/link";

import { ArtifactCarousel } from "@/components/project/artifact-carousel";
import { HeroDataPreview } from "@/components/home/hero-preview";
import { PipelineDiagram } from "@/components/diagram/pipeline-diagram";
import { StatStrip } from "@/components/home/stat-strip";
import { TechMarquee } from "@/components/home/tech-marquee";
import { ProjectIndex } from "@/components/project/project-index";
import { projects } from "@/content/projects";
import { textLang } from "@/lib/i18n";
import type { Project } from "@/types/project";

const featuredProjects = projects.slice(0, 2);

const projectMetrics: Record<string, Array<{ label: string; value: string }>> = {
  "ecommerce-sales-pipeline": [
    { label: "Data Ingestion", value: "Shopee · Lazada · CPAS" },
    { label: "Reconciliation", value: "Equal Elapsed-Day Window" },
    { label: "Architecture", value: "Unified Star Schema" },
  ],
  "shopee-thailand-analytics": [
    { label: "Dataset Scope", value: "Multi-Module Case Study" },
    { label: "SQL Engines", value: "Sales · Cohort · Logistics" },
    { label: "Semantic Model", value: "DAX Measures Register" },
  ],
};

const presentationBySlug: Record<Project["slug"], string> = {
  "ecommerce-sales-pipeline": "dashboard-plate",
  "shopee-thailand-analytics": "schema-led",
  "finance-etl-pipeline": "system-flow",
  timelimit: "offline-instrument",
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.slug === "finance-etl-pipeline") {
    return (
      <div className="project-visual" aria-label="Finance ETL system flow">
        <p className="artifact-label">RECONSTRUCTED FROM IMPLEMENTATION</p>
        <div className="system-flow">
          <div className="system-node">
            <small>01 / input</small>
            <strong>Statement PDF</strong>
          </div>
          <span className="flow-arrow" aria-hidden="true" />
          <div className="system-node">
            <small>02 / control</small>
            <strong>Parse + validate</strong>
          </div>
          <span className="flow-arrow" aria-hidden="true" />
          <div className="system-node">
            <small>03 / record</small>
            <strong>PostgreSQL audit</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ArtifactCarousel
      projectSlug={project.slug}
      projectName={project.name}
      artifacts={project.artifacts}
      eager={project.slug === "ecommerce-sales-pipeline"}
    />
  );
}

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <div className="hero__status-badge">
            <span className="status-indicator" aria-hidden="true" />
            <span>Data, BI &amp; Automation Systems · Bangkok (GMT+7)</span>
          </div>
          <h1 id="home-title">
            I turn messy operational data into systems people can actually use.
          </h1>
          <p className="hero__thai-lead" lang="th">เปลี่ยนข้อมูลกระจัดกระจาย ให้เป็นระบบที่ตรวจสอบและใช้งานได้จริง</p>
          <p className="hero__lead">
            Selected work across reporting models, data pipelines and focused internal
            tools—shown with evidence, boundaries and the decisions behind them.
          </p>
          <div className="hero__actions">
            <Link className="hero-btn-primary" href="/work">
              Explore Selected Systems →
            </Link>
            <Link className="hero-btn-secondary" href="/services">
              How to work with me
            </Link>
          </div>
        </div>

        <HeroDataPreview />
      </section>

      <section className="work-showcase" aria-labelledby="selected-work">
        <div className="section-heading">
          <span className="section-index">01–02</span>
          <h2 id="selected-work">Selected systems</h2>
          <p>Two entry points. Full evidence register on the work index.</p>
        </div>

        <ProjectIndex projects={featuredProjects} />

        {featuredProjects.map((project, index) => (
          <article
            id={`project-${project.slug}`}
            className="project-entry"
            data-project-entry={project.slug}
            data-presentation={presentationBySlug[project.slug]}
            key={project.slug}
          >
            <div className="project-entry__content">
              <p className="project-kicker">
                {String(index + 1).padStart(2, "0")} / {project.kind}
              </p>
              {project.evidence.some((item) => item.class === "SIMULATED") ? (
                <span className="scope-label" data-scope-label="simulated">
                  Simulated / demonstration scope
                </span>
              ) : null}
              <h3>{project.name}</h3>
              <p className="project-entry__title" lang={textLang(project.displayTitle)}>
                {project.displayTitle}
              </p>
              <p className="project-entry__summary">{project.summary}</p>
              {projectMetrics[project.slug] && (
                <div
                  className="project-metrics-strip"
                  role="group"
                  aria-label={`${project.name} architecture highlights`}
                >
                  {projectMetrics[project.slug].map((m) => (
                    <div className="project-metric-pill" key={m.label}>
                      <span className="project-metric-pill__label">{m.label}</span>
                      <span className="project-metric-pill__value">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="project-impact">
                <span>Operational impact</span>
                <p>{project.impact}</p>
              </div>
              <ul className="project-meta" aria-label={`${project.name} technologies`}>
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="project-services" aria-label={`${project.name} services`}>
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <div className="project-entry__links">
                <Link className="text-link" href={`/work/${project.slug}`}>
                  Inspect project
                </Link>
                <a className="text-link text-link--muted" href={project.repository} target="_blank" rel="noreferrer">
                  GitHub source
                </a>
              </div>
            </div>
            <ProjectVisual project={project} />
          </article>
        ))}

        <div className="work-showcase__all">
          <p>More systems, experimental work and their evidence boundaries are kept in the full index.</p>
          <Link className="text-link" href="/work">
            Explore all work
          </Link>
        </div>
      </section>

      <section className="architecture-discipline" aria-labelledby="architecture-heading">
        <div className="section-heading">
          <span className="section-index">SYSTEM</span>
          <h2 id="architecture-heading">System architecture &amp; lifecycle</h2>
          <p>Every implementation follows an inspectable four-stage path from raw inputs to audited handover.</p>
        </div>
        <PipelineDiagram />
        <TechMarquee />
        <StatStrip />
      </section>

      <section className="principles" aria-label="Working principles">
        <article className="principle">
          <span>01 / Trace</span>
          <h2>Start with the source.</h2>
          <p>Each material claim points back to code, tests, documentation or a committed artifact.</p>
        </article>
        <article className="principle">
          <span>02 / Model</span>
          <h2>Make the system legible.</h2>
          <p>Inputs, transformations, decisions and outputs are separated so the work can be inspected.</p>
        </article>
        <article className="principle">
          <span>03 / Bound</span>
          <h2>State what is not proven.</h2>
          <p>Simulation, reconstruction and implementation limits remain visible instead of becoming marketing claims.</p>
        </article>
      </section>
    </main>
  );
}
