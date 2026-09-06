import Link from "next/link";

import { ArtifactCarousel } from "@/components/project/artifact-carousel";
import { HeroProofToken } from "@/components/home/hero-proof-token";
import { HeroDataPreview } from "@/components/home/hero-preview";
import { PipelineDiagram } from "@/components/diagram/pipeline-diagram";
import { StatStrip } from "@/components/home/stat-strip";
import { TechMarquee } from "@/components/home/tech-marquee";
import { ProjectIndex } from "@/components/project/project-index";
import { LabRegister } from "@/components/home/lab-register";
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
      {/* SECTION 01 — HERO (DENSITY: QUIET) */}
      <section className="hero hero--v2" aria-labelledby="home-title">
        <div className="hero__copy">
          <div className="hero__status-badge">
            <span className="status-indicator" aria-hidden="true" />
            <span>Q // Data, BI &amp; Automation Systems</span>
          </div>
          <h1 id="home-title">
            I turn messy operational data into systems people can actually use.
          </h1>
          <p className="hero__thai-lead" lang="th">
            เปลี่ยนข้อมูลที่กระจัดกระจาย ให้กลายเป็นระบบที่เข้าใจ ตรวจสอบ และนำไปใช้ตัดสินใจได้จริง
          </p>
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

        <HeroProofToken />
      </section>

      {/* SECTION 02 — OBSERVE THE SYSTEM (DENSITY: RICH — SIGNATURE EXPERIENCE) */}
      <section className="observe-section" aria-labelledby="observe-heading">
        <div className="section-heading">
          <span className="section-index">01</span>
          <h2 id="observe-heading">Observe the system</h2>
          <p>From fragmented input to an inspectable decision model.</p>
        </div>
        <div id="observe-system" tabIndex={-1}>
          <HeroDataPreview />
        </div>
      </section>

      {/* SECTION 03 — SELECTED SYSTEMS (DENSITY: MEDIUM → RICH) */}
      <section className="work-showcase" aria-labelledby="selected-work">
        <div className="section-heading">
          <span className="section-index">02</span>
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

      {/* SECTION 04 — PRINCIPLE (DENSITY: QUIET — VISUAL RESET) */}
      <section className="principles-section" aria-labelledby="principles-heading">
        <div className="section-heading">
          <span className="section-index">03</span>
          <h2 id="principles-heading">Working principles</h2>
          <p className="principle-lead">
            A dashboard is not the product. The product is the chain of decisions that makes the number trustworthy.
          </p>
        </div>

        <div className="principles-grid" role="region" aria-label="Working principles breakdown">
          <article className="principle-card">
            <span className="principle-card__num">01 / Trace</span>
            <h3>Start with the source.</h3>
            <p>Each material claim points back to code, tests, documentation or a committed artifact.</p>
          </article>
          <article className="principle-card">
            <span className="principle-card__num">02 / Model</span>
            <h3>Make the system legible.</h3>
            <p>Inputs, transformations, decisions and outputs are separated so the work can be inspected.</p>
          </article>
          <article className="principle-card">
            <span className="principle-card__num">03 / Bound</span>
            <h3>State what is not proven.</h3>
            <p>Simulation, reconstruction and implementation limits remain visible instead of becoming marketing claims.</p>
          </article>
        </div>
      </section>

      {/* SECTION 05 — SYSTEM LIFECYCLE (DENSITY: RICH) */}
      <section className="architecture-discipline" aria-labelledby="architecture-heading">
        <div className="section-heading">
          <span className="section-index">04</span>
          <h2 id="architecture-heading">System architecture &amp; lifecycle</h2>
          <p>Every implementation follows an inspectable four-stage path from raw inputs to audited handover.</p>
        </div>
        <PipelineDiagram />
        <TechMarquee />
      </section>

      {/* SECTION 06 — VERIFIED PRACTICE (DENSITY: MEDIUM) */}
      <section className="verified-practice-section" aria-labelledby="practice-heading">
        <div className="section-heading">
          <span className="section-index">05</span>
          <h2 id="practice-heading">Verified practice</h2>
          <p>Honest at-a-glance ledger counted from the repository and build, not marketing claims.</p>
        </div>
        <StatStrip />
        <div className="telemetry-datasheet" role="region" aria-label="System build datasheet">
          <div className="datasheet-item">
            <span className="datasheet-label">TEST SUITES</span>
            <strong className="datasheet-value">15 / 15 PASS</strong>
            <small className="datasheet-note">83 automated Vitest specifications</small>
          </div>
          <div className="datasheet-item">
            <span className="datasheet-label">TYPESCRIPT</span>
            <strong className="datasheet-value">0 ERRORS</strong>
            <small className="datasheet-note">Strict type safety &amp; contracts</small>
          </div>
          <div className="datasheet-item">
            <span className="datasheet-label">STATIC ROUTES</span>
            <strong className="datasheet-value">18 / 18 COMPILED</strong>
            <small className="datasheet-note">Zero server runtime attack surface</small>
          </div>
          <div className="datasheet-item">
            <span className="datasheet-label">INTEGRITY CHECK</span>
            <strong className="datasheet-value">0 BROKEN LINKS</strong>
            <small className="datasheet-note">Automated crawler verified</small>
          </div>
        </div>
      </section>

      {/* SECTION 07 — FROM THE LAB (DENSITY: MEDIUM) */}
      <section className="home-lab-section" aria-labelledby="lab-heading">
        <div className="section-heading">
          <span className="section-index">06</span>
          <h2 id="lab-heading">From the lab</h2>
          <p>Active prototypes, schema exploration utilities, and internal systems.</p>
        </div>
        <LabRegister />
      </section>

      {/* SECTION 08 — CONTACT (DENSITY: QUIET) */}
      <section className="home-contact-section" aria-labelledby="contact-heading">
        <div className="section-heading">
          <span className="section-index">07</span>
          <h2 id="contact-heading">Start a conversation</h2>
          <p>Have a messy system? Show me the data, workflow, or decision that currently hurts.</p>
        </div>
        <div className="home-contact__content">
          <div className="home-contact__channels">
            <a className="contact-card" href="mailto:adulsaa.q@gmail.com">
              <span className="contact-card__label">EMAIL DIRECT</span>
              <strong className="contact-card__value">adulsaa.q@gmail.com</strong>
              <small className="contact-card__sub">Bangkok (GMT+7) · Mon–Fri response</small>
            </a>
            <a className="contact-card" href="https://github.com/adulsaa-q" target="_blank" rel="noopener noreferrer">
              <span className="contact-card__label">CODE &amp; AUDITS</span>
              <strong className="contact-card__value">github.com/adulsaa-q</strong>
              <small className="contact-card__sub">Repositories, issues &amp; tests</small>
            </a>
            <a className="contact-card" href="https://fastwork.co/user/adulsaa.q" target="_blank" rel="noopener noreferrer">
              <span className="contact-card__label">FREELANCE CONTRACT</span>
              <strong className="contact-card__value">fastwork.co/user/adulsaa.q</strong>
              <small className="contact-card__sub">Escrow protection &amp; milestones</small>
            </a>
          </div>
          <div className="home-contact__footer">
            <Link className="text-link" href="/services">
              Review service boundaries &amp; engagement models →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
