import { Head } from 'vite-react-ssg'
import type { HomeContent } from '@/content/home'

export const SITE_URL = 'https://rappde.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Person id plus name/url, so author/publisher refs still resolve on pages
    without the full Person node. */
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

/** Head of the start page. Both languages list themselves and each other
    in hreflang, as Google requires. */
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

  /* the start page is a profile, mainEntity is the Person above */
  const profileLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    inLanguage: c.lang,
    name: c.title,
    mainEntity: { '@id': PERSON_ID },
  }

  /* works as a list, each linked back to the Person */
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
        description: w.desc[0].text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'),
        creator: personRef,
        url: `${url}#${w.id}`,
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
