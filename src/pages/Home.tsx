import type { Lang } from '@/content/types'
import { content } from '@/content'
import { Seo } from '@/components/Seo'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { NewsTicker } from '@/components/NewsTicker'
import { Works } from '@/components/Works'
import { Tools } from '@/components/Tools'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home({ lang }: { lang: Lang }) {
  const c = content[lang]

  return (
    <>
      <Seo content={c} />
      <a className="skip-link" href="#main">
        {c.nav.skip}
      </a>
      <Nav content={c} onHome />

      <main id="main">
        <Hero content={c} />
        <NewsTicker content={c} />
        <Works content={c} />
        <Tools content={c} />
        <Contact content={c} />
      </main>

      <Footer content={c} />
    </>
  )
}
