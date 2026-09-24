import type { Lang } from './types'

// About page copy. Kept short and text-only (no photo yet — hero portrait
// TODO tracks that separately, see TODO.md #4). Deliberately trims two
// unrelated part-time service jobs from the CV (Mbassy Lifestyle, Mare
// Atlantico) and the electronics-repair/resale side job (Demien: doesn't
// want that framing on the portfolio) — not relevant to an engineering/art
// portfolio; full list still lives in the downloadable PDF and the vault CV.
export interface AboutTimelineItem {
  period: string
  text: string
}

export interface AboutContent {
  lang: Lang
  path: string
  meta: {
    title: string
    description: string
  }
  eyebrow: string
  title: string
  intro: string[]
  timelineTitle: string
  timeline: AboutTimelineItem[]
  educationTitle: string
  education: AboutTimelineItem[]
  skillsTitle: string
  skills: string[]
  languagesTitle: string
  languages: string
  ctaText: string
  ctaLabel: string
  backLabel: string
}

export const about: Record<Lang, AboutContent> = {
  en: {
    lang: 'en',
    path: '/about',
    meta: {
      title: 'About · Demien Rapp',
      description:
        'Demien Rapp, 18, based in Düsseldorf. Engineering and art: electronics, code, film, photo, 3D printing. Background, education, focus areas.',
    },
    eyebrow: 'About',
    title: 'Demien Rapp',
    intro: [
      "18, based in Düsseldorf. Grew up with technology, self-taught throughout: electronics first, then full systems. My work sits at the intersection of engineering and art, physical robots, generative browser tools, kinetic installations. Exhibited at K21 Düsseldorf and Kunstraum Nilsson.",
      "I walk into rooms where I'm the least experienced person, and leave when that's no longer true.",
    ],
    timelineTitle: 'Experience',
    timeline: [
      { period: '02/2026', text: 'Internship at Backpack Films, Düsseldorf. Video editing, camera work, set build.' },
      { period: '02/2023–05/2023', text: 'Ran my own Scratch coding course for kids.' },
    ],
    educationTitle: 'Education',
    education: [
      { period: 'Expected 2027', text: 'Abitur (German high school diploma), Görres-Gymnasium Düsseldorf.' },
      { period: '2023', text: 'CODDY × VMK MGU: web development with Python/Django, 75 hours.' },
      { period: 'Since 04/2024', text: 'Photography and graphic design course.' },
    ],
    skillsTitle: 'Focus areas',
    skills: [
      'Electronics & hardware',
      'Code: Python, HTML/CSS, microcontrollers (ESP32, Arduino, C/C++)',
      'CAD & 3D printing (Fusion 360)',
      'Photo & video: camera work, DaVinci Resolve, Photoshop',
      'Custom software: FastAPI, SQLite',
    ],
    languagesTitle: 'Languages',
    languages: 'German (native), Russian (C2), Lithuanian (C1), English (B2).',
    ctaText: 'Building something, or need someone who builds?',
    ctaLabel: 'Write me',
    backLabel: 'Back to home',
  },
  de: {
    lang: 'de',
    path: '/de/about',
    meta: {
      title: 'Über mich · Demien Rapp',
      description:
        'Demien Rapp, 18, aus Düsseldorf. Engineering und Kunst: Elektronik, Code, Film, Foto, 3D-Druck. Werdegang, Ausbildung, Fachgebiete.',
    },
    eyebrow: 'Über mich',
    title: 'Demien Rapp',
    intro: [
      'Ich bin 18 und komme aus Düsseldorf. Mit Technik aufgewachsen, alles autodidaktisch: erst Elektronik, dann ganze Systeme. Meine Arbeit sitzt an der Schnittstelle von Engineering und Kunst, physische Roboter, generative Browser-Tools, kinetische Installationen. Ausgestellt bei K21 Düsseldorf und Kunstraum Nilsson.',
      'Ich gehe in Räume, in denen ich der am wenigsten Erfahrene bin, und gehe, wenn das nicht mehr stimmt.',
    ],
    timelineTitle: 'Werdegang',
    timeline: [
      { period: '02/2026', text: 'Praktikum Backpack Films, Düsseldorf. Videoschnitt, Kameraarbeit, Set-Aufbau.' },
      { period: '02/2023–05/2023', text: 'Leitung eines eigenen Scratch-Programmierkurses für Kinder.' },
    ],
    educationTitle: 'Ausbildung',
    education: [
      { period: 'Voraussichtlich 2027', text: 'Abitur, Görres-Gymnasium Düsseldorf.' },
      { period: '2023', text: 'CODDY × VMK MGU: Webentwicklung mit Python/Django, 75 Stunden.' },
      { period: 'Seit 04/2024', text: 'Fotografie- und Grafikdesign-Kurs.' },
    ],
    skillsTitle: 'Fachgebiete',
    skills: [
      'Elektronik & Hardware',
      'Code: Python, HTML/CSS, Mikrocontroller (ESP32, Arduino, C/C++)',
      'CAD & 3D-Druck (Fusion 360)',
      'Foto & Video: Kamera, DaVinci Resolve, Photoshop',
      'Custom Software: FastAPI, SQLite',
    ],
    languagesTitle: 'Sprachen',
    languages: 'Deutsch (Muttersprache), Russisch (C2), Litauisch (C1), Englisch (B2).',
    ctaText: 'Baust du gerade was, oder brauchst du jemanden der baut?',
    ctaLabel: 'Schreib mir',
    backLabel: 'Zurück zur Startseite',
  },
}
