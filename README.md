# Q Portfolio

Evidence-led portfolio for Q / Data, BI & Automation Systems.

Live site: <https://adulsaa-q.pages.dev/>

The site presents public GitHub work as inspectable case studies. It uses explicit evidence classes, visible limitations, and synthetic or reconstructed labels where the public repositories do not prove live business outcomes.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Verification

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The build creates a static export in `out/`. The production workflow runs the same checks before deploying to GitHub Pages.

## Static deployment

Deployment is configured in `.github/workflows/deploy-pages.yml` and publishes the `out/` export to the root GitHub Pages site.

For a project-page preview, set an optional build-time base path:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

The default root deployment does not use a base path. Images are intentionally unoptimized so the static export works on GitHub Pages.

## Content model

Project records live in `src/content/projects.ts`. Build-time validation checks evidence classes, source URLs, repository links, limitations for simulated or experimental work, and accessible artifact text.

When adding a project:

- link every displayed evidence item to its public source;
- label simulated, experimental, reconstructed, or README-reported material honestly;
- include alt text and captions for public artifacts;
- do not add client results, live integrations, credentials, personal data, or security claims that the source cannot prove;
- keep the Fastwork URL as a placeholder until an approved profile URL is available.

## Brand and accessibility

The Orbit Q mark is implemented as SVG in the header and `src/app/icon.svg`. The site uses local IBM Plex fonts, keyboard-visible focus states, a keyboard-accessible mobile menu, reduced-motion handling, and a focusable skip-link target.

## Routes

- `/` curated homepage
- `/work/` full project index
- `/work/[slug]/` detailed case studies
- `/archive/` secondary and experimental work
- `/about/` working method, capabilities, and process
- `/contact/` approved contact routes and pending Fastwork placeholder
