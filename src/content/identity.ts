import { canonicalUrl, defaultSiteUrl } from "@/lib/site-url";

/**
 * Factual identity constants used for machine-readable metadata (JSON-LD).
 * Everything here must be independently verifiable. No employer, client,
 * outcome, rating or credential claim belongs in this file.
 */
export const identity = {
  name: "Q",
  jobTitle: "Data, BI and automation systems",
  url: canonicalUrl("/"),
  siteName: "Q — Data, BI & Automation Systems",
  siteUrl: defaultSiteUrl,
  sameAs: ["https://github.com/adulsaa-q"],
  knowsAbout: [
    "Business intelligence",
    "Power BI",
    "Power Query",
    "DAX",
    "SQL",
    "PostgreSQL",
    "Data pipelines",
    "ETL",
    "Python",
    "Workflow automation",
    "Dimensional modeling",
  ],
} as const;
