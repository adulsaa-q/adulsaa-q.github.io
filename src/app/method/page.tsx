import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Method",
  description:
    "How Q approaches data systems, three bounded engagement models, and the explicit limits of what can be built.",
  path: "/method",
});

const processStages = [
  { index: "01", name: "DISCOVER", description: "Audit sample data, field definitions, and the operational decision to support." },
  { index: "02", name: "DEFINE", description: "Establish dimensional schema, validation tiers, access boundaries, and test criteria." },
  { index: "03", name: "BUILD", description: "Construct Power Query transforms, SQL modules, and documented DAX measures." },
  { index: "04", name: "VERIFY & HANDOVER", description: "Execute automated tests, limitation declarations, and handover documentation." },
] as const;

export default function MethodPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro method-intro">
        <div>
          <p className="eyebrow">Architecture / Working Philosophy &amp; Engagement</p>
          <h1>Method</h1>
        </div>
        <p className="page-intro__note">
          How I move from source data to a maintainable system: understand the
          question, agree the scope, build, and verify.
        </p>
      </header>

      {/* Philosophy Section */}
      <section className="working-method" aria-labelledby="method-philosophy-title">
        <div className="working-method__heading">
          <span className="section-index">PHILOSOPHY</span>
          <h2 id="method-philosophy-title">Start with the operational source.</h2>
        </div>
        <div className="working-method__copy">
          <p>
            Begin with the files, fields, rules, and failure cases that already shape the
            daily work. Separate what is observed from what is documented or assumed.
          </p>
          <p>
            Model the transformation so inputs, decisions, and outputs can be inspected by
            someone other than the builder. Verification and boundaries belong in the
            system itself, not in a disclaimer footnote after delivery.
          </p>
        </div>
      </section>

      {/* The Core Triad */}
      <section className="principles" aria-label="Core architectural triad">
        <article className="principle">
          <span className="section-index">01 / TRACE</span>
          <h2>Start with the source.</h2>
          <p>Each material claim points back to code, tests, documentation, or a committed artifact.</p>
        </article>
        <article className="principle">
          <span className="section-index">02 / MODEL</span>
          <h2>Make the system legible.</h2>
          <p>Inputs, transformations, decisions, and outputs are separated so the work can be inspected.</p>
        </article>
        <article className="principle">
          <span className="section-index">03 / BOUND</span>
          <h2>State what is not proven.</h2>
          <p>Simulation, reconstruction, and implementation limits remain visible instead of becoming marketing claims.</p>
        </article>
      </section>

      <div className="project-cta__forward">
        <p>Looking for deliverables, inputs, and project scope?</p>
        <Link className="text-link" href="/services">Explore services</Link>
      </div>

      {/* 4-Stage Delivery Lifecycle */}
      <section className="process-register" aria-labelledby="lifecycle-title">
        <div className="section-heading">
          <span className="section-index">PROCESS</span>
          <h2 id="lifecycle-title">Delivery lifecycle</h2>
          <p>From initial audit to verified handover.</p>
        </div>
        <ol className="process-register__steps">
          {processStages.map((stage) => (
            <li key={stage.index}>
              <span className="process-register__index">{stage.index}</span>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Forward Action */}
      <div className="project-cta__forward">
        <p>Ready to explore an engagement?</p>
        <Link className="text-link" href="/contact#work-enquiries">
          Start a project enquiry
        </Link>
        <Link className="text-link text-link--muted" href="/work">
          Inspect the evidence first
        </Link>
      </div>
    </main>
  );
}
