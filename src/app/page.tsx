import Link from "next/link";

import { ArtifactCarousel } from "@/components/project/artifact-carousel";
import { ZoomableImage } from "@/components/project/zoomable-image";
import { contact, contactEmail } from "@/content/contact";
import { projects } from "@/content/projects";
import { textLang } from "@/lib/i18n";
import styles from "./home.module.css";

const selected = projects.filter(project => ["ecommerce-sales-pipeline", "ai-brand-tracker"].includes(project.slug));
const services = [
  { title: "Reporting people can use", text: "Bring scattered exports into a Power BI model with consistent measures and clear reporting views.", tools: "Power BI · Power Query · DAX" },
  { title: "A stronger data foundation", text: "Connect tables, define the grain, and make SQL analysis traceable to the question it answers.", tools: "SQL · PostgreSQL · Data modeling" },
  { title: "Less repetitive data work", text: "Turn recurring file handling into a pipeline with validation, failure handling, and a useful handover.", tools: "Python · ETL · Automation" },
];

export default function Home() {
  const lead = selected[0].artifacts[1];
  return (
    <main id="main-content" tabIndex={-1} className={`page-shell ${styles.home}`}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>Adul Sa-a / Q <span>Data, BI &amp; Automation</span></p>
          <h1 id="home-title">Clearer data.<br />Useful systems.</h1>
          <p className={styles.lead}>I turn messy operational data into systems people can actually use.</p>
          <p className={styles.description}>Power BI reporting, SQL models, and automation—from the source files to the decisions they support.</p>
          <p className={styles.thai} lang="th">เปลี่ยนข้อมูลที่กระจัดกระจาย ให้เป็นระบบที่เข้าใจและนำไปใช้ได้จริง</p>
          <div className={styles.actions}>
            <Link className="hero-btn-primary" href="#selected-work">Explore selected work <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/contact">Let’s talk</Link>
          </div>
          <p className={styles.location}>Based in Bangkok · UTC+7</p>
        </div>
        <figure className={styles.feature}>
          <div className={styles.figureHeading}><span>Selected work / 01</span><span>Power BI</span></div>
          {lead.src && <ZoomableImage src={lead.src} alt={lead.alt} width={1920} height={1095} eager />}
          <figcaption>
            <Link href="/work/ecommerce-sales-pipeline">From marketplace exports to one reporting model <span aria-hidden="true">↗</span></Link>
            <p>Actual project artifact · Synthetic/anonymized demonstration data</p>
          </figcaption>
          <ol className={styles.flow} aria-label="Project workflow">
            <li><span>01</span> Source exports</li><li><span>02</span> Shared model</li><li><span>03</span> Reporting</li>
          </ol>
        </figure>
      </section>

      <section className={styles.work} aria-labelledby="selected-work">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>01 / Selected work</p>
          <h2 id="selected-work">The work, and the thinking behind it.</h2>
          <p>Two case studies with working artifacts, source code, and clear limits on what they demonstrate.</p>
        </div>
        {selected.map((project, index) => (
          <article id={`project-${project.slug}`} data-project-entry={project.slug} data-presentation={index === 0 ? "dashboard-plate" : "analytics-application"} className={styles.project} key={project.slug}>
            <div className={styles.projectCopy}>
              <p className={styles.eyebrow}>0{index + 1} / {project.kind}</p>
              <h3>{index === 0 ? "One view across sales channels." : "Know what your visibility metrics actually measure."}</h3>
              <p className={styles.projectName}>{project.name}</p>
              <p lang={textLang(project.displayTitle)}>{project.displayTitle}</p>
              <p>{project.problem}</p>
              <div className={styles.result}><h4>What the system enables</h4><p>{project.impact}</p></div>
              <span className="scope-label" data-scope-label={index === 0 ? "simulated" : "experimental"}>{index === 0 ? "Simulated / demonstration scope" : "Public implementation / experimental"}</span>
              <div className={styles.actions}>
                <Link className="text-link" href={`/work/${project.slug}`}>Read case study</Link>
                <a className="text-link text-link--muted" href={project.repository} target="_blank" rel="noopener noreferrer">GitHub source</a>
              </div>
            </div>
            <ArtifactCarousel projectSlug={project.slug} projectName={project.name} artifacts={project.artifacts} />
          </article>
        ))}
        <div className={styles.sectionEnd}><p>More pipelines, internal tools, and implementation details.</p><Link className="text-link" href="/work">Explore all work</Link></div>
        <p className={styles.relatedWork}>How I organize AI-assisted engineering: <Link href="/work/ai-command-center">AI Command Center</Link>. Browse the full source collection on <a href="https://github.com/adulsaa-q" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </section>

      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>02 / Ways to work together</p>
          <h2 id="services-title">Start with the problem you need to solve.</h2>
          <Link className="text-link" href="/services">How to work with me</Link>
        </div>
        <div className={styles.serviceGrid}>{services.map((service, index) => <article key={service.title}>
          <span className={styles.eyebrow}>0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p><p className={styles.tools}>{service.tools}</p>
        </article>)}</div>
      </section>

      <section className={styles.about} aria-labelledby="about-title">
        <p className={styles.eyebrow}>03 / The person behind the work</p>
        <div><h2 id="about-title">I’m Q. I care about what happens after the dashboard.</h2>
          <p>Can someone explain the number? Find the source? Rerun the process when a file changes? Those questions shape how I build.</p>
          <p>My work connects reporting, data modeling, and focused automation. I make the decisions visible so the next person can understand and maintain the system.</p>
          <div className={styles.actions}><Link className="text-link" href="/about">More about me</Link><Link className="text-link text-link--muted" href="/method">How I approach a project</Link></div>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <p className={styles.eyebrow}>04 / Contact</p>
        <h2 id="contact-title">What would you like<br />your data to do better?</h2>
        <p>For a project, a role, or a technical conversation, tell me what you’re working on.</p>
        <a className={styles.email} href={`mailto:${contactEmail}`}>{contactEmail} <span aria-hidden="true">↗</span></a>
        <div className={styles.actions}><a className="text-link" href={contact.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a><a className="text-link" href={contact.fastworkUrl} target="_blank" rel="noopener noreferrer">Fastwork</a><span className={styles.location}>Bangkok · UTC+7</span></div>
      </section>
    </main>
  );
}
