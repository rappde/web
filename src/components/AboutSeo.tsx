import { Head } from 'vite-react-ssg'
import type { AboutContent } from '@/content/about'
import { SITE_URL, personRef } from './Seo'

const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Head for the About page: own title/description, canonical, EN/DE hreflang,
    OG, and an AboutPage JSON-LD pointing at the site's Person node. */
export function AboutSeo({ c }: { c: AboutContent }) {
  const url = `${SITE_URL}${c.path}`
  const enUrl = `${SITE_URL}/about`
  const deUrl = `${SITE_URL}/de/about`

  const aboutPageLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: c.meta.title,
    description: c.meta.description,
    url,
    inLanguage: c.lang,
    about: personRef,
    mainEntity: personRef,
  }

  return (
    <Head>
      <html lang={c.lang} />
      <title>{c.meta.title}</title>
      <meta name="description" content={c.meta.description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content={c.lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:title" content={c.meta.title} />
      <meta property="og:description" content={c.meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={c.meta.title} />
      <meta name="twitter:description" content={c.meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(aboutPageLd)}</script>
    </Head>
  )
}
