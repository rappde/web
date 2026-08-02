import { Link } from 'react-router-dom'
import type { Content } from '@/content/types'
import { useScrolled } from '@/hooks/useScrolled'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cx } from '@/lib/cx'

export function Nav({
  content,
  onHome = false,
  enHref,
  deHref,
}: {
  content: Content
  onHome?: boolean
  /** language-switch targets; default is the home pair (used e.g. by /mosh_unit) */
  enHref?: string
  deHref?: string
}) {
  const scrolled = useScrolled()
  const { nav } = content
  // On the home page nav targets are in-page hashes; on sub-pages they point
  // back to the home route so the name and section links always return there.
  const to = (hash: string) => (onHome ? `#${hash}` : `${content.path}#${hash}`)
  // About is a real route, not a home section — spliced in after "Work".
  const aboutHref = content.lang === 'de' ? '/de/about' : '/about'
  const aboutLabel = content.lang === 'de' ? 'Über mich' : 'About'

  return (
    <header className={cx('nav', scrolled && 'is-scrolled')}>
      <a className="nav__brand" href={to('top')}>
        Demien Rapp
      </a>

      <nav className="nav__links" aria-label={content.lang === 'de' ? 'Bereiche' : 'Sections'}>
        {nav.links.flatMap((link) => {
          const el = (
            <a key={link.id} href={to(link.id)}>
              {link.label}
            </a>
          )
          if (link.id !== 'work') return [el]
          return [el, <Link key="about" to={aboutHref}>{aboutLabel}</Link>]
        })}
      </nav>

      <div className="nav__right">
        <LanguageSwitcher lang={content.lang} enHref={enHref} deHref={deHref} />
        <a className="btn btn--primary" href={to('contact')}>
          {nav.cta}
        </a>
      </div>
    </header>
  )
}
