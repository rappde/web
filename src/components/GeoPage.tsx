import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { content } from '@/content'
import type { GeoPageContent, GeoBlock, GeoLink } from '@/content/datamoshing'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { GeoSeo } from './GeoSeo'

/** Internal routes get react-router <Link>; external URLs get a plain anchor. */
function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    )
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function LinkList({ links }: { links: GeoLink[] }) {
  return (
    <ul className="geo-links">
      {links.map((link) => (
        <li key={link.href} className="geo-link">
          <SmartLink href={link.href} className="geo-link__title">
            {link.label}
            <span aria-hidden="true"> {link.href.startsWith('/') ? '→' : '↗'}</span>
          </SmartLink>
          <span className="geo-link__note">{link.note}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ block }: { block: GeoBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="geo-p">{block.text}</p>
    case 'list':
      return (
        <ul className="geo-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol className="geo-steps">
          {block.steps.map((step, i) => (
            <li className="geo-step" key={i}>
              <span className="geo-step__index meta">{i + 1}</span>
              <h3 className="geo-step__name">{step.name}</h3>
              <p className="geo-step__body">{step.text}</p>
            </li>
          ))}
        </ol>
      )
    case 'links':
      return <LinkList links={block.links} />
    case 'table':
      return (
        <div className="geo-tablewrap">
          <table className="geo-table">
            <thead>
              <tr>
                {block.table.head.map((h, i) => (
                  <th scope="col" key={i}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    block.table.rowHeader && c === 0 ? (
                      <th scope="row" key={c}>
                        {cell}
                      </th>
                    ) : (
                      <td key={c}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function GeoPage({ page }: { page: GeoPageContent }) {
  const site = content.en
  const last = page.breadcrumb.length - 1

  return (
    <>
      <GeoSeo content={page} />
      <a className="skip-link" href="#main">
        {site.nav.skip}
      </a>
      <Nav content={site} enHref={page.path} deHref="/de" />

      <main id="main" className="geo container">
        <article className="geo__article">
          <nav className="geo-breadcrumb meta" aria-label="Breadcrumb">
            {page.breadcrumb.map((b, i) => (
              <Fragment key={b.path}>
                {i > 0 && <span className="geo-breadcrumb__sep" aria-hidden="true">/</span>}
                {i === last ? (
                  <span aria-current="page">{b.name}</span>
                ) : (
                  <Link to={b.path}>{b.name}</Link>
                )}
              </Fragment>
            ))}
          </nav>

          <header className="geo__head">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="geo__title">{page.h1}</h1>
            <div className="geo-tldr">
              <span className="geo-tldr__label meta">TL;DR</span>
              <p className="geo-tldr__text">{page.tldr}</p>
            </div>
            <p className="geo__updated meta">Last updated: {page.updatedLabel}</p>
          </header>

          {page.sections.map((section) => (
            <section className="geo-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-h`}>
              <h2 className="geo-h2" id={`${section.id}-h`}>
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => (
                <Block block={block} key={i} />
              ))}
            </section>
          ))}

          {page.faq && (
            <section className="geo-section geo-faq" id="faq" aria-labelledby="faq-h">
              <h2 className="geo-h2" id="faq-h">
                Questions
              </h2>
              <dl className="geo-faq__list">
                {page.faq.map((item, i) => (
                  <div className="geo-faq__item" key={i}>
                    <dt className="geo-faq__q">{item.q}</dt>
                    <dd className="geo-faq__a">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="geo-section geo-related" aria-labelledby="related-h">
            <h2 className="geo-h2" id="related-h">
              Read next
            </h2>
            <LinkList links={page.related} />
          </section>
        </article>
      </main>

      <Footer content={site} />
    </>
  )
}
