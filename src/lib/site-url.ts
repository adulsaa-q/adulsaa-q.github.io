import { normalizeBasePath } from "@/lib/base-path";

export const defaultSiteUrl = "https://adulsaa-q.pages.dev";

interface CanonicalUrlOptions {
  siteUrl?: string;
  basePath?: string;
}

function normalizedRoute(path: string): string {
  const route = path.trim().replace(/^\/+|\/+$/g, "");

  if (!route) {
    return "";
  }

  return route.includes(".") ? route : `${route}/`;
}

export function canonicalUrl(
  path: string,
  options: CanonicalUrlOptions = {},
): string {
  const configuredUrl = new URL(
    options.siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  );
  const configuredPath = normalizeBasePath(configuredUrl.pathname);
  const basePath = normalizeBasePath(
    options.basePath ?? process.env.NEXT_PUBLIC_BASE_PATH,
  );
  const route = normalizedRoute(path);
  const pathname = `${configuredPath}${basePath}/${route}`.replace(/\/{2,}/g, "/");

  return new URL(pathname, configuredUrl.origin).toString();
}
