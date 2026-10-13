import { Head } from 'vite-react-ssg'
import { SITE_URL } from '@/components/Seo'

/** /manifest: standalone page, no Shell (no nav, no footer chrome). */
export default function Manifest() {
  const url = `${SITE_URL}/manifest`

  return (
    <>
      <Head>
        <html lang="en" />
        <title>RAPPDE MANIFEST</title>
        <meta name="description" content="A seven-point manifesto: cause before judgment, one standard for everyone, beauty that earns its place." />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
      </Head>

      <main className="doc manifest">
        <h1>RAPPDE MANIFEST</h1>
        <ol>
          <li>Everything is a machine. You are one of its causes.</li>
          <li>Look for the cause before you judge.</li>
          <li>Same principle for everyone.</li>
          <li>Beauty has to earn its place.</li>
          <li>Break the rules, not the people.</li>
          <li>Prove this wrong and it changes.</li>
          <li>Nobody has to like anything.</li>
        </ol>
        <footer>v1.0 — free to use under CC BY 4.0 — rappde.com</footer>
      </main>
    </>
  )
}
