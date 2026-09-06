"use client";

import { useCallback, useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

interface TextScrambleProps extends ComponentPropsWithoutRef<"span"> {
  text: string;
  triggerOnHover?: boolean;
  triggerOnReveal?: boolean;
  durationMs?: number;
}

const GLYPHS = "01_\\/[]{}—=+*^?#~";

export function TextScramble({
  text,
  triggerOnHover = true,
  triggerOnReveal = true,
  durationMs = 400,
  className,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isScramblingRef = useRef(false);

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;

    // Honor reduced motion
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayText(text);
      return;
    }

    isScramblingRef.current = true;
    const startTime = performance.now();
    const length = text.length;

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const revealedCount = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " " || text[i] === "/" || text[i] === "-") {
          result += text[i];
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }

    requestAnimationFrame(update);
  }, [text, durationMs]);

  useEffect(() => {
    if (!triggerOnReveal) return;

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      scramble();
      return;
    }

    let hasScrambled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasScrambled) {
          hasScrambled = true;
          scramble();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnReveal, scramble]);

  return (
    <span
      ref={elementRef}
      className={className}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
