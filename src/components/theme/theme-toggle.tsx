"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "dark") {
      const frame = window.requestAnimationFrame(() => setTheme("dark"));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function toggleTheme() {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem("q-theme", next);
      } catch {
        // Private browsing and restricted embeds may deny storage; the session
        // theme still applies through the document attribute.
      }
      setTheme(next);
    };

    // One authored moment, not a snap: cross-fade the swap where supported.
    // Reduced motion gets the plain instant update — same as the no-JS path.
    // (matchMedia is absent in the jsdom test environment, hence the guard.)
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-toggle__icon">
        {theme === "dark" ? (
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        ) : (
          <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
