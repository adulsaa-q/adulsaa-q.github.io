import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Q's working philosophy and bounded capabilities across reporting, data pipelines and research workflows.",
  path: "/about",
});

const capabilities = [
  {
    index: "01",
    title: "Dashboard & Decision Reporting",
    solves:
      "Operational exports that do not yet provide one consistent view for reporting decisions.",
    deliverables:
      "A cleaned reporting layer, documented model, measures and a focused dashboard or handover register.",
    inputs: "Representative exports, field definitions, reporting questions and data-owner context.",
    boundary:
      "A dashboard cannot repair missing source history or prove a business outcome on its own.",
    notIncluded: "Invented performance claims, undeclared live integrations or guaranteed ROI.",
  },
  {
    index: "02",
    title: "Data Pipeline & Operational Automation",
    solves:
      "Repeated data handling that needs explicit validation, recoverable runs and an inspectable source of truth.",
    deliverables:
      "A bounded transformation pipeline, validation rules, audit records, tests and handover documentation.",
    inputs: "Sample inputs, expected outputs, failure cases, access constraints and ownership rules.",
    boundary:
      "Automation scope depends on stable inputs, permitted access and agreed exception handling.",
    notIncluded: "Company-wide automation, undeclared production hardening or replacing human review.",
  },
  {
    index: "03",
    title: "AI Research & Workflow Systems",
    solves:
      "Research or agent workflows that need visible sources, authority limits and evidence handling.",
    deliverables:
      "A constrained prototype, source register, workflow rules and explicit review points.",
    inputs: "Research question, permitted sources, evaluation criteria and acceptable failure boundaries.",
    boundary:
      "Generated output remains reviewable work product, not verified truth or autonomous authority.",
    notIncluded: "Broad AI transformation, guaranteed accuracy or unsupervised high-stakes decisions.",
  },
];

const processStages = [
  ["01", "DISCOVER", "Redacted sample data, source fields and the decision to support."],
  ["02", "DEFINE", "Scope, expected outputs, ownership and failure boundaries."],
  ["03", "BUILD", "A working prototype with documented transformations and controls."],
  ["04", "VERIFY & HANDOVER", "Tests, evidence check, limitations and handover documentation."],
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-intro about-intro">
        <div>
          <p className="eyebrow">Working philosophy / capability boundaries</p>
          <h1>About the work</h1>
        </div>
        <p className="page-intro__note">
          This page describes how Q approaches systems and what the current body of
          work supports. It does not substitute an unverified biography for evidence.
        </p>
      </header>

      <section className="working-method" aria-labelledby="working-method-title">
        <div className="working-method__heading">
          <span className="section-index">METHOD / 01</span>
          <h2 id="working-method-title">Start with the operational source.</h2>
        </div>
        <div className="working-method__copy">
          <p>
            Begin with the files, fields, rules and failure cases that already shape
            the work. Separate what is observed from what is documented or assumed.
          </p>
          <p>
            Model the transformation so inputs, decisions and outputs can be read by
            someone other than the builder. Verification and limitations belong in
            the system, not in a footnote after delivery.
          </p>
        </div>
      </section>

      <section className="capability-register" aria-labelledby="capabilities-title">
        <div className="section-heading">
          <span className="section-index">01–03</span>
          <h2 id="capabilities-title">Capability register</h2>
          <p>Narrow by design. Each boundary is part of the offer.</p>
        </div>

        {capabilities.map((capability) => (
          <article className="capability-record" key={capability.index}>
            <div className="capability-record__title">
              <span className="section-index">{capability.index}</span>
              <h3>{capability.title}</h3>
            </div>
            <dl>
              <div>
                <dt>What it solves</dt>
                <dd>{capability.solves}</dd>
              </div>
              <div>
                <dt>What may be delivered</dt>
                <dd>{capability.deliverables}</dd>
              </div>
              <div>
                <dt>Inputs needed</dt>
                <dd>{capability.inputs}</dd>
              </div>
              <div>
                <dt>Boundary</dt>
                <dd>{capability.boundary}</dd>
              </div>
              <div>
                <dt>Not included</dt>
                <dd>{capability.notIncluded}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <section className="process-register" aria-labelledby="process-title">
        <div className="section-heading">
          <span className="section-index">PROCESS / 01–04</span>
          <h2 id="process-title">A bounded path to handover.</h2>
          <p>Each stage leaves a usable record behind.</p>
        </div>
        <ol className="process-register__steps">
          {processStages.map(([index, title, description]) => (
            <li key={index}>
              <span className="process-register__index">{index}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
