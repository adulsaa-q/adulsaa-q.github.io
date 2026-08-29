# Cloudflare Pages

**Status: live.** The site deploys to Cloudflare Pages and GitHub Pages on every
push to `main`.

| URL | Security headers | Notes |
|---|---|---|
| <https://adulsaa-q.pages.dev> | yes (`public/_headers`) | Cloudflare Pages, project `adulsaa-q` |
| <https://adulsaa-q.github.io> | no (platform limit) | GitHub Pages, unchanged |

Canonical tags, OG URLs and the sitemap still point at `adulsaa-q.github.io`
(`defaultSiteUrl` in `src/lib/site-url.ts`). Change that string if you want
`pages.dev` or a custom domain to become the public URL.

## How the deploy works

`.github/workflows/deploy-pages.yml` → `build` job → after `npm run build` and
`check:links`, a step runs:

```
npx wrangler@4 pages deploy out --project-name=adulsaa-q --branch=main
```

Auth comes from two repo secrets (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — scoped to **Account → Cloudflare Pages → Edit** only
- `CLOUDFLARE_ACCOUNT_ID`

## Verify the headers

```bash
curl -sI https://adulsaa-q.pages.dev/ | grep -iE 'content-security-policy|x-frame-options|referrer-policy|permissions-policy'
```

## Rotating the API token

1. <https://dash.cloudflare.com/profile/api-tokens> → roll or delete the token.
2. Create a replacement with the same **Cloudflare Pages: Edit** scope.
3. `gh secret set CLOUDFLARE_API_TOKEN --repo adulsaa-q/adulsaa-q.github.io`
   (paste the new value), or update it in the GitHub UI.

## Web Analytics (optional — not enabled)

Cloudflare dashboard → **Analytics & Logs → Web Analytics → Add a site** → pick
the `adulsaa-q` Pages project. Cloudflare injects the beacon automatically for
`*.pages.dev` — no code change, no cookies, no consent banner. It only reports
traffic to the `pages.dev` URL, not `github.io`.

## Custom domain (optional — not set up)

Cloudflare Pages → project `adulsaa-q` → **Custom domains** → add the domain and
follow the DNS steps. Then set `defaultSiteUrl` to the new origin, rebuild, and
update the GitHub / Fastwork / `sameAs` links. Enable DNSSEC + registrar lock.
