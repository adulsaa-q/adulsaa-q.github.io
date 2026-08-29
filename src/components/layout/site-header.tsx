import Link from "next/link";

import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { primaryNavigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="wordmark" href="/" aria-label="Q, home">
            <svg
              aria-hidden="true"
              className="brand-mark"
              data-testid="brand-mark"
              viewBox="0 0 120 120"
            >
              <circle
                cx="54"
                cy="54"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="12"
                strokeDasharray="170 45"
                transform="rotate(-38 54 54)"
              />
              <path
                d="M76 77L103 104"
                fill="none"
                stroke="var(--signal-primary)"
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <span>Data, BI &amp; Automation Systems</span>
          </Link>

          <nav className="desktop-navigation" aria-label="Primary navigation">
            {primaryNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <MobileNavigation />
        </div>
      </header>
    </>
  );
}
