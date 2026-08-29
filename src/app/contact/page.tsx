import type { Metadata } from "next";

import { ObfuscatedEmail } from "@/components/contact/obfuscated-email";
import { contact } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Ways to inspect Q's work and start a work enquiry — GitHub, email, and Fastwork when a profile URL is available.",
  path: "/contact",
});

const firstMessageHints = [
  "The problem you want solved, in your own words.",
  "What data you have (files, exports, a database) and roughly how much.",
  "A rough timeline and whether this is a one-off or ongoing.",
];

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro contact-intro">
        <div>
          <p className="eyebrow">Source / ways to work together</p>
          <h1>Contact</h1>
        </div>
        <p className="page-intro__note">
          Start with the public work record, then get in touch. No contact form,
          tracking script or unapproved private address is included in this static
          site.
        </p>
      </header>

      <section className="contact-register" aria-label="Contact routes">
        <article className="contact-route">
          <span className="section-index">01 / SOURCE</span>
          <h2>GitHub</h2>
          <p>Inspect public repositories, implementation records and current project scope.</p>
          <a
            className="contact-route__action"
            href={contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/adulsaa-q
          </a>
        </article>

        <article id="work-enquiries" className="contact-route">
          <span className="section-index">02 / WORK ENQUIRIES</span>
          <h2>Email</h2>
          <p>
            The most direct route for a project enquiry. Working hours are{" "}
            {contact.timezone}.
          </p>
          <ObfuscatedEmail className="contact-route__action" />
        </article>

        {contact.fastworkUrl ? (
          <article className="contact-route">
            <span className="section-index">03 / FASTWORK</span>
            <h2>Fastwork</h2>
            <p>Scope, milestones and payment handled through the Fastwork platform.</p>
            <a
              className="contact-route__action"
              href={contact.fastworkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View the Fastwork profile
            </a>
          </article>
        ) : (
          <article className="contact-route contact-route--pending">
            <span className="section-index">03 / FASTWORK</span>
            <h2>Fastwork</h2>
            <p>
              The approved profile URL has not been supplied yet. This is
              intentionally not an active link.
            </p>
            <span className="contact-route__action" aria-disabled="true">
              Link pending approval
            </span>
          </article>
        )}
      </section>

      <section className="contact-brief" aria-labelledby="contact-brief-title">
        <div className="section-heading">
          <span className="section-index">NOTE</span>
          <h2 id="contact-brief-title">What helps in a first message</h2>
          <p>A short, specific note gets a faster and more useful reply.</p>
        </div>
        <ul className="detail-list">
          {firstMessageHints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
