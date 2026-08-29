# Deploying to Cloudflare Pages

Cloudflare Pages hosts the same static export as GitHub Pages, for free, and adds
two things GitHub Pages cannot:

- real security response headers (`public/_headers` — CSP, `X-Frame-Options`, …)
- privacy-friendly Web Analytics (no cookies, no consent banner)

Nothing in the repo needs to change to try it. GitHub Pages keeps working in
parallel.

## One-time setup (about 5 minutes, done in the browser)

1. Create a free account at <https://dash.cloudflare.com/sign-up>.
2. In the dashboard: **Compute (Workers & Pages)** → **Create** → **Pages** →
   **Connect to Git**.
3. Authorise Cloudflare to see GitHub, then pick **`adulsaa-q/adulsaa-q.github.io`**.
4. Build settings:
   | Field | Value |
   |---|---|
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Root directory | *(leave blank)* |
   | Environment variable | `NODE_VERSION` = `22` |
5. **Save and Deploy.** After ~2 minutes the site is live at
   `https://adulsaa-q.pages.dev` (or a name you choose in **Settings → Build**).

Every push to `main` now deploys to both GitHub Pages and Cloudflare Pages.

## Verify the headers

```bash
curl -sI https://adulsaa-q.pages.dev/ | grep -iE 'content-security-policy|x-frame-options|referrer-policy'
```

All three should appear. (On `adulsaa-q.github.io` they will not — that is expected.)

## Turn on Web Analytics (optional, when you want it)

1. Dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site** →
   pick the Pages project. Cloudflare injects the beacon automatically for
   `*.pages.dev` — no code change.
2. If you later use a custom domain not proxied by Cloudflare, it gives you a
   `<script>` snippet; add it in `src/app/layout.tsx` and extend the CSP in
   `public/_headers` per the comment at the top of that file.

## Which URL is "the" site?

Decide once and keep it consistent:

- **Keep `adulsaa-q.github.io` as the public URL** and treat `*.pages.dev` as a
  staging/preview with headers — no code change needed. Simplest.
- **Switch to `*.pages.dev`** — update `defaultSiteUrl` in `src/lib/site-url.ts`,
  rebuild (canonical tags, OG URLs and the sitemap follow automatically), and
  update the GitHub, Fastwork and `sameAs` links to point at the new URL.
- **Custom domain later** — add it in Cloudflare Pages → **Custom domains**,
  point DNS, then update `defaultSiteUrl`. Enable DNSSEC + registrar lock.

Until you decide, everything stays pointed at `adulsaa-q.github.io`.
