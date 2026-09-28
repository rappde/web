/* Writes public/sitemap.xml, runs as `prebuild`. lastmod is the last commit
   date of each page's source file (mtime if not committed yet).
   Legal pages and 404 are noindex and stay out. */

import { execSync } from 'node:child_process'
import { statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const SITE = 'https://rappde.com'


// `source`: the file that decides lastmod
const pages = [
  { loc: '/', source: 'src/content/home.ts', en: '/', de: '/de' },
  { loc: '/de', source: 'src/content/home.ts', en: '/', de: '/de' },
  { loc: '/tools', source: 'src/pages/Tools.tsx', en: '/tools' },
  { loc: '/mosh_unit', source: 'src/content/mosh-unit.ts', en: '/mosh_unit', de: '/de/mosh_unit' },
  { loc: '/de/mosh_unit', source: 'src/content/mosh-unit.ts', en: '/mosh_unit', de: '/de/mosh_unit' },
  // EN only
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
    /* not committed yet, use mtime */
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
