import { Head } from 'vite-react-ssg'
import type { LegalDoc } from '@/content/legal'
import { Shell } from './Shell'

/** Shared layout for the German legal pages (Impressum, Datenschutz). */
export function LegalLayout({ doc, metaTitle }: { doc: LegalDoc; metaTitle: string }) {
  return (
    <>
      <Head>
        <html lang="de" />
        <title>{metaTitle}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Shell
        lang="de"
        title="Rechtliches"
        groups={[
          {
            kind: 'Rechtliches',
            links: [
              { href: '/impressum', label: 'Impressum' },
              { href: '/datenschutz', label: 'Datenschutz' },
            ],
          },
        ]}
      >
        <h1>{doc.title}</h1>
        <p className="meta">{doc.updated}</p>

        {doc.blocks.map((block, i) => (
          <section key={i}>
            {block.heading && <h2>{block.heading}</h2>}
            {block.pre && <pre>{block.pre}</pre>}
            {block.paragraphs?.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
            {block.list && (
              <ul>
                {block.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Shell>
    </>
  )
}
