import { Link } from 'react-router-dom'
import type { Lang } from '@/content/types'
import { content } from '@/content'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { MediaPlaceholder } from '@/components/MediaPlaceholder'
import { WorkSeo } from '@/components/WorkSeo'
import NotFound from './NotFound'

export default function WorkPage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = content[lang]
  const work = c.works.items.find((w) => w.slug === slug)
  if (!work) return <NotFound />

  const base = lang === 'en' ? '' : '/de'
  const homeHref = lang === 'en' ? '/' : '/de'
  const others = c.works.items.filter((w) => w.featured && w.slug !== slug)

  return (
    <>
      <WorkSeo content={c} work={work} />
      <a className="skip-link" href="#main">
        {c.nav.skip}
      </a>
      <Nav content={c} />

      <main id="main" className="workpage container">
        <Link className="workpage__back" to={`${homeHref}#work`}>
          ← {c.workPage.back}
        </Link>

        <header className="workpage__head">
          <div className="workpage__head-top">
            {work.status && <span className="featured__status">{work.statusLabel}</span>}
            <span className="meta">{work.date}</span>
          </div>
          <h1 className="workpage__title">{work.title}</h1>
          <p className="meta workpage__meta-line">
            {work.role} · {work.medium} · {work.place}
          </p>
        </header>

        <MediaPlaceholder media={work.media} className="workpage__media" />

        <div className="workpage__body">
          {work.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {work.note && <p className="work__note">{work.note}</p>}

          {work.pull && (
            <div className="work__pulls workpage__pulls">
              {work.pull.map((pull, i) => (
                <blockquote className="work__pull" key={i}>
                  <span className="work__pull-label">{pull.label}</span>
                  <p className="work__pull-text">{pull.text}</p>
                </blockquote>
              ))}
            </div>
          )}

          {work.links && (
            <div className="work__links">
              {work.links.map((link) => (
                <a
                  className="work__link"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {others.length > 0 && (
          <nav className="workpage__more" aria-label={c.workPage.more}>
            <p className="eyebrow">{c.workPage.more}</p>
            <ul className="workpage__more-list">
              {others.map((other) => (
                <li key={other.id}>
                  <Link to={`${base}/works/${other.slug}`}>
                    {other.title}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>

      <Footer content={c} />
    </>
  )
}
