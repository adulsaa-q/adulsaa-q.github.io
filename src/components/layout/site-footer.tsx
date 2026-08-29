import Link from "next/link";

import { ObfuscatedEmail } from "@/components/contact/obfuscated-email";
import { contact } from "@/content/contact";
import { primaryNavigation } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__mark">Orbit Q</p>
          <p>Data, BI &amp; automation systems. A static, evidence-led work record.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <span>Site</span>
          <Link href="/">Home</Link>
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__contact">
          <span>Contact</span>
          <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer">
            github.com/adulsaa-q
          </a>
          <ObfuscatedEmail />
          {contact.fastworkUrl ? (
            <a href={contact.fastworkUrl} target="_blank" rel="noopener noreferrer">
              Fastwork profile
            </a>
          ) : null}
        </div>
      </div>

      <div className="site-footer__base">
        <p>© {new Date().getFullYear()} Q / Adul Sa-a</p>
        <p lang="en">Built with Next.js, deployed static. No trackers.</p>
      </div>
    </footer>
  );
}
