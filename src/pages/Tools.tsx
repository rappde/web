import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SiteFooter, keepScroll } from '@/components/Shell'
import { ITCH_URL } from '@/content/mosh-unit'

/* Tools, uebernommen aus public/v2/tools.html. */

interface BrowserTool {
  id: string
  name: string
  url: string
  source: string
  meta: string
  desc: string
  camera: boolean
}

const BROWSER_TOOLS: BrowserTool[] = [
  {
    id: 'compression-unit',
    name: 'Compression Unit',
    url: 'https://rappde.github.io/compression_unit/',
    source: 'https://github.com/rappde/compression_unit',
    meta: 'Browser tool, uses your camera on request',
    desc: 'Real-time video signal processing. Source is the live camera or a CRT filter. Controls for compression level, resolution, RGB offset, static noise, contrast and saturation. Saves stills as PNG or records video.',
    camera: true,
  },
  {
    id: 'displacement-unit',
    name: 'Displacement Unit',
    url: 'https://rappde.github.io/displacement_unit/',
    source: 'https://github.com/rappde/displacement_unit',
    meta: 'Browser tool, uses your camera on request',
    desc: 'Displacement mapping for images and video. Source is the live camera or an imported map. Controls for X strength, Y strength and threshold. Saves stills as PNG or records video.',
    camera: true,
  },
  {
    id: 'paint-unit',
    name: 'Paint Unit',
    url: 'https://rappde.github.io/paint_unit/',
    source: 'https://github.com/rappde/paint_unit',
    meta: 'Browser tool',
    desc: 'Digital painting on an imported source image. Three modes: Smear, Slide, Stamp. Brush size slider, canvas reset. Saves stills as PNG or records video.',
    camera: false,
  },
]

const EFFECTS = [
  { name: 'Bloom', file: 'moshunit-bloom-datamosh-demo' },
  { name: 'Reverse', file: 'moshunit-reverse-datamosh-demo' },
  { name: 'Shuffle', file: 'moshunit-shuffle-datamosh-demo' },
  { name: 'Stacked', file: 'moshunit-stacked-datamosh-demo' },
  { name: 'Melt / Transition', file: 'moshunit-melt-transition-datamosh-demo' },
]

/* Pfeil im Banner blendet den Textblock aus. Kein Wiederaufklappen: zurueck
   kommt er beim Neuladen oder beim erneuten Anwaehlen eines Tools. */
function Dismiss() {
  return (
    <button
      type="button"
      className="dismiss"
      aria-label="Hide details"
      title="Hide details"
      onClick={(e) => {
        const banner = e.currentTarget.closest('.banner') as HTMLElement | null
        if (banner) banner.hidden = true
      }}
    >
      ▼
    </button>
  )
}

/* Effekt-Umschalter im MOSH_UNIT-Panel. Ein einziges video-Element, der Klick
   tauscht nur die Quelle. Sechs video-Elemente wuerden sechs Dateien laden. */
function MoshDemo() {
  const video = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(EFFECTS[0])
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('ready')
  const [still, setStill] = useState(true)

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const pick = (fx: (typeof EFFECTS)[number]) => {
    setActive(fx)
    setState('loading')
    // Dauerschleifen sind fuer bewegungsempfindliche Menschen ein Problem,
    // darum startet nur ein Klick die Wiedergabe, und auch nur ohne reduced-motion.
    requestAnimationFrame(() => {
      if (!still) video.current?.play().catch(() => {})
    })
  }

  return (
    <>
      <div className="demo">
        <video
          ref={video}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster={`/mosh/${active.file}.jpg`}
          src={`/mosh/${active.file}.mp4`}
          aria-label="MOSH_UNIT effect demo"
          hidden={state === 'missing'}
          onError={() => setState('missing')}
          onLoadedMetadata={() => setState('ready')}
        />
        {state !== 'ready' && (
          <p className="demoHold">{state === 'missing' ? 'Clip not uploaded yet' : 'Loading'}</p>
        )}
      </div>

      <div className="effects" role="group" aria-label="Effects">
        {EFFECTS.map((fx) => (
          <button key={fx.file} type="button" aria-pressed={fx === active} onClick={() => pick(fx)}>
            {fx.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default function Tools() {
  /* Der iframe steht ohne src im Dokument. Erst wenn ein Tool angewaehlt
     wird, setzt dieser Effekt die Adresse. Zwei Gruende:
     1. Ein iframe mit src laedt auch in einem versteckten Panel. Sonst
        wuerden beim Seitenaufruf alle Tools gleichzeitig starten.
     2. Solange niemand ein Tool anwaehlt, geht keine Anfrage an github.io
        raus und keine IP dorthin. Darum braucht die Seite keinen
        Einwilligungsdialog. */
  useEffect(() => {
    const openTool = () => {
      if (!location.hash) return
      const panel = document.getElementById(location.hash.slice(1))
      const frame = panel?.querySelector<HTMLIFrameElement>('iframe[data-src]')
      if (!frame) return
      frame.src = frame.dataset.src as string
      frame.removeAttribute('data-src')
    }
    window.addEventListener('hashchange', openTool)
    openTool()
    return () => window.removeEventListener('hashchange', openTool)
  }, [])

  /* Zwei Aufgaben: Banner zuruecksetzen (ein zweiter Klick auf dasselbe Tool
     feuert kein hashchange) und den Ankersprung abfangen. */
  const onTaskbar = (e: MouseEvent) => {
    document.querySelectorAll<HTMLElement>('.banner[hidden]').forEach((b) => (b.hidden = false))
    keepScroll(e)
  }

  return (
    <div className="tools">
      <Head>
        <html lang="en" />
        <title>Tools. Demien Rapp</title>
        <meta
          name="description"
          content="Self-built tools by Demien Rapp. Datamosh, compression, displacement and painting utilities."
        />
        <link rel="canonical" href="https://rappde.com/tools" />
      </Head>

      <a className="skip" href="#viewer">
        Skip to content
      </a>

      <div className="layout">
        {/* ====== Linkes Fenster ====== */}
        <nav className="win taskbar" aria-label="Tools" onClick={onTaskbar}>
          <h1 className="winbar">Tools</h1>
          <div className="winbody">
            <p className="kind">Browser tools</p>
            <ul>
              {BROWSER_TOOLS.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.name}</a>
                </li>
              ))}
            </ul>

            <p className="kind">Desktop tools</p>
            <ul>
              <li>
                <a href="#mosh-unit">MOSH_UNIT</a>
              </li>
            </ul>

            <p className="foot">
              <Link to="/">Back to works</Link>
            </p>
          </div>
        </nav>

        {/* ====== Rechtes Fenster ====== */}
        <div className="viewer" id="viewer">
          <article className="win panel start">
            <h2 className="vh">Self-built tools</h2>
            <div className="winbody">
              <p className="desc">
                Pick a tool on the left. It starts right here in this window. The button underneath opens it in its
                own tab.
              </p>
              <p className="hint">MOSH_UNIT is a desktop program and comes as a download instead.</p>
            </div>
          </article>

          {BROWSER_TOOLS.map((t) => (
            <article className="win panel" id={t.id} key={t.id}>
              <h2 className="vh">{t.name}</h2>
              <div className="winbody">
                <div className="frame">
                  <iframe
                    title={t.name}
                    data-src={t.url}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    allow={t.camera ? 'camera; fullscreen' : 'fullscreen'}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="banner">
                  <p className="meta">{t.meta}</p>
                  <p className="desc">{t.desc}</p>
                  <div className="actions">
                    <a href={t.url} target="_blank" rel="noopener">
                      Open in its own tab
                    </a>
                    <a href={t.source} target="_blank" rel="noopener">
                      Source on GitHub
                    </a>
                    <Dismiss />
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Desktop-Programm, laeuft nicht im Browser, also kein iframe.
              Verkauf laeuft ueber itch.io, der Knopf ist ein reiner externer Link. */}
          <article className="win panel" id="mosh-unit">
            <h2 className="vh">MOSH_UNIT</h2>
            <div className="winbody">
              <MoshDemo />

              <div className="banner">
                <p className="meta">Desktop tool, Windows 10/11 64-bit</p>
                <p className="desc">
                  Break videos. Create something new. Draw glitch effects straight onto your video and watch it come
                  apart.
                </p>

                <ul className="feat">
                  <li>Real datamoshing. Bends the compressed video stream instead of laying a filter on top.</li>
                  <li>Draw effects straight onto the timeline, no keyframes.</li>
                  <li>Stack and reorder several effects.</li>
                  <li>MP4 export with the audio still in sync.</li>
                  <li>Runs offline. FFmpeg is bundled, nothing to install.</li>
                </ul>

                {/* TODO Demien: Preis pruefen, sobald Early Access endet. Steht auch
                    auf itch.io und muss dort und hier gleich sein. */}
                <p className="price">
                  7.99 USD, one-time. Early access price, 9.99 USD later. Sold and handled by itch.io.
                </p>

                <div className="actions">
                  <a className="buy" href={ITCH_URL} target="_blank" rel="noopener">
                    Buy on itch.io
                  </a>
                  <Link to="/mosh_unit">Product page</Link>
                  <Link to="/datamoshing">What is datamoshing</Link>
                  <Dismiss />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
