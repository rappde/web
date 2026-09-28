import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SiteFooter, keepScroll } from '@/components/Shell'
import { ITCH_URL } from '@/content/mosh-unit'

interface BrowserTool {
  id: string
  name: string
  url: string
  source: string
  camera: boolean
}

const BROWSER_TOOLS: BrowserTool[] = [
  {
    id: 'compression-unit',
    name: 'Compression Unit',
    url: 'https://rappde.github.io/compression_unit/',
    source: 'https://github.com/rappde/compression_unit',
    camera: true,
  },
  {
    id: 'displacement-unit',
    name: 'Displacement Unit',
    url: 'https://rappde.github.io/displacement_unit/',
    source: 'https://github.com/rappde/displacement_unit',
    camera: true,
  },
  {
    id: 'paint-unit',
    name: 'Paint Unit',
    url: 'https://rappde.github.io/paint_unit/',
    source: 'https://github.com/rappde/paint_unit',
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

/* Info-Block unter dem Tool, klappt nach ein paar Sekunden weg. Bleibt bei
   Hover oder Fokus, kommt beim erneuten Anwaehlen zurueck. */
const BANNER_MS = 6000
let bannerTimer: ReturnType<typeof setTimeout> | undefined

function armBanner() {
  clearTimeout(bannerTimer)
  document.querySelectorAll<HTMLElement>('.banner.auto').forEach((b) => {
    b.classList.remove('gone')
    b.inert = false
  })
  const banner = location.hash ? document.getElementById(location.hash.slice(1))?.querySelector<HTMLElement>('.banner.auto') : null
  if (!banner) return
  const hide = () => {
    if (banner.matches(':hover') || banner.contains(document.activeElement)) {
      bannerTimer = setTimeout(hide, 2000)
      return
    }
    banner.classList.add('gone')
    banner.inert = true
  }
  bannerTimer = setTimeout(hide, BANNER_MS)
}

/* Nur ein video-Element, der Klick tauscht die Quelle (fuenf wuerden fuenf
   Dateien laden). Kein Autoplay bei prefers-reduced-motion. */
function MoshDemo() {
  const video = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(EFFECTS[0])
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('ready')

  const play = () => {
    const v = video.current
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.play().catch(() => {})
  }

  useEffect(() => {
    const sync = () => {
      if (location.hash === '#mosh-unit') play()
      else video.current?.pause()
    }
    window.addEventListener('hashchange', sync)
    sync()
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const pick = (fx: (typeof EFFECTS)[number]) => {
    setActive(fx)
    setState('loading')
    requestAnimationFrame(play)
  }

  return (
    <div className="moshStage">
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
    </div>
  )
}

export default function Tools() {
  /* src erst beim Anwaehlen setzen: sonst laden alle versteckten iframes
     sofort, und ohne Klick geht keine IP an github.io (kein Consent noetig). */
  useEffect(() => {
    const openTool = () => {
      if (!location.hash) return
      const panel = document.getElementById(location.hash.slice(1))
      const frame = panel?.querySelector<HTMLIFrameElement>('iframe[data-src]')
      if (!frame) return
      frame.src = frame.dataset.src as string
      frame.removeAttribute('data-src')
    }
    const onHash = () => {
      openTool()
      armBanner()
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    // beim Laden mit #tool nicht zum Panel springen
    if (location.hash) requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => {
      window.removeEventListener('hashchange', onHash)
      clearTimeout(bannerTimer)
    }
  }, [])

  /* zweiter Klick auf dasselbe Tool feuert kein hashchange */
  const onTaskbar = (e: MouseEvent) => {
    keepScroll(e)
    armBanner()
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
        {/* Linkes Fenster */}
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

        {/* Rechtes Fenster */}
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
                <div className="banner auto">
                  <div className="actions">
                    <a href={t.url} target="_blank" rel="noopener">
                      Open in its own tab
                    </a>
                    <a href={t.source} target="_blank" rel="noopener">
                      Source on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Desktop-Programm, kein iframe. Kauf ueber itch.io (nur ein Link). */}
          <article className="win panel" id="mosh-unit">
            <h2 className="vh">MOSH_UNIT</h2>
            <div className="winbody">
              <div className="moshWrap">
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

                {/* TODO: Preis pruefen, wenn Early Access endet (gleich wie auf itch.io) */}
                <p className="price">
                  7.99 USD, one-time. Early access price, 9.99 USD later. Sold and handled by itch.io.
                </p>

                <div className="actions">
                  <a className="buy" href={ITCH_URL} target="_blank" rel="noopener">
                    Buy on itch.io
                  </a>
                  <Link to="/mosh_unit">Product page</Link>
                  <Link to="/datamoshing">What is datamoshing</Link>
                </div>
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
