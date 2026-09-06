"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  formatLocale?: boolean;
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  formatLocale = true,
  className,
  ...props
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const isReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = elementRef.current;
    if (isReducedMotion || !el || typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease-out expo for precision feel: 1 - 2^(-10 * progress)
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * value);

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  const formatted = formatLocale
    ? displayValue.toLocaleString()
    : String(displayValue);

  const finalFormatted = formatLocale
    ? value.toLocaleString()
    : String(value);

  return (
    <span ref={elementRef} className={className} {...props}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {finalFormatted}
        {suffix}
      </span>
    </span>
  );
}
