import type { Metadata } from "next";

import { canonicalUrl } from "@/lib/site-url";

const socialImage = {
  url: canonicalUrl("/og/q-portfolio.png"),
  width: 1200,
  height: 630,
  alt: "Q — Data, BI and Automation Systems",
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Q — Data, BI & Automation Systems",
      locale: "th_TH",
      alternateLocale: ["en_US"],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export { socialImage };
