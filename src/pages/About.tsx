import { Link } from 'react-router-dom'
import type { Lang } from '@/content/types'
import { content } from '@/content'
import { about } from '@/content/about'
import { AboutSeo } from '@/components/AboutSeo'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export default function About({ lang }: { lang: Lang }) {
  const c = about[lang]
  const site = content[lang]
  const homeHref = lang === 'en' ? '/' : '/de'

  return (
    <>
      <AboutSeo c={c} />
      <a className="skip-link" href="#main">
        {site.nav.skip}
      </a>
      <Nav content={site} enHref="/about" deHref="/de/about" />

      <main id="main" className="about container">
        <Link className="workpage__back" to={homeHref}>
          ← {c.backLabel}
        </Link>

        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="about__title">{c.title}</h1>

        <div className="about__intro">
          {c.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <section className="about__block" aria-labelledby="about-experience-title">
          <h2 className="about__block-title" id="about-experience-title">
            {c.timelineTitle}
          </h2>
          {c.timeline.map((item, i) => (
            <div className="about__row" key={i}>
              <span className="meta about__period">{item.period}</span>
              <p className="about__row-text">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="about__block" aria-labelledby="about-education-title">
          <h2 className="about__block-title" id="about-education-title">
            {c.educationTitle}
          </h2>
          {c.education.map((item, i) => (
            <div className="about__row" key={i}>
              <span className="meta about__period">{item.period}</span>
              <p className="about__row-text">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="about__block" aria-labelledby="about-skills-title">
          <h2 className="about__block-title" id="about-skills-title">
            {c.skillsTitle}
          </h2>
          <p className="about__skills">{c.skills.join(' · ')}</p>
        </section>

        <section className="about__block" aria-labelledby="about-languages-title">
          <h2 className="about__block-title" id="about-languages-title">
            {c.languagesTitle}
          </h2>
          <p className="about__row-text">{c.languages}</p>
        </section>

        <section className="about__cta">
          <p className="about__cta-text">{c.ctaText}</p>
          <a className="btn btn--primary" href={`mailto:${site.contact.email}`}>
            {c.ctaLabel}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </section>
      </main>

      <Footer content={site} />
    </>
  )
}
