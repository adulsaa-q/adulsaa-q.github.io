export function HeroProofToken() {
  return (
    <aside className="hero-proof-token" aria-label="System transformation proof token">
      <div className="proof-token__header">
        <span className="proof-token__badge">THE OBSERVABLE TRANSFORMATION</span>
        <span className="proof-token__status">INSPECTABLE DISCIPLINE</span>
      </div>

      <ol className="proof-token__steps">
        <li className="proof-token__step">
          <div className="proof-token__step-meta">
            <span className="proof-token__step-num">01</span>
            <strong className="proof-token__step-label">DATA</strong>
          </div>
          <span className="proof-token__step-arrow" aria-hidden="true">→</span>
          <p className="proof-token__step-desc">Incompatible operational exports (Shopee, Lazada, KBank PDF)</p>
        </li>
        <li className="proof-token__step">
          <div className="proof-token__step-meta">
            <span className="proof-token__step-num">02</span>
            <strong className="proof-token__step-label">MODEL</strong>
          </div>
          <span className="proof-token__step-arrow" aria-hidden="true">→</span>
          <p className="proof-token__step-desc">Normalized dimensional star schema with zero many-to-many ambiguity</p>
        </li>
        <li className="proof-token__step">
          <div className="proof-token__step-meta">
            <span className="proof-token__step-num">03</span>
            <strong className="proof-token__step-label">DECISION</strong>
          </div>
          <span className="proof-token__step-arrow" aria-hidden="true">→</span>
          <p className="proof-token__step-desc">Equal elapsed-day comparisons, conformed DAX measures, auditable KPIs</p>
        </li>
        <li className="proof-token__step">
          <div className="proof-token__step-meta">
            <span className="proof-token__step-num">04</span>
            <strong className="proof-token__step-label">HANDOVER</strong>
          </div>
          <span className="proof-token__step-arrow" aria-hidden="true">✓</span>
          <p className="proof-token__step-desc">Version-controlled tests, committed code artifacts, and declared boundaries</p>
        </li>
      </ol>

      <div className="proof-token__footer">
        <span className="proof-token__tz">BANGKOK · UTC+7</span>
        <a href="#observe-system" className="proof-token__anchor">
          Observe the system below ↓
        </a>
      </div>
    </aside>
  );
}
