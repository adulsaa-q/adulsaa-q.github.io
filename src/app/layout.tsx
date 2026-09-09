import "./fonts.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { socialImage } from "@/lib/metadata";
import { canonicalUrl } from "@/lib/site-url";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl("/")),
  title: {
    default: "Adul Sa-a / Q — Data, BI & Automation",
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
  authors: [{ name: "Adul Sa-a" }],
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    title: "Adul Sa-a / Q — Data, BI & Automation",
    description:
      "Power BI reporting, SQL models, and automation — with source code and real project artifacts.",
    type: "website",
    url: canonicalUrl("/"),
    siteName: "Adul Sa-a / Q — Data, BI & Automation",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adul Sa-a / Q — Data, BI & Automation",
    description:
      "Power BI reporting, SQL models, and automation — with source code and real project artifacts.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var t=null;try{t=localStorage.getItem('q-theme')}catch(_){}if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;})();",
          }}
        />
      </head>
      <body>
        {/* Forward the legacy github.io host to the canonical Cloudflare origin. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.hostname==='adulsaa-q.github.io')location.replace('https://adulsaa-q.pages.dev'+location.pathname+location.search+location.hash);",
          }}
        />
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
