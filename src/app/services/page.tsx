import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Three bounded ways to work with Q: dashboard and reporting systems, data pipelines and operational automation, and AI research and workflow systems.",
  path: "/services",
});

function projectName(slug: string) {
  return projects.find((project) => project.slug === slug)?.name ?? "the work index";
}

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Ways to work together</p>
          <h1>Services</h1>
        </div>
        <p className="page-intro__note">
          Three bounded engagements. Each one lists what it produces and where it
          stops. The linked case study shows the same kind of work in the public
          repositories.
        </p>
      </header>

      <section className="capability-register" aria-labelledby="services-title">
        <div className="section-heading">
          <span className="section-index">01–03</span>
          <h2 id="services-title">What you can hire this for</h2>
          <p>Narrow by design. The boundary is part of the offer.</p>
        </div>

        {services.map((service) => (
          <article className="capability-record" key={service.slug}>
            <div className="capability-record__title">
              <span className="section-index">{service.index}</span>
              <h3>{service.title}</h3>
            </div>
            <dl>
              <div>
                <dt>Who this is for</dt>
                <dd>{service.forWho}</dd>
              </div>
              <div>
                <dt>The problem</dt>
                <dd>{service.problem}</dd>
              </div>
              <div>
                <dt>What you provide</dt>
                <dd>{service.inputs}</dd>
              </div>
              <div>
                <dt>What may be delivered</dt>
                <dd>
                  <ul className="detail-list detail-list--tight">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Where it stops</dt>
                <dd>{service.boundary}</dd>
              </div>
              <div>
                <dt>Demonstrated in</dt>
                <dd>
                  {service.caseStudySlug ? (
                    <Link className="text-link" href={`/work/${service.caseStudySlug}`}>
                      {projectName(service.caseStudySlug)}
                    </Link>
                  ) : (
                    <Link className="text-link" href="/archive">
                      Experimental AI work in the archive
                    </Link>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <div className="project-cta__forward">
        <p>Start a work enquiry.</p>
        <Link className="text-link" href="/contact#work-enquiries">
          Contact
        </Link>
        <Link className="text-link text-link--muted" href="/work">
          See the evidence first
        </Link>
      </div>
    </main>
  );
}
