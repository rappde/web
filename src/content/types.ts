/* Content model for the bilingual site.
   All copy lives in content.en.ts / content.de.ts and is raw material —
   Demien rewrites it himself later. Nothing is invented here. */

export type Lang = 'en' | 'de'

export interface NavContent {
  skip: string
  links: { id: string; label: string }[]
  cta: string
}

export interface TickerItem {
  date?: string
  text: string
}

export interface Media {
  /** aspect-ratio value, e.g. "16 / 9" */
  aspect: string
  kind: 'image' | 'video'
  alt: string
  /** path to a real image in /public, e.g. "/images/foo.png" */
  src?: string
  /** optional overlay label for click-to-load video placeholders */
  label?: string
}

export interface WorkLink {
  label: string
  href: string
}

export interface WorkPull {
  label: string
  text: string
}

export interface Work {
  id: string
  index: string
  year: string
  date: string
  status?: 'upcoming'
  statusLabel?: string
  title: string
  role: string
  medium: string
  place: string
  body: string[]
  pull?: WorkPull[]
  note?: string
  /** prizes/awards, rendered into CreativeWork JSON-LD (award) */
  awards?: string[]
  media: Media
  links?: WorkLink[]
  /** featured works get their own route /works/<slug> and a rich block (§2c) */
  featured?: boolean
  slug?: string
  /** short teaser shown on the home featured block */
  teaser?: string
}

export interface Tool {
  id: string
  name: string
  body: string
  href: string
  hrefLabel: string
}

export interface ContactLink {
  label: string
  handle: string
  href: string
}

export interface Content {
  lang: Lang
  htmlLang: string
  /** canonical path for this language ("/" or "/de") */
  path: string

  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
  }

  nav: NavContent

  hero: {
    nameLine1: string
    nameLine2: string
    /** short intro paragraph shown under the name */
    intro: string
    ctaPrimary: string
    ctaSecondary: string
  }

  ticker: {
    label: string
    items: TickerItem[]
  }

  works: {
    title: string
    viewLabel: string
    archiveLabel: string
    items: Work[]
  }

  workPage: {
    back: string
    more: string
  }

  tools: {
    title: string
    items: Tool[]
    githubLabel: string
    githubHref: string
    /** internal link to the datamoshing content hub (GEO cross-link) */
    guideLabel: string
    guideHref: string
  }

  contact: {
    /** the section heading / "what to write for" line */
    forLine: string
    email: string
    copyLabel: string
    copiedLabel: string
    ctaPrimary: string
    /** downloadable portfolio PDF */
    portfolioLabel: string
    portfolioHref: string
    links: ContactLink[]
  }

  footer: {
    legalLinks: { label: string; href: string }[]
  }
}
