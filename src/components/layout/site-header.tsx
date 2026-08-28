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
            <span aria-hidden="true">Q</span>
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
