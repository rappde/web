import { Link } from 'react-router-dom'
import type { Content } from '@/content/types'
import { Reveal } from './Reveal'

export function Tools({ content }: { content: Content }) {
  const { tools } = content

  return (
    <section className="section container" id="tools" aria-labelledby="tools-title">
      <div className="section-head">
        <div>
          <h2 className="section-title" id="tools-title">
            {tools.title}
          </h2>
        </div>
      </div>

      <div className="tools__grid">
        {tools.items.map((tool, i) => {
          const external = tool.href.startsWith('http')
          return (
            <Reveal key={tool.id} className="tool" delay={i * 80}>
              <h3 className="tool__name">{tool.name}</h3>
              <p className="tool__body">{tool.body}</p>
              <a
                className="tool__link"
                href={tool.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {tool.hrefLabel} {external ? '↗' : '→'}
              </a>
            </Reveal>
          )
        })}
      </div>

      <div className="tools__links">
        <Link className="tools__all" to={tools.guideHref}>
          {tools.guideLabel} →
        </Link>
        <a
          className="tools__all"
          href={tools.githubHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tools.githubLabel} ↗
        </a>
      </div>
    </section>
  )
}
