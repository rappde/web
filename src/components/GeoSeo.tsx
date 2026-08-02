import { Head } from 'vite-react-ssg'
import type { GeoPageContent } from '@/content/datamoshing'
import { SITE_URL, personRef } from './Seo'

const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Head for a datamoshing hub page (EN only): Article + BreadcrumbList always,
    plus FAQPage and/or HowTo when the page provides them. Canonical is
    self-referencing; hreflang is en + x-default to self (no German twin). */
export function GeoSeo({ content }: { content: GeoPageContent }) {
  const url = `${SITE_URL}${content.path}`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.headline,
    description: content.meta.description,
    inLanguage: 'en',
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    author: personRef,
    publisher: personRef,
    mainEntityOfPage: url,
    image: OG_IMAGE,
    url,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: content.breadcrumb.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.path}`,
    })),
  }

  const faqLd = content.faq && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const howToLd = content.howTo && {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.howTo.name,
    description: content.howTo.description,
    step: content.howTo.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }

  return (
    <Head>
      <html lang="en" />
      <title>{content.meta.title}</title>
      <meta name="description" content={content.meta.description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Demien Rapp" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={content.meta.ogTitle} />
      <meta property="og:description" content={content.meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="article:published_time" content={content.datePublished} />
      <meta property="article:modified_time" content={content.dateModified} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.meta.ogTitle} />
      <meta name="twitter:description" content={content.meta.ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      {howToLd && <script type="application/ld+json">{JSON.stringify(howToLd)}</script>}
    </Head>
  )
}
