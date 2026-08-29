import { projects } from "@/content/projects";

const evidenceLinkCount = projects.reduce(
  (total, project) => total + project.evidence.length,
  0,
);

const simulatedCount = projects.filter((project) =>
  project.evidence.some(
    (item) => item.class === "SIMULATED" || item.class === "EXPERIMENTAL",
  ),
).length;

const stats = [
  { value: String(projects.length), label: "public case studies" },
  { value: String(evidenceLinkCount), label: "evidence links to code, tests and artifacts" },
  { value: String(simulatedCount), label: "labelled simulated — shown as demonstration, not real outcomes" },
  { value: "0", label: "trackers, cookies or third-party scripts" },
] as const;

/**
 * An honest ledger: every figure is counted from the site's own content or
 * is verifiably zero. No invented business metrics. These move only when real
 * work is added.
 */
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
