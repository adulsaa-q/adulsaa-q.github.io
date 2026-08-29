"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".pipeline-diagram",
  ".work-showcase .project-entry",
  ".principles .principle",
  ".project-body",
  ".project-lead-artifact",
  ".capability-record",
  ".process-register__steps li",
  ".archive-row",
  ".contact-route",
  ".work-card",
  ".site-footer__grid",
].join(",");

/**
 * Progressive enhancement: sections rise and fade in as they enter the
 * viewport. Adds the animation class from JS (so no-JS / failed-JS keeps
 * everything visible) and does nothing at all under prefers-reduced-motion.
 * Elements already on screen at load are shown immediately, no transition.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
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
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        continue; // visible on load — leave it alone
      }
      el.classList.add("reveal");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
