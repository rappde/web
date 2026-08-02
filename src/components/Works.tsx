import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Content, Work } from '@/content/types'
import { MediaPlaceholder } from './MediaPlaceholder'
import { useReveal } from '@/hooks/useReveal'
import { cx } from '@/lib/cx'

function workHref(content: Content, work: Work) {
  const base = content.lang === 'en' ? '' : '/de'
  return `${base}/works/${work.slug}`
}

/** Big featured block — links to its own route (§2c). */
function FeaturedBlock({
  work,
  content,
  flip,
}: {
  work: Work
  content: Content
  flip: boolean
}) {
  const { ref, visible } = useReveal<HTMLElement>()
  const href = workHref(content, work)

  return (
    <article
      ref={ref}
      className={cx('featured', flip && 'featured--flip', 'reveal', visible && 'is-visible')}
      aria-labelledby={`feat-${work.id}`}
    >
      <Link className="featured__media" to={href} tabIndex={-1} aria-hidden="true">
        <MediaPlaceholder media={work.media} />
      </Link>

      <div className="featured__text">
        {work.status && <span className="featured__status">{work.statusLabel}</span>}

        <h3 className="featured__title" id={`feat-${work.id}`}>
          <Link to={href}>{work.title}</Link>
        </h3>

        <div className="featured__meta meta">
          <span>{work.place}</span>
          <span>{work.year}</span>
        </div>

        <p className="featured__teaser">{work.teaser}</p>

        <Link className="featured__cta" to={href}>
          {content.works.viewLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

/** Compact, inline-expandable archive row (§2c). */
function ArchiveItem({ work }: { work: Work }) {
  const [open, setOpen] = useState(false)
  const panelId = `arch-${work.id}`

  return (
    <div className={cx('arch', open && 'is-open')}>
      <h3 className="arch__heading">
        <button
          type="button"
          className="arch__row"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="arch__year">{work.year}</span>
          <span className="arch__title">
            {work.title}
            {work.status && <span className="arch__status">{work.statusLabel}</span>}
          </span>
          <span className="arch__medium">{work.medium}</span>
          <span className="arch__place">{work.place}</span>
          <span className="arch__toggle" aria-hidden="true">
            {open ? '–' : '+'}
          </span>
        </button>
      </h3>

      <div className="arch__panel" id={panelId} hidden={!open}>
        <div className="arch__panel-inner">
          <div className="arch__text">
            {work.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {work.note && <p className="work__note">{work.note}</p>}
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
          <MediaPlaceholder media={work.media} className="arch__media" />
        </div>
      </div>
    </div>
  )
}

export function Works({ content }: { content: Content }) {
  const { works } = content
  const featured = works.items.filter((w) => w.featured)
  const archive = works.items.filter((w) => !w.featured)

  return (
    <section className="section container" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 className="section-title" id="work-title">
          {works.title}
        </h2>
      </div>

      <div className="featured-list">
        {featured.map((work, i) => (
          <FeaturedBlock key={work.id} work={work} content={content} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="archive">
        <p className="eyebrow archive__label">{works.archiveLabel}</p>
        <div className="archive__list">
          {archive.map((work) => (
            <ArchiveItem key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  )
}
