import { Head } from 'vite-react-ssg'
import type { HomeContent } from '@/content/home'

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

const AWARDS = [
  'Audience Award, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026 (mine)',
  'Jury Award, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026 (mine)',
  'Audience Award, 18. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2025 (gefühle)',
]

const SAME_AS = [
  'https://rappde.itch.io',
  'https://github.com/rappde',
  'https://www.youtube.com/@demienrapp',
  'https://www.instagram.com/rappde_',
  'https://www.linkedin.com/in/demien-rapp-983b8a1ab/',
]

/**
 * Head of the start page, EN at "/" and DE at "/de": title, description,
 * canonical, hreflang pair (+ x-default), Open Graph + Twitter cards, and
 * JSON-LD Person + WebSite (REDESIGN-BRIEF §9b). Both languages list
 * themselves and each other, as Google requires for hreflang.
 * Rendered into the prehydrated HTML via react-helmet-async.
 */
export function Seo({ c }: { c: HomeContent }) {
  const url = `${SITE_URL}${c.path}`
  const de = c.lang === 'de'

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    description: c.description,
    jobTitle: de ? 'Künstler und Entwickler' : 'Creative generalist and developer',
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
    homeLocation: { '@type': 'City', name: 'Düsseldorf' },
    image: `${SITE_URL}/images/demien-portrait.jpg`,
    email: 'mailto:demien.rp@gmail.com',
    award: AWARDS,
    sameAs: SAME_AS,
  }

  /* Die Startseite ist ein Profil: Google kennt dafuer den Typ ProfilePage
     (Profilseiten von Personen). mainEntity verweist auf die Person oben. */
  const profileLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    inLanguage: c.lang,
    name: c.title,
    mainEntity: { '@id': PERSON_ID },
  }

  /* Die Werke als Liste, jedes mit Jahr, Bild und Verweis auf die Person.
     Hilft Suchmaschinen und KI-Antworten, Werke und Person zu verbinden. */
  const worksLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: de ? 'Arbeiten von Demien Rapp' : 'Works by Demien Rapp',
    itemListElement: c.works.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: w.title,
        dateCreated: w.year,
        description: w.desc[0].text,
        creator: personRef,
        url: w.page ? `${SITE_URL}${de ? '/de' : ''}/works/${w.page}` : `${url}#${w.id}`,
        ...(w.image || w.gallery ? { image: `${SITE_URL}${(w.image ?? w.gallery![0]).src}` } : {}),
      },
    })),
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
      <html lang={c.lang} />
      <title>{c.title}</title>
      <meta name="description" content={c.description} />
      <link rel="canonical" href={url} />

      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="de" href={`${SITE_URL}/de`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content={de ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content={de ? 'en_US' : 'de_DE'} />
      <meta property="og:title" content={c.title} />
      <meta property="og:description" content={c.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={c.title} />
      <meta name="twitter:description" content={c.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(profileLd)}</script>
      <script type="application/ld+json">{JSON.stringify(worksLd)}</script>
    </Head>
  )
}
