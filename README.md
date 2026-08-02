# rappde.com — Demien Rapp

Personal site for Demien Rapp. Strictly monochrome and **light** (paper-white
field, deep-black ink), brutalist-but-polished, bilingual (EN default / DE).
The identity is carried by huge type + a typo-mix (Bricolage Grotesque with a
hard Silkscreen pixel break — "error as material" as type), a single inverted
black accent block (contact), and a secondary black-and-white displacement
glitch. Built to be the clean top result for his name and project names, and
to invite people to get in touch.

Built from [`REDESIGN-BRIEF.md`](./REDESIGN-BRIEF.md) — read that for the full
intent behind every decision.

---

## Stack

- **React 18 + Vite + TypeScript**
- **vite-react-ssg** — static pre-rendering, so crawlers and social cards get
  full HTML (not an empty React shell). Each route is a real `.html` file.
- **Self-hosted fonts** via Fontsource (Bricolage Grotesque, Inter, JetBrains
  Mono) — OFL, bundled, **never** the Google CDN (DSGVO-friendly + faster).
- **GitHub Pages** hosting via GitHub Actions, custom domain `rappde.com`.
- No tracking, no cookies → no cookie banner needed.

## Routes

| Path           | Content                          |
| -------------- | -------------------------------- |
| `/`            | Home — English (default)         |
| `/de`          | Home — German                    |
| `/impressum`   | Impressum (German, legal)        |
| `/datenschutz` | Datenschutzerklärung (German)    |

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:5173)
npm run build      # static pre-render → ./dist
npm run preview    # serve the built ./dist locally
npm run typecheck  # TypeScript check
npm run gen:assets # regenerate favicon + OG image from the glitch monogram
```

## Where the content lives

All copy is **raw material** — edit it freely; it's meant to be rewritten.

- `src/content/content.en.ts` — English copy
- `src/content/content.de.ts` — German copy (the Soundwalk text is the original 1:1)
- `src/content/legal.ts` — Impressum & Datenschutz (German draft)
- `src/content/types.ts` — the shape of the content (so edits stay type-safe)

The news ticker, the seven works, the tools and all links are plain arrays in
those files — add or remove entries without touching components.

---

## Deploying to GitHub Pages (one-time setup)

1. **Create the repo and push** (any repo name works with a custom domain):

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/rappde/<repo>.git
   git push -u origin main
   ```

2. **Enable Pages:** GitHub → repo → **Settings → Pages → Build and
   deployment → Source: GitHub Actions**. The workflow in
   `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

3. **Custom domain DNS** (at your DNS provider, access is available):
   - Apex `rappde.com` → four **A** records to GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (and optionally the same four as **AAAA**/IPv6:
     `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`)
   - `www` → **CNAME** to `<user>.github.io`
   - The repo already contains `public/CNAME` (= `rappde.com`), and Vite `base`
     is `/`, so the custom domain works out of the box.

4. In **Settings → Pages**, set the custom domain to `rappde.com` and tick
   **Enforce HTTPS** once the certificate is issued.

> If you ever host under a project path instead of a custom domain, change
> `base` in `vite.config.ts` to `/<repo>/`.

---

## Status

Done: address, portfolio PDF (`public/mappe-demien-rapp.pdf`), OG image (real
`mine` photo → `public/og-image.jpg`), tool live-demo links, real photos for
every past work, Google Search Console tag + full `sitemap.xml`, `llms.txt`,
`security.txt`, CSP, browser-language auto-redirect.

Still needs Demien (nothing blocks launch):

1. **Trailer videos** — Soirée de Brioche + 2491 to YouTube/Vimeo, then wire
   click-to-load (DSGVO). Real media slots into the aspect-ratio boxes, no shift.
2. **Portrait** — a photo of Demien with a better crop, if wanted (the hero is
   type-only for now).
3. **Uncut Award 2026** — a real image once the event happens (placeholder now).
4. **Analytics** — optional cookie-free counter (GoatCounter / Plausible), no
   banner needed. Decision pending.
5. **Google Search Console** — click *Verify*, then submit `sitemap.xml`.

---

## Accessibility & performance notes

- One `<h1>`, real heading hierarchy, semantic landmarks, skip link.
- Visible keyboard focus; the glitch and all motion respect
  `prefers-reduced-motion`; scroll-reveal degrades gracefully without JS.
- Fonts use `font-display: swap`; images/placeholders are lazy by design.
- The glitch is CSS-transform based (a load/hover accent, not a JS loop).
