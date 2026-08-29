"use client";

import { useEffect } from "react";

// Supporting elements only — never the primary content blocks (project
// entries, work cards, case-study body), which must never depend on JS to
// be visible.
const SELECTOR = [
  ".pipeline-node",
  ".stat",
  ".principle",
  ".process-register__steps li",
  ".capability-record dl > div",
  ".archive-row",
  ".contact-route",
].join(",");

/**
 * Progressive enhancement: supporting elements fade in as they enter view.
 * The animation class is added from JS (no-JS keeps everything visible), a
 * safety timeout reveals anything the observer misses, and the whole thing
 * is inert under prefers-reduced-motion.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements: HTMLElement[] = [];
    for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        continue; // visible on load — leave it alone
      }
      el.classList.add("reveal");
      elements.push(el);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));

    // Safety net: never leave anything hidden.
    const failSafe = window.setTimeout(() => {
      for (const el of elements) el.classList.add("is-revealed");
    }, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  return null;
}
