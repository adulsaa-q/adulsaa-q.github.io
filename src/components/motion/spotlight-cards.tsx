"use client";

import { useEffect } from "react";

/**
 * Cursor-tracked spotlight glow on project artifact plates (.project-visual).
 * Sets --spot-x/--spot-y per element on mousemove; globals.css does the rest
 * with a radial-gradient ::after that fades in on hover/focus-within.
 *
 * Decoration only: the plate is fully legible with the glow off, which is
 * its state with no JS, on touch devices (no mousemove), and before the
 * first pointer move on desktop.
 */
export function SpotlightCards() {
  useEffect(() => {
    const plates = Array.from(document.querySelectorAll<HTMLElement>(".project-visual"));
    if (plates.length === 0) return;

    const onMove = (event: MouseEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    for (const el of plates) {
      el.addEventListener("mousemove", onMove);
    }
    return () => {
      for (const el of plates) {
        el.removeEventListener("mousemove", onMove);
      }
    };
  }, []);

  return null;
}
