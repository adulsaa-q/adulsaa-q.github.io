// Internal-link check over the static export. No dependencies.
// Fails if any in-repo href/src in out/**/*.html does not resolve to a file.
import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const OUT = "out";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function resolves(ref) {
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return true;
  const path = join(OUT, decodeURIComponent(clean));
  if (extname(path)) return exists(path);
  // Route: Next writes either dir/index.html (trailingSlash) or path.html
  return (await exists(join(path, "index.html"))) || (await exists(`${path}.html`));
}

const htmlFiles = (await walk(OUT)).filter((f) => f.endsWith(".html"));
const attrRe = /(?:href|src)="(\/[^"]*)"/g;
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const refs = new Set([...html.matchAll(attrRe)].map((m) => m[1]));
  for (const ref of refs) {
    if (ref.startsWith("//")) continue; // protocol-relative / external
    if (!(await resolves(ref))) broken.push(`${file}  ->  ${ref}`);
  }
}

if (broken.length) {
  console.error(`Broken internal links (${broken.length}):`);
  for (const line of broken) console.error("  " + line);
  process.exit(1);
}

console.log(`check-links: ${htmlFiles.length} pages, no broken internal links.`);
