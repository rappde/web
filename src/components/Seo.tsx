import { Head } from 'vite-react-ssg'
import type { Content } from '@/content/types'

export const SITE_URL = 'https://rappde.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Canonical Person node id, plus a minimal reference that still carries name +
    url. Used as author/publisher elsewhere so those references resolve to a
    named entity even on pages that don't emit the full Person node (Rich
    Results Test). Single source of truth for the name/url strings. */
export const PERSON_ID = `${SITE_URL}/#person`
export const PERSON_NAME = 'Demien Rapp'
export const personRef = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  url: SITE_URL,
} as const

const SAME_AS = [
  'https://rappde.itch.io',
  'https://github.com/rappde',
  'https://www.youtube.com/@demienrapp',
  'https://www.instagram.com/rappde_',
  'https://www.linkedin.com/in/demien-rapp-983b8a1ab/',
]

/**
 * Per-language head: title, description, canonical, hreflang alternates,
 * Open Graph + Twitter cards, and JSON-LD Person (REDESIGN-BRIEF §9b).
 * Rendered into the prehydrated HTML via react-helmet-async.
 */
export function Seo({ content }: { content: Content }) {
  const url = `${SITE_URL}${content.path === '/' ? '/' : content.path}`

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    description: content.meta.description,
    jobTitle: 'Concept, design, technology & production',
    knowsLanguage: ['en', 'de'],
    knowsAbout: [
      'film',
      'photography',
      'sound art',
      'video installation',
      'interactive installation',
      'electronics',
      '3D printing',
      'creative coding',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Düsseldorf',
      addressCountry: 'DE',
    },
    sameAs: SAME_AS,
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Demien Rapp',
    alternateName: 'rappde',
    url: SITE_URL,
    inLanguage: ['en', 'de'],
    about: { '@id': PERSON_ID },
  }

  return (
    <Head>
      <html lang={content.htmlLang} />
      <title>{content.meta.title}</title>
      <meta name="description" content={content.meta.description} />
      <link rel="canonical" href={url} />

      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="de" href={`${SITE_URL}/de`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content={content.lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:title" content={content.meta.ogTitle} />
      <meta property="og:description" content={content.meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.meta.ogTitle} />
      <meta name="twitter:description" content={content.meta.ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
    </Head>
  )
}
