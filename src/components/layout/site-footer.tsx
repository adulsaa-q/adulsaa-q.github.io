import Link from "next/link";

import { ObfuscatedEmail } from "@/components/contact/obfuscated-email";
import { contact } from "@/content/contact";
import { primaryNavigation } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <Link href="/" className="site-footer__mark" aria-label="Q, home">
          Orbit Q
        </Link>

        <nav className="site-footer__links" aria-label="Footer navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__links">
          <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <ObfuscatedEmail />
          {contact.fastworkUrl ? (
            <a href={contact.fastworkUrl} target="_blank" rel="noopener noreferrer">
              Fastwork
            </a>
          ) : null}
        </div>
      </div>

      <div className="site-footer__base">
        <p>© {new Date().getFullYear()} Q / Adul Sa-a — evidence-led work record</p>
        <p lang="en">Static build. No trackers.</p>
      </div>
    </footer>
  );
}
