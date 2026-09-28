import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '@/content/types'
import type { MoshUnitContent, MoshEffect } from '@/content/mosh-unit'
import { moshUnit, ITCH_URL, TUTORIAL_VIDEO_ID, TUTORIAL_THUMB } from '@/content/mosh-unit'
import { MoshUnitSeo } from '@/components/MoshUnitSeo'
import { SiteFooter } from '@/components/Shell'
import { RichText } from '@/components/RichText'
import { VideoEmbed } from '@/components/VideoEmbed'

/* MOSH_UNIT als eigene Vollseite, ohne Taskbar. Nur das Wesentliche:
   was es ist, wie es aussieht, was es kann, was es kostet. */

/* Der Kauf laeuft komplett ueber itch.io. Der Knopf ist ein reiner externer
   Link, damit findet auf dieser Seite kein Vertragsschluss statt und vor dem
   Klick geht keine Anfrage an itch.io raus. */
function Buy({ children }: { children: string }) {
  return (
    <a className="buy" href={ITCH_URL} target="_blank" rel="noopener noreferrer">
      {children} →
    </a>
  )
}

/* Ein einziges video-Element, der Klick tauscht nur die Quelle (key). Bei
   prefers-reduced-motion laeuft nichts von allein, die controls bleiben. */
function Demo({ c }: { c: MoshUnitContent }) {
  const [active, setActive] = useState<MoshEffect>(c.demo.effects[0])
  const [still, setStill] = useState(true)

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="productDemo" id="demo">
      <div className="demo">
        {active.video ? (
          <video
            key={active.id}
            poster={active.poster}
            muted
            loop
            playsInline
            controls
            autoPlay={!still}
            preload="metadata"
            aria-label={`MOSH_UNIT: ${active.name}`}
          >
            {active.webm && <source src={active.webm} type="video/webm" />}
            <source src={active.video} type="video/mp4" />
          </video>
        ) : (
          <p className="demoHold">{c.demo.comingSoon}</p>
        )}
      </div>

      <div className="effects" role="group" aria-label={c.demo.title}>
        {c.demo.effects.map((effect) => (
          <button
            key={effect.id}
            type="button"
            aria-pressed={active.id === effect.id}
            onClick={() => setActive(effect)}
          >
            {effect.name}
          </button>
        ))}
      </div>
      <p className="hint">{active.blurb}</p>
    </div>
  )
}

export default function MoshUnit({ lang }: { lang: Lang }) {
  const c = moshUnit[lang]
  const de = lang === 'de'

  return (
    <div className="product">
      <MoshUnitSeo content={c} />
      <a className="skip" href="#main">
        {de ? 'Zum Inhalt' : 'Skip to content'}
      </a>

      <header className="winbar productBar">
        <Link to={de ? '/de' : '/'}>← Demien Rapp</Link>
      </header>

      <main id="main">
        <div className="productHero">
          <div>
            <p className="meta" style={{ marginTop: 0 }}>
              {c.hero.kicker}
            </p>
            <h1>MOSH_UNIT</h1>
            <p className="lede">
              <RichText text={c.hero.tagline} />
            </p>
            <p className="desc">{c.hero.intro}</p>

            <p className="price">
              <strong>{c.pricing.priceNow}</strong> · {c.hero.priceNote}
            </p>
            <div className="actions">
              <Buy>{c.hero.ctaPrimary}</Buy>
              <Link to="/datamoshing">{de ? 'Was ist Datamoshing?' : 'What is datamoshing?'}</Link>
            </div>
            <p className="meta">{c.hero.facts.join(' · ')}</p>
          </div>

          <Demo c={c} />
        </div>

        <div className="productCols">
          <section aria-labelledby="features-title">
            <h2 className="winbar" id="features-title">
              {c.features.title}
            </h2>
            <ul className="feat">
              {c.features.items.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}.</strong> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section id="buy" aria-labelledby="buy-title">
            <h2 className="winbar" id="buy-title">
              <RichText text={c.pricing.title} />
            </h2>
            <p className="lede">{c.pricing.priceNow}</p>
            <p className="price">
              {c.pricing.earlyLabel} · {c.pricing.laterLabel} {c.pricing.priceLater}
            </p>
            <ul className="feat">
              {c.pricing.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="actions">
              <Buy>{c.pricing.cta}</Buy>
            </div>
            <p className="hint">{c.pricing.requirements}</p>
          </section>
        </div>

        {/* Tutorial erscheint erst, wenn es das Video gibt (TUTORIAL_VIDEO_ID). */}
        {TUTORIAL_VIDEO_ID ? (
          <section aria-labelledby="tutorial-title" className="productTutorial">
            <h2 className="winbar" id="tutorial-title">
              {c.tutorial.title}
            </h2>
            <VideoEmbed
              videoId={TUTORIAL_VIDEO_ID}
              title={`MOSH_UNIT · ${c.tutorial.title}`}
              thumbnail={TUTORIAL_THUMB}
              thumbAlt={c.tutorial.thumbAlt}
              chapters={c.tutorial.chapters}
              chaptersLabel={c.tutorial.chaptersLabel}
              playLabel={c.tutorial.playLabel}
              jumpLabel={c.tutorial.jumpLabel}
              watchOnYouTube={c.tutorial.watchOnYouTube}
            />
          </section>
        ) : null}
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
