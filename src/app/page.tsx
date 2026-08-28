import Image from "next/image";
import Link from "next/link";

import { projects } from "@/content/projects";
import { withBasePath } from "@/lib/base-path";
import type { Project } from "@/types/project";

const presentationBySlug: Record<Project["slug"], string> = {
  "ecommerce-sales-pipeline": "dashboard-plate",
  "shopee-thailand-analytics": "schema-led",
  "finance-etl-pipeline": "system-flow",
  timelimit: "offline-instrument",
};

function ProjectVisual({ project }: { project: Project }) {
  const artifact = project.artifacts.find((item) => item.src);

  if (project.slug === "finance-etl-pipeline") {
    return (
      <div className="project-visual" aria-label="Finance ETL system flow">
        <p className="artifact-label">RECONSTRUCTED FROM IMPLEMENTATION</p>
        <div className="system-flow">
          <div className="system-node">
            <small>01 / input</small>
            <strong>Statement PDF</strong>
          </div>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <div className="system-node">
            <small>02 / control</small>
            <strong>Parse + validate</strong>
          </div>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <div className="system-node">
            <small>03 / record</small>
            <strong>PostgreSQL audit</strong>
          </div>
        </div>
      </div>
    );
  }

  if (!artifact?.src) {
    return null;
  }

  return (
    <div className="project-visual">
      <figure>
        <Image
          src={withBasePath(artifact.src)}
          alt={artifact.alt}
          width={project.slug === "timelimit" ? 413 : 1920}
          height={project.slug === "timelimit" ? 255 : 1095}
          sizes="(max-width: 760px) 100vw, 58vw"
          unoptimized
        />
        <figcaption>{artifact.caption}</figcaption>
      </figure>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="page-shell">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <p className="eyebrow">Data systems / BI / automation</p>
          <h1 id="home-title">
            I turn messy operational data into systems people can actually use.
          </h1>
        </div>
        <div className="hero__aside">
          <p lang="th">เปลี่ยนข้อมูลกระจัดกระจาย ให้เป็นระบบที่ตรวจสอบและใช้งานได้จริง</p>
          <p>
            Selected work across reporting models, data pipelines and focused internal
            tools—shown with evidence, boundaries and the decisions behind them.
          </p>
          <Link className="text-link" href="/work">
            View the full work index
          </Link>
        </div>
      </section>

      <section className="work-showcase" aria-labelledby="selected-work">
        <div className="section-heading">
          <span className="section-index">01–04</span>
          <h2 id="selected-work">Selected systems</h2>
          <p>Four projects. Different constraints. Inspectable claims.</p>
        </div>

        {projects.map((project, index) => (
          <article
            className="project-entry"
            data-project-entry={project.slug}
            data-presentation={presentationBySlug[project.slug]}
            key={project.slug}
          >
            <div className="project-entry__content">
              <p className="project-kicker">
                {String(index + 1).padStart(2, "0")} / {project.year}
              </p>
              {project.evidence.some((item) => item.class === "SIMULATED") ? (
                <span className="scope-label" data-scope-label="simulated">
                  Simulated / demonstration scope
                </span>
              ) : null}
              <h3>{project.name}</h3>
              <p className="project-entry__title">{project.displayTitle}</p>
              <p className="project-entry__summary">{project.summary}</p>
              <ul className="project-meta" aria-label={`${project.name} technologies`}>
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="text-link" href={`/work/${project.slug}`}>
                Inspect project
              </Link>
            </div>
            <ProjectVisual project={project} />
          </article>
        ))}
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
