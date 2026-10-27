import { Fragment, useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import type { Lang } from '@/content/types'
import { home, type HomeWork, type HomePara } from '@/content/home'
import { SiteFooter, keepScroll } from '@/components/Shell'

/* Startseite, EN unter "/" und DE unter "/de". Inhalte in content/home.ts. */

/** [Wort](https://…) im Text wird zum Link in einem neuen Tab. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        return m ? (
          <a key={i} href={m[2]} target="_blank" rel="noopener">
            {m[1]}
          </a>
        ) : (
          part
        )
      })}
    </>
  )
}

function Para({ p }: { p: HomePara }) {
  if (!p.lead) return <Rich text={p.text} />
  return (
    <>
      <em>
        <Rich text={p.lead} />
      </em>
      {p.break ? <br /> : ' '}
      <Rich text={p.text} />
    </>
  )
}


/* Nur Handy: bewegt die Fortschrittsleiste unter der Wisch-Reihe mit und
   rollt bei Links wie /#gefuehle zur passenden Karte. */
const MOBILE = '(max-width: 767px)'

function useSwipeGallery(ref: RefObject<HTMLDivElement>, bar: RefObject<HTMLSpanElement>) {
  useEffect(() => {
    const viewer = ref.current
    if (!viewer || !matchMedia(MOBILE).matches) return

    if (location.hash) {
      const card = document.getElementById(location.hash.slice(1))
      // padding abziehen, sonst klebt die Karte am Bildschirmrand
      if (card) viewer.scrollLeft = card.offsetLeft - viewer.offsetLeft - parseFloat(getComputedStyle(viewer).paddingLeft)
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

/* Der QR steht mittig in seiner Spalte, seine Breite folgt der Texthoehe.
   Sein Abstand zum rechten Rand wird --qrEdge, daran enden die Werke. */
function useQrEdge(intro: RefObject<HTMLDivElement>, qr: RefObject<HTMLAnchorElement>) {
  useEffect(() => {
    const box = intro.current
    const code = qr.current
    if (!box || !code) return
    const measure = () => {
      const q = code.getBoundingClientRect()
      // am Handy ist der QR ausgeblendet, Breite 0
      const edge = q.width ? box.getBoundingClientRect().right - q.right : 0
      box.parentElement!.style.setProperty('--qrEdge', `${edge}px`)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [intro, qr])
}

/* Startet stumm, sobald das Video zur Haelfte sichtbar ist, und pausiert
   ausserhalb. Bei "reduzierte Bewegung" nur per Klick, dann immer mit
   Controls. */
function AutoVideo({ video, controls = true }: { video: NonNullable<HomeWork['video']>; controls?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still, setStill] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setStill(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster}
      muted
      loop
      playsInline
      controls={controls || still}
      preload="metadata"
      aria-label={video.label}
    />
  )
}

/** Bild oder, mit `poster`, Video ohne Ton. */
function GalleryMedia({ g, controls, lazy }: { g: NonNullable<HomeWork['gallery']>[number]; controls?: boolean; lazy?: boolean }) {
  return g.poster ? (
    <AutoVideo key={g.src} video={{ src: g.src, poster: g.poster, label: g.alt }} controls={controls} />
  ) : (
    <img src={g.src} alt={g.alt} loading={lazy ? 'lazy' : undefined} />
  )
}

/* Hauptbild neben dem Text. Am Handy sind die weiteren Bilder ausgeblendet,
   ein Tipp aufs Bild zeigt das naechste. Ein Video hat dann keine Controls,
   sonst faengt es den Tipp ab. */
function MainImage({ images }: { images: NonNullable<HomeWork['gallery']> }) {
  const [i, setI] = useState(0)
  const next = () => {
    if (matchMedia('(max-width:767px)').matches) setI((i + 1) % images.length)
  }
  return (
    <figure className="workMain" onClick={images.length > 1 ? next : undefined}>
      <GalleryMedia g={images[i]} controls={images.length === 1} />
      {images.length > 1 && <figcaption className="count">{i + 1}/{images.length}</figcaption>}
    </figure>
  )
}

function WorkPanel({ work, start }: { work: HomeWork; start: boolean }) {
  const hasMain = !!work.gallery && !work.gallery[0].full
  const more = hasMain ? work.gallery!.slice(1) : work.gallery
  const cls = ['win', 'panel', start && 'start', work.gallery && 'wide', work.gallery && !hasMain && 'stack']
    .filter(Boolean)
    .join(' ')
  return (
    <article className={cls} id={work.id}>
      <div className="winbody">
        <div className="workRow">
          <div className="workText">
            <h3 className="workTitle">
              {work.title} <span className="workYear">{work.year}</span>
            </h3>
            {work.desc.map((d, i) => (
              <Fragment key={i}>
                <p className={d.big ? 'desc big' : 'desc'}>
                  <Para p={d} />
                </p>
                {d.audio && <audio className="desc" src={d.audio} controls preload="none" aria-label={d.lead} />}
              </Fragment>
            ))}
          </div>
          {work.image && (
            <div className="workMedia">
              <img src={work.image.src} alt={work.image.alt} loading="lazy" />
            </div>
          )}
          {work.video && (
            <div className="workMedia">
              <AutoVideo video={work.video} />
            </div>
          )}
          {hasMain && <MainImage images={work.gallery!} />}
          {work.placeholder && (
            <div className="workMedia">
              <span>{work.placeholder}</span>
            </div>
          )}
        </div>
        {more && more.length > 0 && (
          <div className={hasMain ? 'gallery more' : 'gallery'}>
            {more.map((g) => (
              <figure className={g.full ? 'full' : undefined} key={g.src}>
                <GalleryMedia g={g} lazy />
                {g.caption && <figcaption>{g.caption}</figcaption>}
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
  const intro = useRef<HTMLDivElement>(null)
  const qr = useRef<HTMLAnchorElement>(null)
  useQrEdge(intro, qr)

  return (
    <div className="home">
      <Seo c={c} />
      <a className="skip" href="#viewer">
        {c.skip}
      </a>

      {/* Desktop: .screen ist eine Bildschirmhoehe, der Footer liegt darunter */}
      <div className="screen">
      {/* QR-Code rechts, so hoch wie Text und Links zusammen */}
      <div className="intro" ref={intro}>
        <h1>Demien Rapp</h1>

        <div className="introText">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            {c.contact.text} <Link to="/manifest">{c.contact.link}</Link>.
          </p>

          <nav aria-label={c.profilesLabel}>
            <ul className="socials">
              <li><a href="https://github.com/rappde" target="_blank" rel="me noopener">GitHub</a></li>
              <li><a href="https://www.youtube.com/@demienrapp" target="_blank" rel="me noopener">YouTube</a></li>
              <li><a href="https://www.linkedin.com/in/demien-rapp-983b8a1ab/" target="_blank" rel="me noopener">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/rappde_" target="_blank" rel="me noopener">Instagram</a></li>
              <li><a href="mailto:demien.rp@gmail.com">Mail</a></li>
              {/* am Handy gibt es keine Taskbar */}
              <li className="onlyMobile"><Link to="/datamoshing">Datamoshing</Link></li>
            </ul>
          </nav>
        </div>

        <div className="qrCell">
          <a className="qr" ref={qr} href="/images/demien-portrait.jpg" target="_blank" rel="noopener" aria-label={c.qrLabel}>
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
              <li><Link to="/datamoshing">Datamoshing</Link></li>
            </ul>
          </div>
        </nav>

        <div className="viewer" id="viewer" ref={viewer}>
          {c.works.map((w, i) => (
            <WorkPanel work={w} start={i === 0} key={w.id} />
          ))}
        </div>

        {/* Nur am Handy: duenne Linie, der schwarze Teil zeigt, wo man in der
            Reihe gerade ist. */}
        <div className="swipebar" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>

      </div>

      <SiteFooter lang={lang}>
        {/* kein Router-Link, /eisbaer ist statisch (public/eisbaer.html) */}
        <a id="surprise" href="/eisbaer">
          {c.surprise}
        </a>
      </SiteFooter>
    </div>
  )
}
