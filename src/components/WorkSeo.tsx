import { Head } from 'vite-react-ssg'
import type { Content, Work } from '@/content/types'
import { SITE_URL } from './Seo'

const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Head for a featured work page: own title/description, canonical, EN/DE
    hreflang to the matching work page, OG, and CreativeWork JSON-LD (§9b). */
export function WorkSeo({ content, work }: { content: Content; work: Work }) {
  const base = content.lang === 'en' ? '' : '/de'
  const url = `${SITE_URL}${base}/works/${work.slug}`
  const enUrl = `${SITE_URL}/works/${work.slug}`
  const deUrl = `${SITE_URL}/de/works/${work.slug}`
  const title = `${work.title} · Demien Rapp`
  const description = work.teaser ?? work.body[0]

  const creativeWorkLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    creator: { '@type': 'Person', name: 'Demien Rapp', url: SITE_URL },
    dateCreated: work.year,
    locationCreated: work.place,
    description,
    inLanguage: content.lang,
    url,
    ...(work.media.src ? { image: `${SITE_URL}${work.media.src}` } : {}),
    ...(work.awards ? { award: work.awards } : {}),
  }

  return (
    <Head>
      <html lang={content.htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content={content.lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(creativeWorkLd)}</script>
    </Head>
  )
}
