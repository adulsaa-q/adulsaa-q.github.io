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
 * A compact, accessible register of the tools present in the evidence record.
 */
export function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Verified technology stack">
      <p className="tech-marquee__label">Verified stack</p>
      <ul className="tech-marquee__track">
        {technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </section>
  );
}
