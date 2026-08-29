const stages = [
  { key: "DATA", note: "messy source exports" },
  { key: "MODEL", note: "one legible structure" },
  { key: "DECISION", note: "measures and rules" },
  { key: "HANDOVER", note: "tests and docs" },
] as const;

/**
 * The working path, drawn rather than listed. Decorative-but-informative:
 * it restates the four stages the site is organised around.
 */
export function PipelineDiagram() {
  return (
    <figure className="pipeline-diagram" aria-label="From source data to handover: data, model, decision, handover">
      <div className="pipeline-diagram__track">
        {stages.map((stage, index) => (
          <div className="pipeline-node" key={stage.key}>
            <span className="pipeline-node__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="pipeline-node__label">{stage.key}</span>
            <span className="pipeline-node__note">{stage.note}</span>
            {index < stages.length - 1 ? (
              <span className="pipeline-node__link" aria-hidden="true">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
