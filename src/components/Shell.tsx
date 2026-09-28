import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Lang = 'en' | 'de'

/** Eine Gruppe in der Taskbar: Kategorie klein, Links darunter. */
export interface NavGroup {
  kind: string
  links: { href: string; label: string }[]
}

const LABELS = {
  en: { site: 'Site', works: 'Works', skip: 'Skip to content' },
  de: { site: 'Seite', works: 'Arbeiten', skip: 'Zum Inhalt' },
} as const

function baseGroups(lang: Lang): NavGroup[] {
  const l = LABELS[lang]
  return [
    {
      kind: l.site,
      links: [
        { href: lang === 'de' ? '/de' : '/', label: l.works },
        { href: '/tools', label: 'Tools' },
      ],
    },
  ]
}

/* MOSH_UNIT und die Datamoshing-Artikel stehen im Footer, nicht in der Taskbar. */
const MORE = [
  { href: '/datamoshing', label: 'What is datamoshing?' },
  { href: '/how-to-datamosh', label: 'How to datamosh' },
  { href: '/datamoshing-tools', label: 'Datamoshing tools' },
]

/** Interne Pfade als Router-Link, Sprungmarken als Anker im selben Tab,
    alles andere oeffnet einen neuen Tab. */
export function SmartLink({
  href,
  className,
  current,
  children,
}: {
  href: string
  className?: string
  /** markiert den Link als aktuelle Seite (invertiert in der Taskbar) */
  current?: boolean
  children: ReactNode
}) {
  if (href.startsWith('/')) {
    return (
      <Link className={className} to={href} aria-current={current ? 'page' : undefined}>
        {children}
      </Link>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

/* Ankerklick ohne Springen: Hash setzen (fuer :target), Scrollposition halten. */
export function keepScroll(e: MouseEvent) {
  const link = (e.target as HTMLElement).closest('a[href^="#"]')
  if (!link) return
  e.preventDefault()
  const y = window.scrollY
  location.hash = link.getAttribute('href') as string
  window.scrollTo(0, y)
  // Manche Browser springen erst nach dem naechsten Frame zum Anker.
  requestAnimationFrame(() => window.scrollTo(0, y))
}

function Group({ group, here }: { group: NavGroup; here: string }) {
  return (
    <div>
      <p className="kind">{group.kind}</p>
      <ul>
        {group.links.map((link) => (
          <li key={link.href}>
            <SmartLink href={link.href} current={link.href === here}>
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Fusszeile, auf jeder Seite gleich. children landen rechts daneben. */
export function SiteFooter({ lang = 'en', children }: { lang?: Lang; children?: ReactNode }) {
  // Tools nur am Handy: dort gibt es keine Taskbar, am Desktop steht es schon dort.
  const links = [
    { href: '/tools', label: 'Tools', mobileOnly: true },
    { href: lang === 'de' ? '/de/mosh_unit' : '/mosh_unit', label: 'MOSH_UNIT' },
    ...MORE,
  ]
  return (
    <footer>
      <p>
        <strong>Demien Rapp</strong> · <a href="mailto:demien.rp@gmail.com">demien.rp@gmail.com</a> ·{' '}
        <Link to="/impressum">Impressum</Link> · <Link to="/datenschutz">Datenschutzerklärung</Link>
      </p>
      {/* hinter "+ More", steht aber trotzdem im HTML */}
      <details className="footMore">
        <summary>{lang === 'de' ? 'Mehr' : 'More'}</summary>
        <span>
          {links.map((m, i) => (
            // Trenner hinter dem Handy-Eintrag, sonst bleibt am Desktop vorne ein " · "
            <span key={m.href} className={'mobileOnly' in m ? 'onlyMobile' : undefined}>
              {i > 1 && ' · '}
              <Link to={m.href}>{m.label}</Link>
              {'mobileOnly' in m && ' · '}
            </span>
          ))}
        </span>
      </details>
      {children}
    </footer>
  )
}

/** Rahmen fuer die Unterseiten. `groups` kommt unter die festen Gruppen. */
export function Shell({
  lang = 'en',
  title,
  groups = [],
  children,
}: {
  lang?: Lang
  /** Titelzeile des rechten Fensters */
  title: ReactNode
  groups?: NavGroup[]
  children: ReactNode
}) {
  const { pathname } = useLocation()
  const here = pathname.replace(/\/$/, '') || '/'
  const l = LABELS[lang]

  return (
    <div className="page">
      <a className="skip" href="#main">
        {l.skip}
      </a>

      <div className="layout">
        <nav className="win taskbar" aria-label={l.site}>
          <p className="winbar">
            <Link to={lang === 'de' ? '/de' : '/'}>Demien Rapp</Link>
          </p>
          <div className="winbody">
            {baseGroups(lang).map((g) => (
              <Group group={g} here={here} key={g.kind} />
            ))}


            {groups.map((g) => (
              <Group group={g} here={here} key={g.kind} />
            ))}

          </div>
        </nav>

        <main className="win doc" id="main">
          <div className="winbar">{title}</div>
          <div className="winbody">{children}</div>
        </main>
      </div>

      <SiteFooter lang={lang} />
    </div>
  )
}
