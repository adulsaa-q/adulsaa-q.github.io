import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ZoomableImage } from "@/components/project/zoomable-image";
import { projects } from "@/content/projects";
import { textLang } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/structured-data";
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
      <ZoomableImage
        src={artifact.src}
        alt={artifact.alt}
        width={1920}
        height={1095}
        sizes="(max-width: 760px) 100vw, 45vw"
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

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const leadArtifact = project.artifacts.find((item) => item.src);
  const gridArtifacts = leadArtifact
    ? project.artifacts.filter((item) => item !== leadArtifact)
    : project.artifacts;

  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <JsonLd
        data={[
          creativeWorkSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <header className="project-hero">
        <div>
          <p className="eyebrow">Work / {project.kind}</p>
          <h1>{project.name}</h1>
        </div>
        <div className="project-hero__aside">
          <span className="scope-label">{project.status}</span>
          <p lang={textLang(project.displayTitle)}>{project.displayTitle}</p>
          <a
            className="text-link"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source repository
          </a>
        </div>
      </header>

      {leadArtifact?.src ? (
        <figure className="project-lead-artifact">
          <ZoomableImage
            src={leadArtifact.src}
            alt={leadArtifact.alt}
            width={1920}
            height={1095}
            sizes="(max-width: 900px) 100vw, 82vw"
            eager
          />
          <figcaption>{leadArtifact.caption}</figcaption>
        </figure>
      ) : null}

      <DetailSection index="01" title="Context">
        <p>{project.context}</p>
        <h3>Problem</h3>
        <p>{project.problem}</p>
        <h3>Operational impact</h3>
        <p>{project.impact}</p>
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
        {gridArtifacts.length > 0 ? (
          <div className="artifact-grid">
            {gridArtifacts.map((artifact) => (
              <ArtifactCard
                artifact={artifact}
                projectName={project.name}
                key={`${artifact.type}-${artifact.caption}`}
              />
            ))}
          </div>
        ) : (
          <p>
            The artifact above is the committed evidence for this project. More
            screenshots and files are in the{" "}
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              public repository
            </a>
            .
          </p>
        )}
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
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
                <p>{item.sourcePath}</p>
                {item.note ? <p>{item.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection index="06" title="Limitations">
        <ul className="detail-list">
          {project.limitations.map((item) => (
            <li key={item} lang={textLang(item)}>
              {item}
            </li>
          ))}
        </ul>
      </DetailSection>

      <div className="project-cta__forward">
        <p>Discuss a system like this.</p>
        <Link className="text-link" href="/contact#work-enquiries">
          Start a work enquiry
        </Link>
        <Link className="text-link text-link--muted" href="/work">
          All work
        </Link>
      </div>

      <nav className="project-next-nav" aria-label="More projects">
        <Link href={`/work/${previousProject.slug}`}>
          <span>Previous</span>
          <strong>{previousProject.name}</strong>
        </Link>
        <Link href={`/work/${nextProject.slug}`}>
          <span>Next</span>
          <strong>{nextProject.name}</strong>
        </Link>
      </nav>
    </main>
  );
}
