import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import type { Lang } from '@/content/types'
import { home, type HomeContent, type HomeWork, type HomePara } from '@/content/home'
import { SiteFooter, keepScroll } from '@/components/Shell'

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


/* Am Handy sind die Werke eine frei wischbare Reihe (CSS: .viewer). Dieser
   Hook bewegt nur die duenne Leiste darunter mit, die zeigt, wie weit man
   gewischt hat. Sie ist reine Anzeige, man kann sie nicht bedienen. Die
   Galerie behaelt ihre Hoehe, damit beim Wischen nichts springt. Bei
   geteilten Links wie /#gefuehle rollt die Reihe zur passenden Karte.
   Am Desktop tut er nichts. */
const MOBILE = '(max-width: 767px)'

function useSwipeGallery(ref: RefObject<HTMLDivElement>, bar: RefObject<HTMLSpanElement>) {
  useEffect(() => {
    const viewer = ref.current
    if (!viewer || !matchMedia(MOBILE).matches) return

    if (location.hash) {
      const card = document.getElementById(location.hash.slice(1))
      if (card) viewer.scrollLeft = card.offsetLeft - viewer.offsetLeft
    }

    let frame = 0
    const move = () => {
      const thumb = bar.current
      if (!thumb) return
      const visible = viewer.clientWidth / viewer.scrollWidth
      const max = viewer.scrollWidth - viewer.clientWidth
      const progress = max > 0 ? viewer.scrollLeft / max : 0
      thumb.style.width = `${visible * 100}%`
      thumb.style.transform = `translateX(${progress * (1 / visible - 1) * 100}%)`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(move)
    }
    viewer.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    move()
    return () => {
      viewer.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ref, bar])
}

function WorkPanel({ work, start, c }: { work: HomeWork; start: boolean; c: HomeContent }) {
  const cls = ['win', 'panel', start && 'start', work.gallery && 'wide'].filter(Boolean).join(' ')
  return (
    <article className={cls} id={work.id}>
      <div className="winbody">
        <div className="workRow">
          <div className="workText">
            <h3 className="workTitle">
              {work.title} <span className="workYear">{work.year}</span>
            </h3>
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

  const viewer = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  useSwipeGallery(viewer, bar)

  return (
    <div className="home">
      <Seo c={c} />
      <a className="skip" href="#viewer">
        {c.skip}
      </a>

      {/* .screen ist genau eine Bildschirmhoehe (Desktop). Der Footer liegt
          darunter und taucht erst beim Runterscrollen auf. */}
      <div className="screen">
      {/* Links Text und Profil-Links, rechts der QR-Code. Er ist genau so hoch
          wie beides zusammen: Oberkante am Text, Unterkante an den Links. */}
      <div className="intro">
        <h1>Demien Rapp</h1>

        <div className="introText">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <nav aria-label={c.profilesLabel}>
            <ul className="socials">
              <li className="noMobile"><a href="https://github.com/rappde" target="_blank" rel="me noopener">GitHub</a></li>
              <li className="noMobile"><a href="https://www.youtube.com/@demienrapp" target="_blank" rel="me noopener">YouTube</a></li>
              <li><a href="https://www.linkedin.com/in/demien-rapp-983b8a1ab/" target="_blank" rel="me noopener">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/rappde_" target="_blank" rel="me noopener">Instagram</a></li>
              <li><a href="mailto:demien.rp@gmail.com">Mail</a></li>
            </ul>
          </nav>
        </div>

        <div className="qrCell">
          <a className="qr" href="/images/demien-portrait.jpg" target="_blank" rel="noopener" aria-label={c.qrLabel}>
            <img src="/images/qr-code.png" alt={c.qrAlt} loading="lazy" />
          </a>
        </div>
      </div>

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

            <ul className="foot">
              <li><Link to="/tools">Tools</Link></li>
            </ul>
          </div>
        </nav>

        <div className="viewer" id="viewer" ref={viewer}>
          {c.works.map((w, i) => (
            <WorkPanel work={w} start={i === 0} c={c} key={w.id} />
          ))}
        </div>

        {/* Nur am Handy: duenne Linie, der schwarze Teil zeigt, wo man in der
            Reihe gerade ist. Nur Anzeige, nicht bedienbar. */}
        <div className="swipebar" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>

      </div>

      <SiteFooter lang={lang}>
        {/* Normaler Link, kein Router-Link: /eisbaer ist eine eigene
            statische Seite (public/eisbaer.html, Game of Life). */}
        <a id="surprise" href="/eisbaer">
          {c.surprise}
        </a>
      </SiteFooter>
    </div>
  )
}
