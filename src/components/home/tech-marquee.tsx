const technologies = [
  "Power BI",
  "Power Query/M",
  "DAX",
  "SQL",
  "PostgreSQL",
  "Supabase",
  "Python",
  "SQLite",
  "Gmail IMAP",
  "PDF parsing",
  "Google Sheets API",
  "TypeScript",
  "Electron",
  "Vite",
  "Vitest",
  "GitHub Actions",
  "SQLAlchemy",
  "Obsidian",
  "Gemini",
  "OpenRouter",
] as const;

/**
 * The verified stack as a slow ticker. Pure CSS: the list is rendered twice so
 * the loop is seamless; it pauses on hover and stops entirely under
 * prefers-reduced-motion (where it falls back to a wrapped list).
 */
export function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Verified technology stack">
      <p className="tech-marquee__label">Verified stack</p>
      <div className="tech-marquee__viewport">
        <ul className="tech-marquee__track" aria-hidden="true">
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <ul className="tech-marquee__track" aria-hidden="true">
          {technologies.map((tech) => (
            <li key={`${tech}-dup`}>{tech}</li>
          ))}
        </ul>
      </div>
      <ul className="tech-marquee__sr">
        {technologies.map((tech) => (
          <li key={`${tech}-sr`}>{tech}</li>
        ))}
      </ul>
    </section>
  );
}
