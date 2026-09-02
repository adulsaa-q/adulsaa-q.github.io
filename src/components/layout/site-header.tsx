import Link from "next/link";

import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
                cx="60"
                cy="60"
                r="57"
                fill="var(--surface-secondary)"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="2"
              />
              <circle
                cx="57"
                cy="57"
                r="27"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="11"
                strokeDasharray="140 42"
                transform="rotate(-40 57 57)"
              />
              <path
                d="M74 74L95 95"
                fill="none"
                stroke="var(--signal-primary)"
                strokeLinecap="round"
                strokeWidth="11"
              />
            </svg>
            <span>Orbit Q / Data, BI &amp; Automation Systems</span>
          </Link>

          <nav className="desktop-navigation" aria-label="Primary navigation">
            {primaryNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <MobileNavigation />
        </div>
      </header>
    </>
  );
}
