import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Q's working philosophy and bounded capabilities across reporting, data pipelines and research workflows.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro about-intro">
        <div>
          <p className="eyebrow">Adul Sa-a / Q</p>
          <h1>The person behind the systems</h1>
        </div>
        <p className="page-intro__note">
          I’m Q, a data, BI, and automation builder based in Bangkok. I connect
          source data, reporting models, and repeatable workflows so the work is
          easier to understand and maintain.
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

      <section className="working-method" aria-labelledby="collaboration-title">
        <div className="working-method__heading">
          <span className="section-index">COLLABORATION</span>
          <h2 id="collaboration-title">A useful starting point.</h2>
        </div>
        <div className="working-method__copy">
          <p>Bring a reporting question, a recurring task, or a sample of the data that is getting in the way. We can use that to discuss scope, constraints, and what a useful result would look like.</p>
          <p>I work from Bangkok (UTC+7). My public projects include demonstrations and experiments; each case study distinguishes the implementation from what has not been verified.</p>
          <Link className="text-link" href="/method">Read my working method</Link>
        </div>
      </section>

      <div className="project-cta__forward">
        <p>Explore the services and discuss a project.</p>
        <Link className="text-link" href="/services">
          Services
        </Link>
        <Link className="text-link text-link--muted" href="/contact#work-enquiries">
          Start a work enquiry
        </Link>
      </div>
    </main>
  );
}
