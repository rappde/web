import type { Lang } from '@/content/types'
import { content } from '@/content'
import { about } from '@/content/about'
import { AboutSeo } from '@/components/AboutSeo'
import { Shell } from '@/components/Shell'

function Rows({ items }: { items: { period: string; text: string }[] }) {
  return (
    <div className="rows">
      {items.map((item, i) => (
        <div className="row" key={i}>
          <span className="meta">{item.period}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function About({ lang }: { lang: Lang }) {
  const c = about[lang]
  const site = content[lang]

  return (
    <>
      <AboutSeo c={c} />
      <Shell lang={lang} title={c.eyebrow} alt={{ en: '/about', de: '/de/about' }}>
        <h1>{c.title}</h1>

        {c.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <section aria-labelledby="about-experience-title">
          <h2 id="about-experience-title">{c.timelineTitle}</h2>
          <Rows items={c.timeline} />
        </section>

        <section aria-labelledby="about-education-title">
          <h2 id="about-education-title">{c.educationTitle}</h2>
          <Rows items={c.education} />
        </section>

        <section aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">{c.skillsTitle}</h2>
          <p>{c.skills.join(' · ')}</p>
        </section>

        <section aria-labelledby="about-languages-title">
          <h2 id="about-languages-title">{c.languagesTitle}</h2>
          <p>{c.languages}</p>
        </section>

        <section>
          <p>{c.ctaText}</p>
          <div className="actions">
            <a className="buy" href={`mailto:${site.contact.email}`}>
              {c.ctaLabel} →
            </a>
          </div>
        </section>
      </Shell>
    </>
  )
}
