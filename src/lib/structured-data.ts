import { identity } from "@/content/identity";
import { canonicalUrl } from "@/lib/site-url";
import type { Project } from "@/types/project";

type JsonLdObject = Record<string, unknown>;

export function personSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: identity.jobTitle,
    url: identity.url,
    sameAs: [...identity.sameAs],
    knowsAbout: [...identity.knowsAbout],
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity.siteName,
    url: identity.url,
    inLanguage: ["th-TH", "en"],
    author: { "@type": "Person", name: identity.name, url: identity.url },
  };
}

export function creativeWorkSchema(project: Project): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.displayTitle,
    description: project.summary,
    url: canonicalUrl(`/work/${project.slug}`),
    inLanguage: ["th-TH", "en"],
    keywords: project.stack.join(", "),
    about: project.services,
    codeRepository: project.repository,
    creator: { "@type": "Person", name: identity.name, url: identity.url },
    isAccessibleForFree: true,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}
