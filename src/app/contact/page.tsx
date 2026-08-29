import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Approved ways to inspect Q's work and, once supplied, connect through Fastwork.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro contact-intro">
        <div>
          <p className="eyebrow">Source / ways to work together</p>
          <h1>Contact</h1>
        </div>
        <p className="page-intro__note">
          Start with the public work record. No contact form, tracking script or
          unapproved private address is included in this static site.
        </p>
      </header>

      <section className="contact-register" aria-label="Contact routes">
        <article className="contact-route">
          <span className="section-index">01 / SOURCE</span>
          <h2>GitHub</h2>
          <p>Inspect public repositories, implementation records and current project scope.</p>
          <a
            className="contact-route__action"
            href="https://github.com/adulsaa-q"
            target="_blank"
            rel="noreferrer"
          >
            github.com/adulsaa-q
          </a>
        </article>

        <article id="work-enquiries" className="contact-route contact-route--pending">
          <span className="section-index">02 / WORK ENQUIRIES</span>
          <h2>Fastwork</h2>
          <p>
            The approved profile URL has not been supplied. This is intentionally not
            an active link.
          </p>
          <span className="contact-route__action" aria-disabled="true">
            Link pending approval
          </span>
        </article>
      </section>
    </main>
  );
}
