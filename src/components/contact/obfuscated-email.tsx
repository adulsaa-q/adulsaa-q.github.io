"use client";

import { useSyncExternalStore } from "react";

import { contact } from "@/content/contact";

const emptySubscribe = () => () => {};

/** False during SSR and the first client render, true once hydrated. */
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type ObfuscatedEmailProps = {
  className?: string;
};

/**
 * Renders the email address only after hydration, assembled from parts, so the
 * server HTML never contains a plain `mailto:` string for naive scrapers to
 * harvest. Falls back to a readable, non-linked form before/without JS.
 */
export function ObfuscatedEmail({ className }: ObfuscatedEmailProps) {
  const hydrated = useHydrated();
  const address = `${contact.emailUser}@${contact.emailDomain}`;

  if (!hydrated) {
    return (
      <span className={className}>
        {contact.emailUser} [at] {contact.emailDomain}
      </span>
    );
  }

  return (
    <a className={className} href={`mailto:${address}`}>
      {address}
    </a>
  );
}
