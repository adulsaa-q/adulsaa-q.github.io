"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation } from "@/content/navigation";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="desktop-navigation" aria-label="Primary navigation">
      {primaryNavigation.map((item) => {
        const isActive =
          pathname === item.href ||
          (Boolean(pathname) && pathname !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link${isActive ? " is-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="nav-link__dot" aria-hidden="true" />
            <span className="nav-link__label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
