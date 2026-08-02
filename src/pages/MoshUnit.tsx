import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '@/content/types'
import { content } from '@/content'
import type { MoshUnitContent, MoshEffect } from '@/content/mosh-unit'
import { moshUnit, ITCH_URL, ITCH_USER, ITCH_GAME } from '@/content/mosh-unit'
import { MoshUnitSeo } from '@/components/MoshUnitSeo'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { VideoLoop } from '@/components/VideoLoop'
import { ItchBuyButton } from '@/components/ItchBuyButton'
import { MoshStickyBuy } from '@/components/MoshStickyBuy'
import { cx } from '@/lib/cx'

/* ------------------------------------------------ interactive demo */
function Demo({ c }: { c: MoshUnitContent }) {
  const [active, setActive] = useState<MoshEffect>(c.demo.effects[0])

  return (
    <section className="section container" id="demo" aria-labelledby="demo-title">
      <div className="section-head">
        <h2 className="section-title" id="demo-title">
          {c.demo.title}
        </h2>
        <p className="lede section-head__lede">{c.demo.lede}</p>
      </div>

      <div className="mosh-demo">
        <div className="mosh-demo__buttons" role="group" aria-label={c.demo.title}>
          {c.demo.effects.map((effect) => (
            <button
              key={effect.id}
              type="button"
              className={cx('mosh-demo__btn', active.id === effect.id && 'is-active')}
              aria-pressed={active.id === effect.id}
              onClick={() => setActive(effect)}
            >
              {effect.name}
            </button>
          ))}
          <p className="mosh-demo__hint">{c.demo.stackedHint}</p>
        </div>

        <div className="mosh-demo__stage">
          <p className="mosh-demo__now">
            <span className="mosh-demo__nowlabel meta">{c.demo.nowPlaying}</span>
            <span className="mosh-demo__nowname">{active.name}</span>
          </p>
          {/* key remounts the video so the chosen loop starts from its beginning */}
          <VideoLoop
            key={active.id}
            src={active.video}
            webm={active.webm}
            poster={active.poster}
            label={active.name}
            comingSoon={c.demo.comingSoon}
          />
          <p className="mosh-demo__blurb">{active.blurb}</p>

          <div className="mosh-demo__buy">
            <span className="mosh-demo__buyline">{c.demo.ctaLine}</span>
            <ItchBuyButton
              user={ITCH_USER}
              game={ITCH_GAME}
              href={ITCH_URL}
              className="btn btn--primary"
            >
              {c.hero.ctaPrimary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </ItchBuyButton>
            <span className="mosh-demo__buyprice meta">{c.pricing.priceNow}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ FAQ disclosure row */
function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cx('faq', open && 'is-open')}>
      <h3 className="faq__heading">
        <button
          type="button"
          className="faq__row"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{q}</span>
          <span className="faq__toggle" aria-hidden="true">
            {open ? '–' : '+'}
          </span>
        </button>
      </h3>
      <div className="faq__panel" id={id} hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function MoshUnit({ lang }: { lang: Lang }) {
  const c = moshUnit[lang]
  const site = content[lang]

  return (
    <>
      <MoshUnitSeo content={c} />
      <a className="skip-link" href="#main">
        {site.nav.skip}
      </a>
      <Nav content={site} enHref="/mosh_unit" deHref="/de/mosh_unit" />

      <main id="main" className="mosh">
        {/* ---------------- hero ---------------- */}
        <header className="mosh-hero container">
          <p className="eyebrow">{c.hero.kicker}</p>
          <h1 className="mosh-hero__name">
            MOSH<span className="pixel">_</span>UNIT
          </h1>
          <p className="mosh-hero__tagline">
            <RichText text={c.hero.tagline} />
          </p>

          <p className="mosh-hero__intro">{c.hero.intro}</p>

          <div className="hero__actions">
            <ItchBuyButton
              user={ITCH_USER}
              game={ITCH_GAME}
              href={ITCH_URL}
              className="btn btn--primary"
            >
              {c.hero.ctaPrimary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </ItchBuyButton>
            <a className="btn" href="#demo">
              {c.hero.ctaSecondary}
            </a>
          </div>

          <p className="mosh-hero__price">
            <span className="mosh-hero__now">{c.pricing.priceNow}</span>
            <span className="mosh-hero__pricenote meta">{c.hero.priceNote}</span>
          </p>

          <ul className="mosh-hero__facts meta">
            {c.hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </header>

        {/* ---------------- demo ---------------- */}
        <Demo c={c} />

        {/* ---------------- workflow ---------------- */}
        <section className="section container" aria-labelledby="workflow-title">
          <h2 className="section-title" id="workflow-title">
            {c.workflow.title}
          </h2>
          <ol className="mosh-steps">
            {c.workflow.steps.map((step, i) => (
              <Reveal key={step.name} className="mosh-step" delay={i * 70}>
                <span className="mosh-step__index meta">{i + 1}</span>
                <h3 className="mosh-step__name">{step.name}</h3>
                <p className="mosh-step__body">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------- features ---------------- */}
        <section className="section container" aria-labelledby="features-title">
          <h2 className="section-title" id="features-title">
            {c.features.title}
          </h2>
          <div className="mosh-features">
            {c.features.items.map((item) => (
              <div className="mosh-feature" key={item.name}>
                <h3 className="mosh-feature__name">{item.name}</h3>
                <p className="mosh-feature__body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- screenshots ---------------- */}
        <section className="section container" aria-labelledby="shots-title">
          <h2 className="section-title" id="shots-title">
            {c.screenshots.title}
          </h2>
          <div className="mosh-shots">
            {c.screenshots.items.map((shot) => (
              <div className="media" style={{ aspectRatio: '16 / 10' }} key={shot.id}>
                {shot.image ? (
                  <img className="media__img" src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
                ) : (
                  <div className="media__inner">
                    <span className="media__badge">{shot.label}</span>
                    <span className="mosh-soon">{c.screenshots.comingSoon}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- pricing: THE one inverted block ---------------- */}
        <section className="mosh-buy inverted" id="buy" aria-labelledby="buy-title">
          <div className="container mosh-buy__grid">
            <div>
              <h2 className="mosh-buy__title" id="buy-title">
                <RichText text={c.pricing.title} />
              </h2>
              <p className="mosh-buy__price">
                <span className="mosh-buy__now">{c.pricing.priceNow}</span>
                <span className="mosh-buy__label meta">
                  {c.pricing.earlyLabel} · {c.pricing.laterLabel} {c.pricing.priceLater}
                </span>
              </p>
              <div className="contact__actions">
                <ItchBuyButton
                  user={ITCH_USER}
                  game={ITCH_GAME}
                  href={ITCH_URL}
                  className="btn btn--primary"
                >
                  {c.pricing.cta}
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </ItchBuyButton>
                <span className="mosh-buy__itch meta">{c.pricing.onItch}</span>
              </div>
            </div>
            <ul className="mosh-buy__bullets">
              {c.pricing.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <p className="container mosh-buy__req">{c.pricing.requirements}</p>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="section container" aria-labelledby="faq-title">
          <h2 className="section-title" id="faq-title">
            {c.faq.title}
          </h2>
          <div className="mosh-faq">
            {c.faq.items.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} id={`faq-${i}`} />
            ))}
          </div>

          <p className="mosh-learn">
            <span className="mosh-learn__label meta">{c.learn.label}</span>
            {c.learn.links.map((l) => (
              <Link key={l.href} className="mosh-learn__link" to={l.href}>
                {l.label}
                <span aria-hidden="true"> →</span>
              </Link>
            ))}
          </p>
        </section>
      </main>

      <MoshStickyBuy price={c.pricing.priceNow} cta={c.hero.ctaPrimary} note={c.hero.priceNote} />

      <Footer content={site} />
    </>
  )
}
