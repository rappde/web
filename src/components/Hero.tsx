import type { Content } from '@/content/types'
import { GlitchText } from './GlitchText'

export function Hero({ content }: { content: Content }) {
  const { hero } = content

  return (
    <section className="hero container" id="top">
      <h1 className="hero__name">
        <span className="hero__name-line hero__name-line--1">
          <GlitchText text={hero.nameLine1} />
        </span>
        <span className="hero__name-line hero__name-line--2">
          <GlitchText text={hero.nameLine2} />
        </span>
      </h1>

      <p className="hero__intro">{hero.intro}</p>

      <div className="hero__actions">
        <a className="btn btn--primary" href="#contact">
          {hero.ctaPrimary}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
        <a className="btn" href="#work">
          {hero.ctaSecondary}
        </a>
      </div>
    </section>
  )
}
