// Optional browser QA dependencies can live outside this repository.
// Q_AUDIT_TOOLS=/tmp/q-audit/node_modules node scripts/audit-site.mjs URL OUTPUT
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const lookup = { paths: [process.env.Q_AUDIT_TOOLS || process.cwd()] };
const engines = require(require.resolve("playwright", lookup));
const engine = process.env.Q_AUDIT_BROWSER || "chromium";
if (!["chromium", "firefox", "webkit"].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
const axePath = require.resolve("axe-core/axe.min.js", lookup);
const base = process.argv[2] || "http://localhost:4173";
const output = process.argv[3] || "/tmp/q-portfolio-audit";
await mkdir(output, { recursive: true });
const browser = await engines[engine].launch({
  headless: true,
  ...(engine === "chromium" && process.env.Q_AUDIT_CHROME ? { executablePath: process.env.Q_AUDIT_CHROME } : {}),
});
const page = await browser.newPage();
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const routes = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname))];
if (!routes.length) throw new Error("No routes discovered in sitemap");

const widths = [320, 360, 375, 390, 430, 768, 834, 1024, 1280, 1440, 1728, 1920];
const results = [];
const errors = [];
const failed = [];
page.on("pageerror", error => errors.push(error.message));
page.on("response", response => {
  if (response.status() >= 400) failed.push({ url: response.url(), status: response.status() });
});
try {
  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    for (const route of routes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      const response = await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
      await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
        });
        return result.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) }));
      });
      const responsive = [];
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        responsive.push({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) });
      }
      results.push({ route, theme, status: response.status(), violations, responsive });
      if (route === "/") {
        for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844], ["landscape", 844, 390]]) {
          await page.setViewportSize({ width, height });
          await page.screenshot({ path: path.join(output, `${theme}-${label}.png`) });
        }
      }
    }
  }
  await writeFile(path.join(output, "browser.json"), JSON.stringify({ base, engine, browser: browser.version(), results, errors, failed }, null, 2));
  process.exitCode = errors.length || failed.length || results.some(result => result.violations.length || result.responsive.some(size => size.overflow)) ? 1 : 0;
  console.log(`${results.length} route/theme combinations checked; results: ${output}`);
} finally {
  await browser.close();
}
