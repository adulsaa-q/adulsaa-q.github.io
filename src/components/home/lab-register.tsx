import Link from "next/link";
import { archiveRecords } from "@/content/archive";

export function LabRegister() {
  return (
    <div className="lab-register" role="region" aria-label="Experimental research register">
      <div className="lab-register__grid">
        {archiveRecords.map((item) => (
          <article className="lab-register__item" key={item.name}>
            <div className="lab-register__header">
              <span className={`lab-badge lab-badge--${item.status.toLowerCase()}`}>
                {item.status}
              </span>
              <a
                className="lab-register__source-link"
                href={item.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
            <h3 className="lab-register__title">{item.name}</h3>
            <p className="lab-register__summary">{item.summary}</p>
            <div className="lab-register__boundary">
              <span className="lab-boundary-label">Boundary:</span>
              <p>{item.limitation}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="lab-register__footer">
        <p>Experimental scripts, desktop utilities and research prototypes are catalogued in the full laboratory.</p>
        <Link className="text-link" href="/lab">
          Explore systems laboratory →
        </Link>
      </div>
    </div>
  );
}
