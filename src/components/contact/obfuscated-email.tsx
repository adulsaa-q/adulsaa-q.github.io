import { contactEmail } from "@/content/contact";

/** Kept under the existing export name for callers; email works without JavaScript. */
export function ObfuscatedEmail({ className }: { className?: string }) {
  return <a className={className} href={`mailto:${contactEmail}`}>{contactEmail}</a>;
}
