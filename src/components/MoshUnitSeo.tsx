import { Head } from 'vite-react-ssg'
import type { MoshUnitContent } from '@/content/mosh-unit'
import {
  ITCH_URL,
  TUTORIAL_VIDEO_ID,
  TUTORIAL_THUMB,
  TUTORIAL_DURATION_ISO,
  TUTORIAL_UPLOAD_DATE,
} from '@/content/mosh-unit'
import { SITE_URL, personRef } from './Seo'

const OG_IMAGE = `${SITE_URL}/og-mosh-unit.jpg`
/** same id on EN and DE so both pages point at one SoftwareApplication */
const APP_ID = `${SITE_URL}/mosh_unit#software`
/** upload date of the demo clips */
const MEDIA_DATE = '2026-07-12'
const abs = (path: string) => `${SITE_URL}${path}`

/** Head for /mosh_unit. The clips get VideoObjects because only the active
    one is a real <video> in the static HTML. */
export function MoshUnitSeo({ content }: { content: MoshUnitContent }) {
  const url = `${SITE_URL}${content.path}`
  const enUrl = `${SITE_URL}/mosh_unit`
  const deUrl = `${SITE_URL}/de/mosh_unit`
  const interfaceShot = content.screenshots.items.find((s) => s.image)?.image

  const appLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: 'MOSH_UNIT',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows 10, Windows 11',
    description: content.meta.description,
    image: OG_IMAGE,
    screenshot: interfaceShot ? abs(interfaceShot) : OG_IMAGE,
    url,
    author: personRef,
    offers: {
      '@type': 'Offer',
      price: '7.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      url: ITCH_URL,
    },
  }

  /* one VideoObject per demo clip */
  const videoLd = content.demo.effects
    .filter((e) => e.video && e.poster)
    .map((e) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `MOSH_UNIT ${e.name} datamosh demo`,
      description: e.blurb,
      thumbnailUrl: abs(e.poster as string),
      contentUrl: abs(e.video as string),
      encodingFormat: 'video/mp4',
      uploadDate: MEDIA_DATE,
      keywords: `datamoshing, datamosh, glitch art, video glitch, MOSH_UNIT, ${e.name.toLowerCase()}`,
      creator: personRef,
      isPartOf: { '@id': APP_ID },
    }))

  /* one ImageObject per screenshot */
  const imageLd = content.screenshots.items
    .filter((s) => s.image)
    .map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      name: `MOSH_UNIT ${s.label}`,
      description: s.alt,
      contentUrl: abs(s.image as string),
      creator: personRef,
      isPartOf: { '@id': APP_ID },
    }))

  /* tutorial on YouTube, null until TUTORIAL_VIDEO_ID is set */
  const tutorialVideoLd = TUTORIAL_VIDEO_ID
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `MOSH_UNIT ${content.tutorial.title}`,
        description: content.tutorial.lede,
        thumbnailUrl: abs(TUTORIAL_THUMB),
        uploadDate: TUTORIAL_UPLOAD_DATE,
        duration: TUTORIAL_DURATION_ISO,
        embedUrl: `https://www.youtube-nocookie.com/embed/${TUTORIAL_VIDEO_ID}`,
        creator: personRef,
        isPartOf: { '@id': APP_ID },
      }
    : null

  return (
    <Head>
      <html lang={content.htmlLang} />
      <title>{content.meta.title}</title>
      <meta name="description" content={content.meta.description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content={content.lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:title" content={content.meta.ogTitle} />
      <meta property="og:description" content={content.meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {interfaceShot && <meta property="og:image" content={abs(interfaceShot)} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.meta.ogTitle} />
      <meta name="twitter:description" content={content.meta.ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      {tutorialVideoLd && (
        <script type="application/ld+json">{JSON.stringify(tutorialVideoLd)}</script>
      )}
      {videoLd.map((ld, i) => (
        <script type="application/ld+json" key={`video-${i}`}>{JSON.stringify(ld)}</script>
      ))}
      {imageLd.map((ld, i) => (
        <script type="application/ld+json" key={`image-${i}`}>{JSON.stringify(ld)}</script>
      ))}
    </Head>
  )
}
