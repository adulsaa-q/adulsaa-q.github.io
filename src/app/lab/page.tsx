import type { Metadata } from "next";
import Link from "next/link";

import { archiveRecords } from "@/content/archive";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Lab",
  description:
    "Active prototypes, schema exploration tools, and experimental systems engineered by Q.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Systems Laboratory / Experimental Work</p>
          <h1>Lab</h1>
        </div>
        <p className="page-intro__note">
          Smaller utilities, interface prototypes, and research workflows.
          These are experiments, not claims of client deployment. The Archive
          provides a compact source index of the same projects.
        </p>
      </header>

      <section className="archive-list" aria-label="Experimental systems and tools">
        {archiveRecords.map((record) => (
          <article className="archive-row" key={record.name} data-status={record.status}>
            <div className="archive-row__main">
              <span className="scope-label" data-scope-label={record.status.toLowerCase()}>
                {record.status}
              </span>
              <h2>{record.name}</h2>
              <p className="archive-row__summary">{record.summary}</p>
              <div className="archive-row__limitation">
                <span className="limitation-label">Boundary:</span>
                <p>{record.limitation}</p>
              </div>
            </div>
            <div className="archive-row__action">
{record.sourceUnavailable ? <span className="source-unavailable">Public source unavailable</span> : (              <a
                className="source-link"
                href={record.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect repository ↗
              </a>)}
            </div>
          </article>
        ))}
      </section>

      <div className="project-cta__forward">
        <p>Explore the reporting case studies.</p>
        <Link className="text-link" href="/work">
          Explore Selected Systems
        </Link>
        <Link className="text-link text-link--muted" href="/method">
          Read the working method
        </Link>
      </div>
    </main>
  );
}
