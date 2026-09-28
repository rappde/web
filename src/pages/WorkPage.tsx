import type { Lang } from '@/content/types'
import { content } from '@/content'
import { Shell } from '@/components/Shell'
import { MediaPlaceholder } from '@/components/MediaPlaceholder'
import { WorkSeo } from '@/components/WorkSeo'
import NotFound from './NotFound'

export default function WorkPage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = content[lang]
  const work = c.works.items.find((w) => w.slug === slug)
  if (!work) return <NotFound />

  const base = lang === 'en' ? '' : '/de'
  const featured = c.works.items.filter((w) => w.featured)

  return (
    <>
      <WorkSeo content={c} work={work} />
      <Shell
        lang={lang}
        title={
          <>
            <a href={`${lang === 'de' ? '/de' : '/'}#${work.slug}`}>{c.workPage.back}</a> / {work.title}
          </>
        }
        groups={[
          {
            kind: c.workPage.more,
            links: featured.map((w) => ({ href: `${base}/works/${w.slug}`, label: w.title })),
          },
        ]}
      >
        <h1>{work.title}</h1>
        <p className="meta">
          {work.status && <>{work.statusLabel} · </>}
          {work.date} · {work.role} · {work.medium} · {work.place}
        </p>

        <MediaPlaceholder media={work.media} />

        {work.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        {work.note && <p className="hint">{work.note}</p>}

        {work.pull?.map((pull, i) => (
          <p key={i}>
            <em>{pull.label}</em>
            <br />
            {pull.text}
          </p>
        ))}

        {work.links && (
          <div className="actions">
            {work.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </Shell>
    </>
  )
}
