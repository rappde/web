import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import type { LegalDoc } from '@/content/legal'

/** Shared layout for the German legal pages (Impressum, Datenschutz). */
export function LegalLayout({ doc, metaTitle }: { doc: LegalDoc; metaTitle: string }) {
  return (
    <>
      <Head>
        <html lang="de" />
        <title>{metaTitle}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main id="main" className="legal container">
        <Link className="legal__back" to={doc.backHref}>
          ← {doc.backLabel}
        </Link>

        <h1 className="legal__title">{doc.title}</h1>
        <p className="legal__updated">{doc.updated}</p>

        {doc.blocks.map((block, i) => (
          <section className="legal__block" key={i}>
            {block.heading && <h2>{block.heading}</h2>}
            {block.pre && <pre className="legal__pre">{block.pre}</pre>}
            {block.paragraphs?.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
            {block.list && (
              <ul className="legal__list">
                {block.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </>
  )
}
