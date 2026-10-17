import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE_URL } from '@/components/Seo'

/** /manifest: standalone page, no Shell (no nav, no footer chrome). */
export default function Manifest() {
  const url = `${SITE_URL}/manifest`

  return (
    <>
      <Head>
        <html lang="en" />
        <title>RAPPDE MANIFEST</title>
        <meta name="description" content="A manifesto: cause before judgment, see how it works, beauty is made, not found." />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
      </Head>

      <main className="doc manifest">
        <div>
          <h1>RAPPDE MANIFEST</h1>
          <ol>
            <li>Everything is a machine. You are one of its causes.</li>
            <li>Look for the cause before you judge.</li>
            <li>If you can't see how it works, it works on you.</li>
            <li>Beauty is made, not found.</li>
            <li>Prove this wrong and it changes.</li>
            <li>Nobody has to like anything.</li>
          </ol>
          <p className="manifestHome"><Link to="/">rappde.com</Link></p>
        </div>
      </main>
    </>
  )
}
