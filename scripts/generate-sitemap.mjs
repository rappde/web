/* Generates public/sitemap.xml with REAL <lastmod> dates instead of hardcoded
   ones. Runs automatically before every build via the `prebuild` npm script,
   so new routes/content ship with correct dates without hand-editing.

   lastmod = the last git commit date of each page's representative source file
   (falls back to the file's mtime when it is not yet committed). Add new
   indexable pages to the `pages` array below; legal pages and 404 are noindex
   and deliberately stay out (see AI_CONTEXT.md).

   EN-only pages (the datamoshing hub) omit `de`; x-default always points EN. */

import { execSync } from 'node:child_process'
import { statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const SITE = 'https://rappde.com'

// Mirrors the FEATURED array in src/routes.tsx (kept in sync by hand — small list).
const FEATURED = ['mine', 'gefuehle', 'ein-viertel', 'soundwalk']

// `source` = the content file whose last change is this page's real lastmod.
const pages = [
  { loc: '/', source: 'src/content/content.en.ts', en: '/', de: '/de' },
  { loc: '/de', source: 'src/content/content.de.ts', en: '/', de: '/de' },
  { loc: '/mosh_unit', source: 'src/content/mosh-unit.ts', en: '/mosh_unit', de: '/de/mosh_unit' },
  { loc: '/de/mosh_unit', source: 'src/content/mosh-unit.ts', en: '/mosh_unit', de: '/de/mosh_unit' },
  { loc: '/about', source: 'src/content/about.ts', en: '/about', de: '/de/about' },
  { loc: '/de/about', source: 'src/content/about.ts', en: '/about', de: '/de/about' },
  ...FEATURED.flatMap((slug) => [
    { loc: `/works/${slug}`, source: 'src/content/content.en.ts', en: `/works/${slug}`, de: `/de/works/${slug}` },
    { loc: `/de/works/${slug}`, source: 'src/content/content.de.ts', en: `/works/${slug}`, de: `/de/works/${slug}` },
  ]),
  // Datamoshing hub (EN-only, no /de twins).
  { loc: '/datamoshing', source: 'src/content/datamoshing.ts', en: '/datamoshing' },
  { loc: '/how-to-datamosh', source: 'src/content/datamoshing.ts', en: '/how-to-datamosh' },
  { loc: '/datamoshing-tools', source: 'src/content/datamoshing.ts', en: '/datamoshing-tools' },
]

function lastmod(file) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, {
      cwd: root,
      stdio: ['pipe', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    if (d) return d
  } catch {
    /* not in git / git unavailable — fall through to mtime */
  }
  try {
    return new Date(statSync(join(root, file)).mtime).toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

function urlEntry(p) {
  const alts = []
  if (p.en) alts.push(`    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${p.en}"/>`)
  if (p.de) alts.push(`    <xhtml:link rel="alternate" hreflang="de" href="${SITE}${p.de}"/>`)
  alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p.en ?? p.loc}"/>`)
  return ['  <url>', `    <loc>${SITE}${p.loc}</loc>`, `    <lastmod>${lastmod(p.source)}</lastmod>`, ...alts, '  </url>'].join('\n')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(urlEntry).join('\n')}
</urlset>
`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(`generate-sitemap: wrote public/sitemap.xml (${pages.length} URLs)`)
