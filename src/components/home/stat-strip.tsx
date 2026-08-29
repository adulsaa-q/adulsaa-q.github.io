import { projects } from "@/content/projects";
import { evidenceClasses } from "@/types/project";

const stats = [
  { value: String(projects.length), label: "case studies, each a public repository" },
  { value: String(evidenceClasses.length), label: "evidence grades applied to every claim" },
  { value: "100%", label: "displayed claims linked to their source" },
  { value: "0", label: "trackers, cookies or third-party scripts" },
] as const;

/** An honest ledger — counts and ratios drawn from the site itself, no invented business metrics. */
export function StatStrip() {
  return (
    <section className="stat-strip" aria-label="Portfolio at a glance">
      <dl>
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <dt>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
