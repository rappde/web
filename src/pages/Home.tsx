import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import type { Lang } from '@/content/types'
import { home, type HomeContent, type HomeWork, type HomePara } from '@/content/home'
import { MoreMenu, SiteFooter, keepScroll } from '@/components/Shell'

/* Startseite, EN unter "/" und DE unter "/de". Inhalte in content/home.ts. */

function Para({ p }: { p: HomePara }) {
  if (!p.lead) return <>{p.text}</>
  return (
    <>
      <em>{p.lead}</em>
      {p.break ? <br /> : ' '}
      {p.text}
    </>
  )
}

/* Ohne JS geht der Link auf das erste Werk. Mit JS auf ein zufaelliges. */
function surprise(e: MouseEvent, works: HomeWork[]) {
  e.preventDefault()
  location.hash = works[Math.floor(Math.random() * works.length)].id
}

function WorkPanel({ work, start, c }: { work: HomeWork; start: boolean; c: HomeContent }) {
  const cls = ['win', 'panel', start && 'start', work.gallery && 'wide'].filter(Boolean).join(' ')
  return (
    <article className={cls} id={work.id}>
      <h3 className="vh">{work.heading}</h3>
      <div className="winbody">
        <div className="workRow">
          <div className="workText">
            <p className="meta">{work.meta}</p>
            {work.desc.map((d, i) => (
              <p className="desc" key={i}>
                <Para p={d} />
              </p>
            ))}
            {work.page && (
              <p className="hint">
                <Link to={`${c.lang === 'de' ? '/de' : ''}/works/${work.page}`}>{c.fullPage}</Link>
              </p>
            )}
          </div>
          {work.image && (
            <div className="workMedia">
              <img src={work.image.src} alt={work.image.alt} loading="lazy" />
            </div>
          )}
          {work.placeholder && (
            <div className="workMedia">
              <span>{work.placeholder}</span>
            </div>
          )}
        </div>
        {work.gallery && (
          <div className="gallery">
            {work.gallery.map((g) => (
              <figure className={g.full ? 'full' : undefined} key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Home({ lang = 'en' }: { lang?: Lang }) {
  const c = home[lang]
  const de = lang === 'de'

  return (
    <div className="home">
      <Seo c={c} />
      <a className="skip" href="#viewer">
        {c.skip}
      </a>

      <div className="intro">
        <h1>Demien Rapp</h1>

        <div className="introText">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="qrCell">
          <a className="qr" href="/images/demien-portrait.jpg" target="_blank" rel="noopener" aria-label={c.qrLabel}>
            <img src="/images/qr-code.png" alt={c.qrAlt} loading="lazy" />
          </a>
        </div>
      </div>

      <nav aria-label={c.profilesLabel}>
        <ul className="socials">
          <li><a href="https://github.com/rappde" target="_blank" rel="me noopener">GitHub</a></li>
          <li><a href="https://www.youtube.com/@demienrapp" target="_blank" rel="me noopener">YouTube</a></li>
          <li><a href="https://www.linkedin.com/in/demien-rapp-983b8a1ab/" target="_blank" rel="me noopener">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/rappde_" target="_blank" rel="me noopener">Instagram</a></li>
        </ul>
      </nav>

      <div className="layout">
        <nav className="win taskbar" aria-label={c.worksLabel} onClick={keepScroll}>
          <h2 className="vh">{c.worksLabel}</h2>
          <div className="winbody">
            <ul>
              {c.works.map((w) => (
                <li key={w.id}>
                  <a href={`#${w.id}`}>{w.label}</a>
                </li>
              ))}
            </ul>

            <div className="foot">
              <ul>
                <li><Link to="/tools">Tools</Link></li>
                <li><Link to={de ? '/de/mosh_unit' : '/mosh_unit'}>MOSH_UNIT</Link></li>
                <li><Link to={de ? '/de/about' : '/about'}>{c.about}</Link></li>
              </ul>
              <MoreMenu />
              {/* Kein automatisches Umleiten nach Browsersprache (Google raet
                  davon ab), stattdessen ein sichtbarer Umschalter. */}
              <p className="lang" role="group" aria-label="Language / Sprache">
                <Link to="/" hrefLang="en" aria-current={de ? undefined : 'page'}>EN</Link>
                <Link to="/de" hrefLang="de" aria-current={de ? 'page' : undefined}>DE</Link>
              </p>
            </div>
          </div>
        </nav>

        <div className="viewer" id="viewer">
          {c.works.map((w, i) => (
            <WorkPanel work={w} start={i === 0} c={c} key={w.id} />
          ))}
        </div>
      </div>

      <SiteFooter>
        <a id="surprise" href="#mine" onClick={(e) => surprise(e, c.works)}>
          {c.surprise}
        </a>
      </SiteFooter>
    </div>
  )
}
