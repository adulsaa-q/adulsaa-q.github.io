import type { Metadata } from "next";

import { archiveRecords } from "@/content/archive";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Archive",
  description:
    "Smaller and experimental systems by Q, recorded with explicit scope and limitations.",
  path: "/archive",
});

export default function ArchivePage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-intro archive-intro">
        <div>
          <p className="eyebrow">Smaller systems / experiments</p>
          <h1>Archive</h1>
        </div>
        <p className="page-intro__note">
          A ledger of secondary and experimental work. These records stay compact so
          their public evidence is not stretched into a larger claim.
        </p>
      </header>

      <section className="archive-register" aria-label="Archived projects">
        <div className="archive-register__head" aria-hidden="true">
          <span>Record</span>
          <span>Scope</span>
          <span>Boundary</span>
          <span>Source</span>
        </div>
        {archiveRecords.map((record, index) => (
          <article className="archive-row" key={record.name}>
            <div className="archive-row__title">
              <span className="archive-row__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{record.name}</h2>
              <span className="scope-label" data-status={record.status}>
                {record.status}
              </span>
            </div>
            <p>{record.summary}</p>
            <p className="archive-row__limitation">{record.limitation}</p>
            <a
              className="source-link"
              href={record.repository}
              target="_blank"
              rel="noreferrer"
            >
              GitHub source
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
