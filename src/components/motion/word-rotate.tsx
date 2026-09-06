"use client";

import { useEffect, useState, type ComponentPropsWithoutRef } from "react";

interface WordRotateProps extends ComponentPropsWithoutRef<"span"> {
  words: string[];
  durationMs?: number;
}

export function WordRotate({
  words,
  durationMs = 2800,
  className,
  ...props
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (words.length <= 1) return;

    // Respect reduced motion: stay on first word
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 200);
    }, durationMs);

    return () => clearInterval(interval);
  }, [words, durationMs]);

  return (
    <span
      className={`word-rotate${isTransitioning ? " is-fading" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <span className="word-rotate__text" key={index}>
        {words[index]}
      </span>
    </span>
  );
}
