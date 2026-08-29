// Subset to the scripts the site actually uses (Latin + Thai) and to the
// weights referenced in globals.css (400 / 600 / 700). Full multi-subset
// imports previously shipped ~55 font files; this ships ~13.
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-700.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-700.css";
import "@fontsource/ibm-plex-sans/latin-ext-400.css";
import "@fontsource/ibm-plex-sans-thai/thai-400.css";
import "@fontsource/ibm-plex-sans-thai/thai-600.css";
import "@fontsource/ibm-plex-sans-thai/thai-700.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { socialImage } from "@/lib/metadata";
import { canonicalUrl } from "@/lib/site-url";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl("/")),
  title: {
    default: "Q — Data, BI & Automation Systems",
    template: "%s — Q",
  },
  description:
    "Q turns messy operational data into inspectable systems people can use — งานข้อมูล BI และ automation ที่อธิบายระบบ หลักฐาน และข้อจำกัดอย่างตรงไปตรงมา",
  applicationName: "Q Portfolio",
  keywords: [
    "data systems",
    "business intelligence",
    "automation",
    "Power BI",
    "data pipeline",
    "ระบบข้อมูล",
  ],
  authors: [{ name: "Q" }],
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    title: "Q — Data, BI & Automation Systems",
    description:
      "Evidence-led work across operational data, BI reporting and automation systems.",
    type: "website",
    url: canonicalUrl("/"),
    siteName: "Q — Data, BI & Automation Systems",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Q — Data, BI & Automation Systems",
    description:
      "Evidence-led work across operational data, BI reporting and automation systems.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <p>Q / Data, BI &amp; Automation Systems</p>
          <p lang="en">Built as a static, evidence-led work record.</p>
        </footer>
      </body>
    </html>
  );
}
