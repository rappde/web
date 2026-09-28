import { Fragment } from 'react'
import type { GeoPageContent, GeoBlock, GeoLink } from '@/content/datamoshing'
import { Shell, SmartLink } from './Shell'
import { GeoSeo } from './GeoSeo'

function LinkList({ links }: { links: GeoLink[] }) {
  return (
    <ul className="links">
      {links.map((link) => (
        <li key={link.href}>
          <SmartLink href={link.href}>
            {link.label}
            <span aria-hidden="true"> {link.href.startsWith('/') ? '→' : '↗'}</span>
          </SmartLink>
          <span className="note">{link.note}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ block }: { block: GeoBlock }) {
  switch (block.kind) {
    case 'p':
      return <p>{block.text}</p>
    case 'list':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol className="steps">
          {block.steps.map((step, i) => (
            <li key={i}>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      )
    case 'links':
      return <LinkList links={block.links} />
    case 'table':
      return (
        <div className="tablewrap">
          <table>
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
  const last = page.breadcrumb.length - 1

  return (
    <>
      <GeoSeo content={page} />
      <Shell
        title={
          <nav aria-label="Breadcrumb">
            {page.breadcrumb.map((b, i) => (
              <Fragment key={b.path}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {i === last ? <span aria-current="page">{b.name}</span> : <SmartLink href={b.path}>{b.name}</SmartLink>}
              </Fragment>
            ))}
          </nav>
        }
        groups={[
          {
            kind: page.eyebrow,
            links: [
              ...page.sections.map((s) => ({ href: `#${s.id}`, label: s.heading })),
              ...(page.faq ? [{ href: '#faq', label: 'Questions' }] : []),
            ],
          },
        ]}
      >
        <article>
          <h1>{page.h1}</h1>
          <p className="lede">{page.tldr}</p>
          <p className="meta">Last updated: {page.updatedLabel}</p>

          {page.sections.map((section) => (
            <section id={section.id} key={section.id} aria-labelledby={`${section.id}-h`}>
              <h2 id={`${section.id}-h`}>{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <Block block={block} key={i} />
              ))}
            </section>
          ))}

          {page.faq && (
            <section id="faq" aria-labelledby="faq-h">
              <h2 id="faq-h">Questions</h2>
              <dl className="faq">
                {page.faq.map((item, i) => (
                  <Fragment key={i}>
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                  </Fragment>
                ))}
              </dl>
            </section>
          )}

          <section aria-labelledby="related-h">
            <h2 id="related-h">Read next</h2>
            <LinkList links={page.related} />
          </section>
        </article>
      </Shell>
    </>
  )
}
