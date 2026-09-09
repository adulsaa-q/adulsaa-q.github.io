# Reproduce this audit

Run from the repository root with Node 20+ (the recorded workstation used Node 26.7.0).

```sh
npm ci
npm run images:optimize
npm run build
npm run lint
npm run typecheck
npm test
npm run check:links
npm audit
python3 -m http.server 4173 --directory out
```

Browser QA dependencies are pinned separately from the application:

```sh
npm ci --prefix .github/qa
.github/qa/node_modules/.bin/playwright install --with-deps chromium firefox webkit
npm install --prefix /tmp/q-audit lighthouse
Q_AUDIT_TOOLS="$PWD/.github/qa/node_modules" \
Q_AUDIT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
node scripts/audit-site.mjs http://localhost:4173 /tmp/q-final-browser
```

On a supported host, omit `Q_AUDIT_CHROME` and set `Q_AUDIT_BROWSER` to `chromium`, `firefox` or `webkit`. Run `scripts/qa-interactions.mjs` with the same environment and URL/output arguments. The deployment workflow executes all three engines on Ubuntu and only publishes after they pass. macOS 13 cannot install the current Firefox/WebKit packages; CI provides that engine coverage. Playwright WebKit is not a physical iPhone or a branded Safari certification.

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
/tmp/q-audit/node_modules/.bin/lighthouse http://localhost:4173/ \
--chrome-flags='--headless' --output=json --output-path=/tmp/q-lighthouse.json
```

Run Lighthouse alone, not alongside builds or browser sweeps. Python's static server does not serve compressed text or interpret Cloudflare `_headers`; measure the preview deployment for release decisions. The audit additionally measured a temporary concurrent Node static server with gzip. Its score is not a directly comparable substitute for the live Cloudflare result.

`evidence/verification.json` records the lab snapshots, including the noisy runs, rather than selecting only the best score. `browser.json` holds the repeatable final route/theme/width sweep. `interactions.json` records the separate keyboard/touch/navigation assertions. `metadata.json` records titles, canonicals, JSON-LD, and image/fragment checks. Baseline source links and response headers are retained in the baseline capture.

CI browser results are in `ci-*.json`; the final release and its workflow URL are recorded in `verification.json`. The native Safari job uses the hosted macOS SafariDriver, following [Apple’s WebDriver setup](https://developer.apple.com/documentation/safari-developer-tools/macos-enabling-webdriver). A passing axe scan is not full accessibility conformance; coverage limits remain listed in AUDIT.md.
