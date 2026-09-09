// Native Safari WebDriver on the hosted macOS runner; no Selenium dependency.
import { createRequire } from "node:module";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve("axe-core/axe.min.js", { paths: [process.env.Q_AUDIT_TOOLS || process.cwd()] }), "utf8");
const driver = "http://localhost:4444";
const base = process.argv[2] || "http://localhost:4173";
const output = process.argv[3] || "qa-safari";
await mkdir(output, { recursive: true });
async function command(endpoint, body, method = "POST") {
  const response = await fetch(driver + endpoint, { method, ...(body !== undefined ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}) });
  const { value } = await response.json();
  if (!response.ok || value?.error) throw new Error(JSON.stringify(value));
  return value;
}
const session = await command("/session", { capabilities: { alwaysMatch: { browserName: "safari" } } });
const prefix = `/session/${session.sessionId}`;
const execute = script => command(`${prefix}/execute/sync`, { script, args: [] });
const results = [], interactions = [];
try {
  await command(`${prefix}/timeouts`, { script: 60000, pageLoad: 60000 });
  const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
  const routes = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname))];
  assert(routes.length > 0);
  for (const theme of ["light", "dark"]) {
    for (const route of routes) {
      await command(`${prefix}/window/rect`, { width: 1440, height: 900 });
      await command(`${prefix}/url`, { url: new URL(route, base).href });
      await execute(`document.documentElement.dataset.theme=${JSON.stringify(theme)};`);
      // Wait for font layout and the authored 220ms theme transition before measuring contrast.
      await command(`${prefix}/execute/async`, { script: "const done = arguments[0]; document.fonts.ready.then(() => setTimeout(done, 350));", args: [] });
      await execute(axe);
      const violations = await command(`${prefix}/execute/async`, { script: 'const done = arguments[0]; axe.run(document, {runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]}}).then(result => done(result.violations.map(item => ({id:item.id,impact:item.impact,targets:item.nodes.map(node=>node.target),details:item.nodes.map(node=>node.failureSummary)})))).catch(error=>done([{error:String(error)}]));', args: [] });
      const responsive = [];
      for (const width of [390, 768, 1024, 1440]) {
        await command(`${prefix}/window/rect`, { width, height: 900 });
        responsive.push(await execute(`return {requestedWidth:${width},width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth}`));
      }
      results.push({ route, theme, violations, responsive });
      if (route === "/") {
        const screenshot = await command(`${prefix}/screenshot`, undefined, "GET");
        await writeFile(path.join(output, `${theme}-desktop.png`), Buffer.from(screenshot, "base64"));
      }
    }
  }
  await command(`${prefix}/url`, { url: new URL("/", base).href });
  await execute('document.querySelector(".zoomable-image").click()');
  assert.equal(await execute('return document.querySelectorAll("dialog[open]").length'), 1);
  await execute('document.querySelector("dialog[open] form button").click()');
  assert.equal(await execute('return document.querySelectorAll("dialog[open]").length'), 0);
  interactions.push("Native dialog open and close");
  assert(await execute('return !!document.querySelector(\'a[href="mailto:adulsaa.q@gmail.com"]\')'));
  interactions.push("Native email contact present");
  assert(!results.some(result => result.violations.length || result.responsive.some(size => size.overflow)));
} finally {
  await writeFile(path.join(output, "safari.json"), JSON.stringify({ base, capabilities: session.capabilities, results, interactions }, null, 2));
  await command(prefix, undefined, "DELETE");
}
console.log(`Native Safari: ${results.length} route/theme scans passed`);
