/* MOSH_UNIT product page content — EN + DE, page-scoped (pattern: legal.ts).
   All media arrays are data-driven: drop files into public/mosh/ and add an
   entry here; the page renders aspect-locked placeholders until a src exists.
   No em-dashes in any copy (site rule). */

export const ITCH_USER = 'rappde'
export const ITCH_GAME = 'mosh-unit'
export const ITCH_URL = `https://${ITCH_USER}.itch.io/${ITCH_GAME}`

/* Tutorial video (install & usage), lite-facade YouTube embed at the end of the
   page. No iframe/third-party request until the visitor clicks (site rule #7);
   the poster below is self-hosted. TODO(Demien): replace TUTORIAL_VIDEO_ID with
   the real 11-char YouTube id, drop the 1280x720 poster at public/assets/, and
   adjust the chapter timecodes in `tutorial.chapters` (en + de) to the cut. */
export const TUTORIAL_VIDEO_ID = 'VIDEO_ID' // <-- replace with the YouTube id
export const TUTORIAL_THUMB = '/assets/mosh-unit-tutorial.webp' // 1280x720, 16:9
export const TUTORIAL_DURATION_ISO = 'PT7M' // ~7 min, for VideoObject JSON-LD
export const TUTORIAL_UPLOAD_DATE = '2026-07-15' // first public date of the video

/* Canonical MOSH_UNIT description — the single source of truth for the product
   entity. Reused verbatim by the product-page <meta>, the SoftwareApplication
   JSON-LD (MoshUnitSeo) and public/llms.txt so the entity reads identically
   across every surface (GEO entity consistency). Em-dash-free and price-free by
   site rule. If you change EN here, mirror it in public/llms.txt by hand. */
export const MOSH_DESCRIPTION =
  'MOSH_UNIT is a Windows desktop tool that turns ordinary video into datamoshing glitch art by bending the compressed byte stream, with no After Effects, no plugins, and no subscription.'
export const MOSH_DESCRIPTION_DE =
  'MOSH_UNIT ist ein Windows-Desktop-Tool, das gewöhnliches Video in Datamoshing-Glitch-Art verwandelt, indem es den komprimierten Byte-Stream verbiegt. Ohne After Effects, ohne Plugins, ohne Abo.'

export type MoshLang = 'en' | 'de'

export interface MoshEffect {
  id: string
  name: string
  blurb: string
  /** demo loop, H.264 MP4, e.g. "/mosh/moshunit-bloom-datamosh-demo.mp4" */
  video?: string
  /** smaller VP9 WebM of the same clip, offered before the MP4 */
  webm?: string
  /** poster still, shown until the first frame paints (no blank/black box) */
  poster?: string
}

export interface MoshScreenshot {
  id: string
  image?: string
  /** short public caption shown on the placeholder chip, e.g. "Main interface" */
  label: string
  alt: string
}

export interface MoshFaqItem {
  q: string
  a: string
}

export interface MoshUnitContent {
  lang: MoshLang
  htmlLang: string
  path: string
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    kicker: string
    tagline: string
    /** one short subhead line under the tagline (the single value prop) */
    intro: string
    ctaPrimary: string
    ctaSecondary: string
    /** small line beside the hero price, e.g. "one-time · Windows" */
    priceNote: string
    facts: string[]
  }
  demo: {
    title: string
    lede: string
    /** label prefix on the stage strip, e.g. "Now playing" */
    nowPlaying: string
    /** short line above the under-demo buy button, e.g. "Like what you see?" */
    ctaLine: string
    stackedHint: string
    /** short line shown under the effect name while no demo video exists yet */
    comingSoon: string
    effects: MoshEffect[]
  }
  workflow: {
    title: string
    steps: { name: string; body: string }[]
  }
  features: {
    title: string
    items: { name: string; body: string }[]
  }
  screenshots: {
    title: string
    comingSoon: string
    items: MoshScreenshot[]
  }
  pricing: {
    title: string
    priceNow: string
    priceLater: string
    earlyLabel: string
    laterLabel: string
    bullets: string[]
    cta: string
    onItch: string
    requirements: string
  }
  faq: {
    title: string
    items: MoshFaqItem[]
  }
  /** cross-links into the datamoshing content hub (GEO) */
  learn: {
    label: string
    links: { label: string; href: string }[]
  }
  /** install & usage video (lite-facade YouTube embed) at the end of the page */
  tutorial: {
    title: string
    lede: string
    /** short runtime chip next to the heading, e.g. "7 min" */
    runtime: string
    /** small heading above the chapter list */
    chaptersLabel: string
    /** aria-label prefix for the poster play button */
    playLabel: string
    /** aria-label prefix for a chapter jump button */
    jumpLabel: string
    /** <noscript> link text */
    watchOnYouTube: string
    /** alt text for the self-hosted poster */
    thumbAlt: string
    /** chapters (timecodes are placeholders, adjust to the final cut) */
    chapters: { time: string; seconds: number; label: string }[]
  }
}

const effectsEn: MoshEffect[] = [
  {
    id: 'bloom',
    name: 'BLOOM',
    blurb: 'Turn movement into flowing digital trails and visual explosions. Motion piles up and blooms across the picture.',
    video: '/mosh/moshunit-bloom-datamosh-demo.mp4',
    webm: '/mosh/moshunit-bloom-datamosh-demo.webm',
    poster: '/mosh/moshunit-bloom-datamosh-demo.jpg',
  },
  {
    id: 'reverse',
    name: 'REVERSE',
    blurb: 'Motion crawls backwards through the frame. Backwards-moving distortions with a strange, liquid feel.',
    video: '/mosh/moshunit-reverse-datamosh-demo.mp4',
    webm: '/mosh/moshunit-reverse-datamosh-demo.webm',
    poster: '/mosh/moshunit-reverse-datamosh-demo.jpg',
  },
  {
    id: 'shuffle',
    name: 'SHUFFLE',
    blurb: 'Frames scramble into unpredictable digital chaos. Every render lands a little different.',
    video: '/mosh/moshunit-shuffle-datamosh-demo.mp4',
    webm: '/mosh/moshunit-shuffle-datamosh-demo.webm',
    poster: '/mosh/moshunit-shuffle-datamosh-demo.jpg',
  },
  {
    id: 'stacked',
    name: 'STACKED',
    blurb: 'The real power: pile effects onto the same zone and reorder the stack. Freeze into a bloom, reverse the chaos. Different orders, different results.',
    video: '/mosh/moshunit-stacked-datamosh-demo.mp4',
    webm: '/mosh/moshunit-stacked-datamosh-demo.webm',
    poster: '/mosh/moshunit-stacked-datamosh-demo.jpg',
  },
  {
    id: 'transition',
    name: 'MELT / TRANSITION',
    blurb: 'Melt one clip into the next instead of a hard cut. Motion bleeds across the seam into a liquid transition.',
    video: '/mosh/moshunit-melt-transition-datamosh-demo.mp4',
    webm: '/mosh/moshunit-melt-transition-datamosh-demo.webm',
    poster: '/mosh/moshunit-melt-transition-datamosh-demo.jpg',
  },
]

const effectsDe: MoshEffect[] = [
  {
    id: 'bloom',
    name: 'BLOOM',
    blurb: 'Bewegung wird zu fließenden digitalen Spuren und visuellen Explosionen. Motion staut sich und blüht übers Bild.',
    video: '/mosh/moshunit-bloom-datamosh-demo.mp4',
    webm: '/mosh/moshunit-bloom-datamosh-demo.webm',
    poster: '/mosh/moshunit-bloom-datamosh-demo.jpg',
  },
  {
    id: 'reverse',
    name: 'REVERSE',
    blurb: 'Bewegung kriecht rückwärts durchs Bild. Verzerrungen mit einem seltsamen, flüssigen Gefühl.',
    video: '/mosh/moshunit-reverse-datamosh-demo.mp4',
    webm: '/mosh/moshunit-reverse-datamosh-demo.webm',
    poster: '/mosh/moshunit-reverse-datamosh-demo.jpg',
  },
  {
    id: 'shuffle',
    name: 'SHUFFLE',
    blurb: 'Frames verwürfeln sich zu unvorhersehbarem digitalem Chaos. Jeder Render fällt etwas anders aus.',
    video: '/mosh/moshunit-shuffle-datamosh-demo.mp4',
    webm: '/mosh/moshunit-shuffle-datamosh-demo.webm',
    poster: '/mosh/moshunit-shuffle-datamosh-demo.jpg',
  },
  {
    id: 'stacked',
    name: 'STACKED',
    blurb: 'Die eigentliche Stärke: Effekte auf derselben Zone stapeln und umsortieren. Freeze in einen Bloom, das Chaos rückwärts. Andere Reihenfolge, anderes Ergebnis.',
    video: '/mosh/moshunit-stacked-datamosh-demo.mp4',
    webm: '/mosh/moshunit-stacked-datamosh-demo.webm',
    poster: '/mosh/moshunit-stacked-datamosh-demo.jpg',
  },
  {
    id: 'transition',
    name: 'MELT / TRANSITION',
    blurb: 'Ein Clip schmilzt in den nächsten statt hart zu schneiden. Bewegung blutet über die Naht in einen flüssigen Übergang.',
    video: '/mosh/moshunit-melt-transition-datamosh-demo.mp4',
    webm: '/mosh/moshunit-melt-transition-datamosh-demo.webm',
    poster: '/mosh/moshunit-melt-transition-datamosh-demo.jpg',
  },
]

export const moshUnit: Record<MoshLang, MoshUnitContent> = {
  en: {
    lang: 'en',
    htmlLang: 'en',
    path: '/mosh_unit',
    meta: {
      title: 'MOSH_UNIT · Video glitch tool for datamosh effects',
      description: MOSH_DESCRIPTION,
      ogTitle: 'MOSH_UNIT · Break videos. Create something new.',
      ogDescription:
        'Datamosh visuals without complicated editing software: import clips, draw effects, export MP4. Offline, one-time purchase, by Demien Rapp.',
    },
    hero: {
      kicker: 'A tool by Demien Rapp',
      tagline: 'Break videos. Create something new.',
      intro:
        'Draw glitch effects straight onto your video and watch it come apart. Real datamoshing, no After Effects, no plugins.',
      ctaPrimary: 'Get MOSH_UNIT',
      ctaSecondary: 'Try the demo',
      priceNote: 'one-time · Windows',
      facts: ['One-time purchase', 'Works offline', 'No subscription'],
    },
    demo: {
      title: 'Draw effects. Endless combinations.',
      lede: 'Tap an effect to preview it. A taste of the tool, not the full app.',
      nowPlaying: 'Now playing',
      ctaLine: 'Like what you see?',
      stackedHint: 'Effects get really interesting when you stack them.',
      comingSoon: 'Demo clip coming soon',
      effects: effectsEn,
    },
    workflow: {
      title: 'Import. Draw. Export.',
      steps: [
        { name: 'Import', body: 'Drag your clips onto the timeline.' },
        { name: 'Draw', body: 'Draw effects onto a clip, stack them, melt clips together.' },
        { name: 'Export', body: 'Preview, then save a normal MP4 with sound.' },
      ],
    },
    features: {
      title: 'What it does',
      items: [
        { name: 'Real datamoshing, not a filter', body: 'The compressed video stream itself gets bent, so the glitch is real, not an overlay on top.' },
        { name: 'Draw it on, no keyframes', body: 'Mark the zone where the glitch should hit. No keyframes, no node graphs.' },
        { name: 'Stack and reorder', body: 'Pile effects on one zone and reorder them. A different order, a different result.' },
        { name: 'MP4 with sound that reacts', body: 'Export a normal MP4. Your audio stays and stutters along with the effects.' },
      ],
    },
    screenshots: {
      title: 'The app',
      comingSoon: 'Screenshot coming soon',
      items: [
        { id: 's1', image: '/mosh/moshunit-interface-timeline.jpg', label: 'Main interface', alt: 'MOSH_UNIT main window: the video timeline with clips, the datamoshing effect toolbar (bloom, freeze, reverse, shuffle) and the preview.' },
        { id: 's2', image: '/mosh/moshunit-drawing-effect-zone.jpg', label: 'Drawing effects', alt: 'Drawing a datamosh effect zone across a clip on the MOSH_UNIT timeline.' },
        { id: 's3', image: '/mosh/moshunit-effect-stacking-inspector.jpg', label: 'Effect stacking', alt: 'The MOSH_UNIT inspector showing a stacked datamoshing effect zone with the effects reordered.' },
      ],
    },
    pricing: {
      title: 'One price. Yours forever.',
      priceNow: '$7.99',
      priceLater: '$9.99',
      earlyLabel: 'Early access',
      laterLabel: 'later',
      bullets: ['One-time purchase, no subscription', 'All early-access updates included', 'Works completely offline', 'Windows 10 / 11 (64-bit)'],
      cta: 'Get MOSH_UNIT',
      onItch: 'on itch.io',
      requirements: 'Requires 64-bit Windows 10 or 11. FFmpeg is included, nothing else to install.',
    },
    faq: {
      title: 'Questions',
      items: [
        { q: 'Does MOSH_UNIT work offline?', a: 'Yes, completely. Everything renders locally on your machine. No account, no cloud, no upload.' },
        { q: 'Which systems are supported?', a: '64-bit Windows 10 and 11. FFmpeg ships with the download, so there is nothing else to install.' },
        { q: 'Is it beginner friendly?', a: 'Yes. You import clips, draw where the effect should hit, and export. No keyframes, no technical terms, undo for everything.' },
        { q: 'Does it keep my audio?', a: 'Yes. Your original sound is preserved and stutters naturally along with the effects, so picture and sound stay in sync.' },
        { q: 'Is this a subscription?', a: 'No. You pay once and keep the tool. Early-access buyers get the updates.' },
        { q: 'What can I create with it?', a: 'Music visuals, glitch edits for social media, VJ material, experimental film textures, intros, transitions. Anything where footage melting into itself looks right.' },
        { q: 'Does it use AI?', a: 'No. MOSH_UNIT bends the actual compressed video stream (real datamoshing). The results come from your footage and your decisions, not from a model.' },
      ],
    },
    learn: {
      label: 'New to datamoshing?',
      links: [
        { label: 'What is datamoshing?', href: '/datamoshing' },
        { label: 'How to datamosh', href: '/how-to-datamosh' },
        { label: 'Tools compared', href: '/datamoshing-tools' },
      ],
    },
    tutorial: {
      title: 'Installation & usage',
      lede: 'A short walkthrough: about two minutes to install, then the tool in action. Jump straight to the demo with the chapters.',
      runtime: '7 min',
      chaptersLabel: 'Chapters',
      playLabel: 'Play tutorial video',
      jumpLabel: 'Jump to',
      watchOnYouTube: 'Watch the tutorial on YouTube',
      thumbAlt: 'MOSH_UNIT tutorial: install the Windows tool, then datamosh a first clip.',
      chapters: [
        { time: '00:00', seconds: 0, label: 'Download' },
        { time: '00:40', seconds: 40, label: 'Installation' },
        { time: '02:10', seconds: 130, label: 'Import your first clip' },
        { time: '02:50', seconds: 170, label: 'Draw an effect' },
        { time: '03:40', seconds: 220, label: 'Stack effects' },
        { time: '04:40', seconds: 280, label: 'Melt / transition' },
        { time: '05:30', seconds: 330, label: 'Export MP4' },
      ],
    },
  },

  de: {
    lang: 'de',
    htmlLang: 'de',
    path: '/de/mosh_unit',
    meta: {
      title: 'MOSH_UNIT · Video-Glitch-Tool für Datamosh-Effekte',
      description: MOSH_DESCRIPTION_DE,
      ogTitle: 'MOSH_UNIT · Break videos. Create something new.',
      ogDescription:
        'Datamosh-Visuals ohne komplizierte Schnittsoftware: Clips importieren, Effekte aufmalen, MP4 exportieren. Offline, Einmalkauf, von Demien Rapp.',
    },
    hero: {
      kicker: 'Ein Tool von Demien Rapp',
      tagline: 'Break videos. Create something new.',
      intro:
        'Mal Glitch-Effekte direkt auf dein Video und sieh zu, wie es zerfällt. Echtes Datamoshing, kein After Effects, keine Plugins.',
      ctaPrimary: 'MOSH_UNIT holen',
      ctaSecondary: 'Demo ansehen',
      priceNote: 'Einmalkauf · Windows',
      facts: ['Einmalkauf', 'Läuft offline', 'Kein Abo'],
    },
    demo: {
      title: 'Effekte aufmalen. Endlose Kombinationen.',
      lede: 'Tipp einen Effekt zum Ansehen an. Ein Vorgeschmack, nicht die ganze App.',
      nowPlaying: 'Läuft gerade',
      ctaLine: 'Gefällt dir, was du siehst?',
      stackedHint: 'Richtig interessant wird es, wenn du Effekte stapelst.',
      comingSoon: 'Demo-Clip kommt bald',
      effects: effectsDe,
    },
    workflow: {
      title: 'Import. Draw. Export.',
      steps: [
        { name: 'Importieren', body: 'Clips auf die Timeline ziehen.' },
        { name: 'Aufmalen', body: 'Effekte auf einen Clip malen, stapeln, Clips ineinander schmelzen.' },
        { name: 'Exportieren', body: 'Vorschau, dann als normales MP4 mit Ton speichern.' },
      ],
    },
    features: {
      title: 'Was es kann',
      items: [
        { name: 'Echtes Datamoshing, kein Filter', body: 'Der komprimierte Videostream selbst wird verbogen, der Glitch ist echt, kein Overlay obendrauf.' },
        { name: 'Draufmalen, keine Keyframes', body: 'Zone markieren, wo der Glitch hinsoll. Keine Keyframes, keine Node-Graphen.' },
        { name: 'Stapeln und umsortieren', body: 'Effekte auf einer Zone stapeln und umsortieren. Andere Reihenfolge, anderes Ergebnis.' },
        { name: 'MP4 mit Ton, der mitgeht', body: 'Als normales MP4 exportieren. Dein Audio bleibt und stottert mit den Effekten mit.' },
      ],
    },
    screenshots: {
      title: 'Die App',
      comingSoon: 'Screenshot kommt bald',
      items: [
        { id: 's1', image: '/mosh/moshunit-interface-timeline.jpg', label: 'Hauptansicht', alt: 'MOSH_UNIT-Hauptfenster: die Video-Timeline mit Clips, die Datamoshing-Effektleiste (Bloom, Freeze, Reverse, Shuffle) und die Vorschau.' },
        { id: 's2', image: '/mosh/moshunit-drawing-effect-zone.jpg', label: 'Effekte aufmalen', alt: 'Eine Datamosh-Effektzone wird über den Filmstreifen eines Clips auf der MOSH_UNIT-Timeline gezogen.' },
        { id: 's3', image: '/mosh/moshunit-effect-stacking-inspector.jpg', label: 'Effekte stapeln', alt: 'Der MOSH_UNIT-Inspector zeigt eine gestapelte Datamoshing-Effektzone mit umsortierten Effekten.' },
      ],
    },
    pricing: {
      title: 'Ein Preis. Für immer deins.',
      priceNow: '$7.99',
      priceLater: '$9.99',
      earlyLabel: 'Early Access',
      laterLabel: 'später',
      bullets: ['Einmalkauf, kein Abo', 'Alle Early-Access-Updates inklusive', 'Läuft komplett offline', 'Windows 10 / 11 (64-Bit)'],
      cta: 'MOSH_UNIT holen',
      onItch: 'auf itch.io',
      requirements: 'Braucht 64-Bit Windows 10 oder 11. FFmpeg liegt bei, sonst muss nichts installiert werden.',
    },
    faq: {
      title: 'Fragen',
      items: [
        { q: 'Läuft MOSH_UNIT offline?', a: 'Ja, komplett. Alles rendert lokal auf deinem Rechner. Kein Konto, keine Cloud, kein Upload.' },
        { q: 'Welche Systeme werden unterstützt?', a: '64-Bit Windows 10 und 11. FFmpeg liegt dem Download bei, es muss nichts weiter installiert werden.' },
        { q: 'Ist es einsteigerfreundlich?', a: 'Ja. Clips importieren, aufmalen, wo der Effekt hinsoll, exportieren. Keine Keyframes, keine Fachbegriffe, Undo für alles.' },
        { q: 'Bleibt mein Ton erhalten?', a: 'Ja. Dein Original-Sound bleibt und stottert natürlich mit den Effekten mit, Bild und Ton bleiben synchron.' },
        { q: 'Ist das ein Abo?', a: 'Nein. Einmal zahlen, Tool behalten. Early-Access-Käufer bekommen die Updates.' },
        { q: 'Was kann ich damit machen?', a: 'Musikvisuals, Glitch-Edits für Social Media, VJ-Material, experimentelle Filmtexturen, Intros, Übergänge. Alles, wo schmelzendes Material richtig aussieht.' },
        { q: 'Nutzt es KI?', a: 'Nein. MOSH_UNIT verbiegt den komprimierten Videostream selbst (echtes Datamoshing). Die Ergebnisse kommen aus deinem Material und deinen Entscheidungen, nicht aus einem Modell.' },
      ],
    },
    learn: {
      label: 'Neu bei Datamoshing?',
      links: [
        { label: 'Was ist Datamoshing?', href: '/datamoshing' },
        { label: 'How to datamosh', href: '/how-to-datamosh' },
        { label: 'Tools im Vergleich', href: '/datamoshing-tools' },
      ],
    },
    tutorial: {
      title: 'Installation & Benutzung',
      lede: 'Ein kurzer Durchlauf: rund zwei Minuten Installation, danach das Tool in Aktion. Mit den Kapiteln direkt zum Demo-Teil springen.',
      runtime: '7 Min',
      chaptersLabel: 'Kapitel',
      playLabel: 'Tutorial-Video abspielen',
      jumpLabel: 'Springe zu',
      watchOnYouTube: 'Tutorial auf YouTube ansehen',
      thumbAlt: 'MOSH_UNIT-Tutorial: das Windows-Tool installieren, dann den ersten Clip datamoshen.',
      chapters: [
        { time: '00:00', seconds: 0, label: 'Download' },
        { time: '00:40', seconds: 40, label: 'Installation' },
        { time: '02:10', seconds: 130, label: 'Erste Datei moshen' },
        { time: '02:50', seconds: 170, label: 'Effekt aufmalen' },
        { time: '03:40', seconds: 220, label: 'Effekte stapeln' },
        { time: '04:40', seconds: 280, label: 'Melt / Übergang' },
        { time: '05:30', seconds: 330, label: 'MP4 exportieren' },
      ],
    },
  },
}
