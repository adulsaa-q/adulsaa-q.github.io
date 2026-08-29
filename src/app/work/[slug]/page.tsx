import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { withBasePath } from "@/lib/base-path";
import { createPageMetadata } from "@/lib/metadata";
import type { Artifact, Project } from "@/types/project";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return createPageMetadata({
    title: `${project.name} — Work`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

function DetailSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="project-body" aria-labelledby={`section-${index}`}>
      <div className="project-body__label">
        <span className="section-index">{index}</span>
        <h2 id={`section-${index}`}>{title}</h2>
      </div>
      <div className="project-body__content">{children}</div>
    </section>
  );
}

function ArtifactCard({ artifact, projectName }: { artifact: Artifact; projectName: string }) {
  if (!artifact.src) {
    return (
      <figure className="artifact-card artifact-card--reconstructed">
        <p className="artifact-label">RECONSTRUCTED FROM IMPLEMENTATION</p>
        <div className="system-flow">
          <div className="system-node"><small>Input</small><strong>Source</strong></div>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <div className="system-node"><small>Logic</small><strong>System</strong></div>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <div className="system-node"><small>Record</small><strong>Output</strong></div>
        </div>
        <figcaption>{artifact.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="artifact-card">
      <Image
        src={withBasePath(artifact.src)}
        alt={artifact.alt}
        width={1920}
        height={1095}
        sizes="(max-width: 760px) 100vw, 45vw"
        unoptimized
      />
      <figcaption>
        {projectName}: {artifact.caption}
      </figcaption>
    </figure>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="project-hero">
        <div>
          <p className="eyebrow">Work / {project.year}</p>
          <h1>{project.name}</h1>
        </div>
        <div className="project-hero__aside">
          <span className="scope-label">{project.status}</span>
          <p>{project.displayTitle}</p>
          <a className="text-link" href={project.repository}>
            Source repository
          </a>
        </div>
      </header>

      <DetailSection index="01" title="Context">
        <p>{project.context}</p>
        <h3>Problem</h3>
        <p>{project.problem}</p>
        <h3>Constraints</h3>
        <ul className="detail-list">
          {project.constraints.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </DetailSection>

      <DetailSection index="02" title="System">
        <p>{project.summary}</p>
        <h3>Inputs</h3>
        <ul className="detail-list">
          {project.input.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <h3>Implementation</h3>
        <ul className="detail-list">
          {[...project.system, ...project.implementation].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection index="03" title="Decisions">
        <ul className="decision-list">
          {project.decisions.map((decision) => (
            <li key={decision.title}>
              <strong>{decision.title}</strong>
              {decision.why}
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection index="04" title="Artifacts">
        <div className="artifact-grid">
          {project.artifacts.map((artifact) => (
            <ArtifactCard
              artifact={artifact}
              projectName={project.name}
              key={`${artifact.type}-${artifact.caption}`}
            />
          ))}
        </div>
      </DetailSection>

      <DetailSection index="05" title="Evidence">
        <p>
          Evidence classes distinguish what can be inspected directly from what is
          documented, simulated or reconstructed.
        </p>
        <ul className="evidence-list">
          {project.evidence.map((item) => (
            <li className="evidence-item" key={`${item.class}-${item.sourcePath}`}>
              <span className="evidence-class">{item.class.replaceAll("_", " ")}</span>
              <div>
                <a href={item.sourceUrl}>{item.label}</a>
                <p>{item.sourcePath}</p>
                {item.note ? <p>{item.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection index="06" title="Limitations">
        <ul className="detail-list">
          {project.limitations.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </DetailSection>

      <div className="project-cta">
        <p>Return to the complete project register.</p>
        <Link className="text-link" href="/work">All work</Link>
      </div>
    </main>
  );
}
