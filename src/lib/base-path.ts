export function normalizeBasePath(value?: string): string {
  const trimmed = value?.trim();

  if (!trimmed || trimmed === "/") {
    return "";
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

export function withBasePath(
  path: string,
  configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("#")) {
    return path;
  }

  const basePath = normalizeBasePath(configuredBasePath);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
