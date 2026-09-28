/* Meldet geaenderte Seiten per IndexNow (Bing, Yandex, Seznam, Naver, Yep).
   Laeuft nach dem Deploy (siehe .github/workflows/deploy.yml).

   Nur Seiten, deren <lastmod> in der Sitemap dem Datum des letzten Commits
   entspricht, also die, die sich mit diesem Push wirklich geaendert haben.
   Bing raet davon ab, bei jedem Deploy alle URLs zu schicken.

   Der Schluessel liegt als public/<KEY>.txt auf der Seite, damit IndexNow
   pruefen kann, dass die Meldung von der Domain selbst kommt. Er ist nicht
   geheim. Google nimmt an IndexNow nicht teil, dort reicht die Sitemap. */

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const HOST = 'rappde.com'
const KEY = '6bb508c2e3ed74eb897b3e0f7629b262'

const today = execSync('git log -1 --format=%cs').toString().trim()
const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter((m) => m[2] === today)
  .map((m) => m[1])

if (!urls.length) {
  console.log('IndexNow: keine geaenderten Seiten.')
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
})

console.log(`IndexNow: ${urls.length} URL(s), HTTP ${res.status}`)
urls.forEach((u) => console.log('  ' + u))
// 200/202 = angenommen. Alles andere nur melden, den Deploy nicht rot machen.
