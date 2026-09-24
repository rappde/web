import type { Content } from './types'

const GITHUB = 'https://github.com/rappde'

// English is the default language. Copy is raw material, Demien edits it
// himself later (REDESIGN-BRIEF §6). Self-critical phrasing is intentionally
// left out; the work is framed plainly and positively.
export const en: Content = {
  lang: 'en',
  htmlLang: 'en',
  path: '/',

  meta: {
    title: 'Demien Rapp · Concept, Design, Code & Production',
    description:
      'Demien Rapp works across concept, design, technology and production, film, sound, video installation and self-built visual tools. Error as material. Based in Düsseldorf.',
    ogTitle: 'Demien Rapp · Concept · Design · Code · Production',
    ogDescription:
      'Film, sound, installation and self-built visual tools. Error as material. A look at the work of Demien Rapp, Düsseldorf.',
  },

  nav: {
    skip: 'Skip to content',
    links: [
      { id: 'work', label: 'Work' },
      { id: 'tools', label: 'Tools' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Write me',
  },

  hero: {
    nameLine1: 'DEMIEN',
    nameLine2: 'RAPP',
    intro:
      "I walk into rooms where I'm the least experienced person, and leave when that's no longer true. 18, Düsseldorf. Electronics, code, film, photo, 3D printing. Every project needs the tools it needs.",
    ctaPrimary: 'Write me',
    ctaSecondary: 'See the work',
  },

  ticker: {
    label: 'Next',
    items: [
      { date: '10 Oct 2026', text: 'Uncut Award, Filmwerkstatt Düsseldorf · co-organiser' },
      { text: 'Open to commissions, exhibitions & collaborations →' },
    ],
  },

  works: {
    title: 'Work · 2024 → 2026',
    viewLabel: 'View project',
    archiveLabel: 'Archive',
    items: [
      {
        id: 'mine',
        index: '00',
        year: '2026',
        date: '30 Jun 2026',
        featured: true,
        slug: 'mine',
        teaser: 'An interactive installation that only moves when it is watched. Won both the Audience Award and the Jury Award at Lernort Studio Düsseldorf.',
        title: 'mine',
        role: 'Interactive installation',
        medium: 'Klann-linkage robot · ultrasonic sensors · ESP',
        place: 'Lernort Studio Düsseldorf',
        body: [
          'The 19th Gestaltungswettbewerb, on the theme "between form and residual form", at Lernort Studio Düsseldorf. mine is an interactive installation that only moves when it is watched. Step closer and it runs faster, straining to function as expected.',
          'Everything is self-built: a walking robot on a Klann linkage, its parts 3D-printed and then finished and lacquered by hand into a deliberate metallic look. It stands on a table I built for the show, with ultrasonic sensors set into the surface and wired to an ESP; the closer a visitor comes, the harder it works.',
          'A power cable binds it to the socket. The socket holds it captive; tearing loose would carry it over the edge of the table. So it keeps going, in the place and the role it was assigned, unable to escape the attempt. Between the form and what would be left of breaking free, mine stays put. What happens when you try to escape?',
          'It won both the Audience Award and the Jury Award.',
        ],
        awards: [
          'Audience Award, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026',
          'Jury Award, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026',
        ],
        media: {
          aspect: '3 / 2',
          kind: 'image',
          src: '/images/mine.jpg',
          alt: 'mine: a black-and-white photograph of a low, spider-like walking robot built from 3D-printed linkages, hand-lacquered to a metallic look, on a dark table and tethered by a thin cable.',
        },
      },
      {
        id: 'knisternder-bahnhof',
        index: '01',
        year: '2024',
        date: '2024',
        title: 'Knisternder Bahnhof',
        role: 'Circuit bending · Photography',
        medium: 'Photo series',
        place: 'Lernort Studio',
        body: [
          "A cheap children's camera taken apart and rebuilt through circuit bending, it renders glitched, noisy, intensely colourful images. I shot Düsseldorf's main station with it, no post-processing.",
        ],
        note: 'Circuit bending: deliberately short-circuiting and altering a device\'s electronics to turn unpredictable malfunctions into an artistic effect.',
        media: {
          aspect: '2 / 3',
          kind: 'image',
          src: '/images/knisternder-bahnhof.jpg',
          alt: 'Knisternder Bahnhof: a grid of 24 glitched, intensely colourful photographs of Düsseldorf main station, shot on a circuit-bent camera.',
        },
        links: [
          { label: 'Rahmende Schatten 2024', href: 'https://lernort-studio.de/rahmende-schatten-2024/' },
        ],
      },
      {
        id: 'soiree-de-brioche',
        index: '02',
        year: '2024',
        date: 'Late 2024',
        title: 'Soirée de Brioche',
        role: 'DOP · Camera · Stills · Co-direction',
        medium: 'Feature film',
        place: 'Premiere · Metropol Kino Düsseldorf',
        body: [
          "A drama about twins raised apart, and my first large film. I was director of photography, camera, stills and part of the direction; it premiered at the Metropol Kino Düsseldorf.",
        ],
        media: {
          aspect: '4 / 3',
          kind: 'image',
          src: '/images/soiree-de-brioche.jpg',
          alt: 'Cover still from the feature film Soirée de Brioche.',
        },
      },
      {
        id: 'ein-viertel',
        index: '03',
        year: '2025',
        date: 'Nov 2024 – Mar 2025',
        featured: true,
        slug: 'ein-viertel',
        teaser: '1/4 is my contribution to BE A TRANSFORMER!, a collaborative 5 × 12 m banner at K21: 100 events of this century as AI images.',
        title: '1/4',
        role: 'Digital AI collage',
        medium: 'Banner 5 × 12 m · part of BE A TRANSFORMER!',
        place: 'K21 Düsseldorf',
        body: [
          'BE A TRANSFORMER! is a collaborative 5 × 12 m banner shown at K21. 1/4 is my part of it: 100 socially and politically significant events of this century, generated as AI images and composed into a single picture.',
        ],
        media: {
          aspect: '12 / 5',
          kind: 'image',
          src: '/images/ein-viertel-banner.jpg',
          alt: 'The 5 × 12 m BE A TRANSFORMER! banner on the dome wall at K21; 1/4 is Demien\'s AI collage of 100 events of this century.',
        },
      },
      {
        id: 'gefuehle',
        index: '04',
        year: '2025',
        date: '4 Oct 2025',
        featured: true,
        slug: 'gefuehle',
        teaser: 'Three stacked CRT TVs, mixed live by visitors into glitch video, a look into his world.',
        title: 'Gefühle',
        role: 'Video installation',
        medium: '3 CRT TVs · analogue video mixer',
        place: '"Wir sehen Rot" · Kollektiv Dings · Düsseldorf',
        body: [
          'Three stacked CRT TVs run through an analogue video mixer. Visitors turn potentiometers to mix a self-portrait into heavily distorted edits of nature and city, a "dirty mix" of my world. Shown in the group exhibition "Wir sehen Rot" by the collective Dings.',
          'It won the Audience Award at the 18th Gestaltungswettbewerb ("Transparenz") at Lernort Studio Düsseldorf in 2025.',
        ],
        awards: [
          'Audience Award, 18. Gestaltungswettbewerb "Transparenz", Lernort Studio Düsseldorf 2025',
        ],
        links: [
          { label: '18. Gestaltungswettbewerb 2025', href: 'https://lernort-studio.de/18_gestaltungswettbewerb/' },
          { label: 'Dings on Instagram', href: 'https://www.instagram.com/dings.kultur' },
        ],
        media: {
          aspect: '4 / 3',
          kind: 'image',
          src: '/images/gefuehle.jpg',
          alt: '"Gefühle": three stacked CRT televisions showing glitched video, with the potentiometer stand visitors turn to mix the image.',
        },
      },
      {
        id: 'uncut-2025',
        index: '05',
        year: '2025',
        date: '24 Oct 2025',
        title: '2491 · Last Slice',
        role: 'Director (2491) · Camera & technical lead (Last Slice)',
        medium: 'Video · short film',
        place: 'Uncut Award · Filmwerkstatt Düsseldorf',
        body: [
          'My own entry "2491" takes a critical look at surveillance. On "Last Slice" I was cameraman and technical lead, and that film won the Audience Award.',
        ],
        media: {
          aspect: '5 / 4',
          kind: 'image',
          src: '/images/uncut-2025.jpg',
          alt: 'Still from "2491" / "Last Slice", shown at the Uncut Award.',
        },
      },
      {
        id: 'soundwalk',
        index: '06',
        year: '2026',
        date: '18 Apr 2026',
        featured: true,
        slug: 'soundwalk',
        teaser: 'Two sound works from biographical recordings, processed with self-built algorithmic tools.',
        title: 'Soundwalk',
        role: 'Two sound works',
        medium: 'Sound · algorithmic processing',
        place: 'Werk:Klub · K21 Düsseldorf',
        body: [
          'Two sound works built from childhood and 18th-birthday recordings, processed with self-built algorithmic tools that layer and deform the sound. Memory as something that reshapes with every playback. Made in the Werk:Klub at K21 Düsseldorf.',
        ],
        pull: [
          {
            label: 'Nr. 5 · 5 min',
            text: 'Memory does not produce a past. It produces you. Chaotic. Unclear. Foggy.',
          },
          {
            label: 'Nr. 7 · 7 min',
            text: 'Memory is not a storage device. It invents. Again and again. What you held to be true may never have been so.',
          },
        ],
        media: {
          aspect: '16 / 9',
          kind: 'image',
          src: '/images/soundwalk.jpg',
          alt: 'The Soundwalk sound works at K21, two pieces built from biographical recordings.',
        },
      },
      {
        id: 'uncut-2026',
        index: '07',
        year: '2026',
        date: '10 Oct 2026',
        status: 'upcoming',
        statusLabel: 'Upcoming',
        title: 'Uncut Award 2026',
        role: 'Tech · Presentation · Social media · Production',
        medium: 'Film competition · co-organiser',
        place: 'Filmwerkstatt Düsseldorf',
        body: [
          'Co-organiser of the Uncut Award at the Filmwerkstatt Düsseldorf, technology, presentation, social media. Taking place 10 October 2026.',
        ],
        media: {
          aspect: '16 / 9',
          kind: 'image',
          alt: 'Placeholder for the upcoming Uncut Award 2026 at the Filmwerkstatt Düsseldorf, co-organised by Demien Rapp.',
        },
      },
    ],
  },

  workPage: {
    back: 'Back to work',
    more: 'More work',
  },

  tools: {
    title: 'Self-built tools',
    items: [
      {
        id: 'mosh-unit',
        name: 'MOSH_UNIT',
        body: 'A video glitch tool for Windows: draw datamosh effects onto your clips and export MP4.',
        href: '/mosh_unit',
        hrefLabel: 'View',
      },
      {
        id: 'compression-unit',
        name: 'Compression Unit',
        body: 'A tool for visual effects: controlled JPEG artefacts and compression "damage".',
        href: 'https://rappde.github.io/compression_unit/',
        hrefLabel: 'Open',
      },
      {
        id: 'displacement-unit',
        name: 'Displacement Unit',
        body: 'A brutalist signal processor: pixels displaced by luminance from images, video or a live camera.',
        href: 'https://rappde.github.io/displacement_unit/',
        hrefLabel: 'Open',
      },
      {
        id: 'paint-unit',
        name: 'Paint Unit',
        body: 'A destructive paint tool: smear, slide or stamp pixels straight off your own image.',
        href: 'https://rappde.github.io/paint_unit/',
        hrefLabel: 'Open',
      },
    ],
    githubLabel: 'All repositories',
    githubHref: GITHUB,
    guideLabel: 'Datamoshing guide',
    guideHref: '/datamoshing',
  },

  contact: {
    forLine: 'Contact.',
    email: 'demien.rp@gmail.com',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    ctaPrimary: 'Write me',
    portfolioLabel: 'Portfolio (PDF)',
    portfolioHref: '/mappe-demien-rapp.pdf',
    links: [
      { label: 'LinkedIn', handle: 'in/demien-rapp', href: 'https://www.linkedin.com/in/demien-rapp-983b8a1ab/' },
      { label: 'Instagram', handle: '@rappde_', href: 'https://www.instagram.com/rappde_' },
      { label: 'YouTube', handle: '@demienrapp', href: 'https://www.youtube.com/@demienrapp' },
      { label: 'GitHub', handle: 'rappde', href: GITHUB },
    ],
  },

  footer: {
    legalLinks: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Privacy', href: '/datenschutz' },
    ],
  },
}
