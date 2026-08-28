import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { canonicalUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/work",
    ...projects.map(({ slug }) => `/work/${slug}`),
    "/archive",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({ url: canonicalUrl(route) }));
}
