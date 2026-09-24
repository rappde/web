import type { Content } from './types'

const GITHUB = 'https://github.com/rappde'

// Deutsche Version (/de). Texte sind Rohmaterial, Demien überarbeitet sie
// selbst (REDESIGN-BRIEF §6). Der Soundwalk-Text ist der Original-Rohtext 1:1.
// Deutsche Suchbegriffe (Düsseldorf, Filmwerkstatt, Videoinstallation,
// Soundarbeit) sind bewusst in Meta + Texten platziert (§1b).
export const de: Content = {
  lang: 'de',
  htmlLang: 'de',
  path: '/de',

  meta: {
    title: 'Demien Rapp · Konzept, Design, Code & Produktion',
    description:
      'Demien Rapp arbeitet zwischen Konzept, Design, Technik und Produktion, Film, Soundarbeit, Videoinstallation und selbst gebaute Visual-Tools in Düsseldorf. Filmwerkstatt, K21, „Fehler als Material".',
    ogTitle: 'Demien Rapp · Konzept · Design · Code · Produktion',
    ogDescription:
      'Film, Sound, Videoinstallation und selbst gebaute Visual-Tools. „Fehler als Material". Ein Blick auf die Arbeit von Demien Rapp, Düsseldorf.',
  },

  nav: {
    skip: 'Zum Inhalt springen',
    links: [
      { id: 'work', label: 'Werke' },
      { id: 'tools', label: 'Tools' },
      { id: 'contact', label: 'Kontakt' },
    ],
    cta: 'Schreib mir',
  },

  hero: {
    nameLine1: 'DEMIEN',
    nameLine2: 'RAPP',
    intro:
      'Ich gehe in Räume, in denen ich der am wenigsten Erfahrene bin, und gehe, wenn das nicht mehr stimmt. 18, Düsseldorf. Elektronik, Code, Film, Foto, 3D-Druck. Jedes Projekt braucht die Werkzeuge, die es braucht.',
    ctaPrimary: 'Schreib mir',
    ctaSecondary: 'Zu den Werken',
  },

  ticker: {
    label: 'Als Nächstes',
    items: [
      { date: '10. Okt 2026', text: 'Uncut Award, Filmwerkstatt Düsseldorf · Mitorganisation' },
      { text: 'Offen für Aufträge, Ausstellungen & Kooperationen →' },
    ],
  },

  works: {
    title: 'Werke · 2024 → 2026',
    viewLabel: 'Projekt ansehen',
    archiveLabel: 'Archiv',
    items: [
      {
        id: 'mine',
        index: '00',
        year: '2026',
        date: '30. Jun 2026',
        featured: true,
        slug: 'mine',
        teaser: 'Eine interaktive Installation, die sich nur bewegt, wenn sie beobachtet wird. Ausgezeichnet mit Publikums- und Jurypreis im Lernort Studio Düsseldorf.',
        title: 'mine',
        role: 'Interaktive Installation',
        medium: 'Klann-Mechanismus-Roboter · Ultraschallsensoren · ESP',
        place: 'Lernort Studio Düsseldorf',
        body: [
          'Der 19. Gestaltungswettbewerb zum Thema „zwischen Form und Restform" im Lernort Studio Düsseldorf. mine ist eine interaktive Installation, die sich nur bewegt, wenn sie beobachtet wird. Tritt jemand näher, läuft sie schneller und strengt sich an, wie erwartet zu funktionieren.',
          'Alles selbst gebaut: ein Laufroboter auf einem Klann-Mechanismus, die Teile 3D-gedruckt und anschließend von Hand nachbearbeitet und lackiert, bis sie bewusst wie Metall wirken. Er steht auf einem Tisch, den ich für die Ausstellung gebaut habe, mit Ultraschallsensoren in der Oberfläche, verbunden mit einem ESP; je näher ein Besucher kommt, desto mehr strengt er sich an.',
          'Ein Kabel bindet sie an die Steckdose. Die Steckdose hält sie gefangen; sich loszureißen würde sie über die Tischkante tragen. Also läuft sie weiter, an der Stelle und in der Rolle, die ihr zugewiesen wurde, und kommt aus dem Versuch nicht heraus. Genau dort, zwischen der Form und dem, was vom Loslösen übrig bliebe, hält mine sich auf. Was passiert, wenn man versucht zu entkommen?',
          'Ausgezeichnet mit dem Publikumspreis und dem Jurypreis.',
        ],
        awards: [
          'Publikumspreis, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026',
          'Jurypreis, 19. Gestaltungswettbewerb, Lernort Studio Düsseldorf 2026',
        ],
        media: {
          aspect: '3 / 2',
          kind: 'image',
          src: '/images/mine.jpg',
          alt: 'mine: ein schwarz-weißes Foto eines niedrigen, spinnenartigen Laufroboters aus 3D-gedruckten Gestängen auf einem dunklen Tisch, von Hand metallisch lackiert und mit einem dünnen Kabel gefesselt.',
        },
      },
      {
        id: 'knisternder-bahnhof',
        index: '01',
        year: '2024',
        date: '2024',
        title: 'Knisternder Bahnhof',
        role: 'Circuit Bending · Fotografie',
        medium: 'Fotoserie',
        place: 'Lernort Studio',
        body: [
          'Eine billige Kinder-Kamera, auseinandergebaut und per Circuit Bending umgebaut, sie erzeugt glitchende, verrauschte, sehr bunte Bilder. Damit habe ich den Düsseldorfer Hauptbahnhof fotografiert, ohne Nachbearbeitung.',
        ],
        note: 'Circuit Bending: das gezielte Kurzschließen und Verändern der Elektronik eines Geräts, um unvorhersehbare Fehlfunktionen als künstlerischen Effekt zu nutzen.',
        media: {
          aspect: '2 / 3',
          kind: 'image',
          src: '/images/knisternder-bahnhof.jpg',
          alt: 'Knisternder Bahnhof: ein Raster aus 24 glitchenden, sehr bunten Fotografien des Düsseldorfer Hauptbahnhofs, aufgenommen mit einer Circuit-Bending-Kamera.',
        },
        links: [
          { label: 'Rahmende Schatten 2024', href: 'https://lernort-studio.de/rahmende-schatten-2024/' },
        ],
      },
      {
        id: 'soiree-de-brioche',
        index: '02',
        year: '2024',
        date: 'Ende 2024',
        title: 'Soirée de Brioche',
        role: 'DOP · Kamera · Foto · Co-Regie',
        medium: 'Spielfilm',
        place: 'Premiere · Metropol Kino Düsseldorf',
        body: [
          'Ein Drama über ein getrennt aufgewachsenes Zwillingspaar und mein erster großer Film. Ich war Director of Photography, Kamera, Foto und teils Regie; Premiere im Metropol Kino Düsseldorf.',
        ],
        media: {
          aspect: '4 / 3',
          kind: 'image',
          src: '/images/soiree-de-brioche.jpg',
          alt: 'Cover-Still aus dem Spielfilm Soirée de Brioche.',
        },
      },
      {
        id: 'ein-viertel',
        index: '03',
        year: '2025',
        date: 'Nov 2024 – März 2025',
        featured: true,
        slug: 'ein-viertel',
        teaser: '1/4 ist mein Beitrag zu BE A TRANSFORMER!, einem gemeinschaftlichen 5×12-m-Banner im K21: 100 Ereignisse dieses Jahrhunderts als KI-Bilder.',
        title: '1/4',
        role: 'Digitale KI-Collage',
        medium: 'Banner 5 × 12 m · Teil von BE A TRANSFORMER!',
        place: 'K21 Düsseldorf',
        body: [
          'BE A TRANSFORMER! ist ein gemeinschaftliches 5×12-m-Banner im K21. 1/4 ist mein Teil davon: 100 gesellschaftlich und politisch relevante Ereignisse dieses Jahrhunderts, als KI-Bilder generiert und zu einem Bild zusammengesetzt.',
        ],
        media: {
          aspect: '12 / 5',
          kind: 'image',
          src: '/images/ein-viertel-banner.jpg',
          alt: 'Das 5×12-m-Banner BE A TRANSFORMER! an der Kuppelwand im K21; 1/4 ist Demiens KI-Collage aus 100 Ereignissen dieses Jahrhunderts.',
        },
      },
      {
        id: 'gefuehle',
        index: '04',
        year: '2025',
        date: '4. Okt 2025',
        featured: true,
        slug: 'gefuehle',
        teaser: 'Drei gestapelte Röhrenfernseher, live von Besuchern zu Glitch-Video gemixt, ein Einblick in seine Welt.',
        title: 'Gefühle',
        role: 'Videoinstallation',
        medium: '3 Röhrenfernseher · analoger Video-Mixer',
        place: '„Wir sehen Rot" · Kollektiv Dings · Düsseldorf',
        body: [
          'Drei gestapelte Röhrenfernseher laufen über einen analogen Video-Mixer. Besucher mixen per Potentiometer ein Selbstporträt in stark verzerrte Edits aus Natur und Stadt, ein „dirty mix" meiner Welt. Gezeigt in der Gruppenausstellung „Wir sehen Rot" des Kollektivs Dings.',
          'Ausgezeichnet mit dem Publikumspreis beim 18. Gestaltungswettbewerb („Transparenz") im Lernort Studio Düsseldorf 2025.',
        ],
        awards: [
          'Publikumspreis, 18. Gestaltungswettbewerb „Transparenz", Lernort Studio Düsseldorf 2025',
        ],
        links: [
          { label: '18. Gestaltungswettbewerb 2025', href: 'https://lernort-studio.de/18_gestaltungswettbewerb/' },
          { label: 'Dings auf Instagram', href: 'https://www.instagram.com/dings.kultur' },
        ],
        media: {
          aspect: '4 / 3',
          kind: 'image',
          src: '/images/gefuehle.jpg',
          alt: '„Gefühle": drei gestapelte Röhrenfernseher mit Glitch-Video, daneben das Potentiometer-Stativ, mit dem Besucher das Bild mischen.',
        },
      },
      {
        id: 'uncut-2025',
        index: '05',
        year: '2025',
        date: '24. Okt 2025',
        title: '2491 · Last Slice',
        role: 'Regie (2491) · Kamera & Technik (Last Slice)',
        medium: 'Video · Kurzfilm',
        place: 'Uncut Award · Filmwerkstatt Düsseldorf',
        body: [
          'Mein eigener Beitrag „2491" wirft einen kritischen Blick auf Überwachung. Bei „Last Slice" war ich Kameramann und Techniker, dieser Film gewann den Publikumspreis.',
        ],
        media: {
          aspect: '5 / 4',
          kind: 'image',
          src: '/images/uncut-2025.jpg',
          alt: 'Standbild aus „2491" / „Last Slice", gezeigt beim Uncut Award.',
        },
      },
      {
        id: 'soundwalk',
        index: '06',
        year: '2026',
        date: '18. Apr 2026',
        featured: true,
        slug: 'soundwalk',
        teaser: 'Zwei Soundarbeiten aus biografischem Material, verarbeitet mit selbst gebauten algorithmischen Tools.',
        title: 'Soundwalk',
        role: 'Zwei Soundarbeiten',
        medium: 'Sound · algorithmische Verarbeitung',
        place: 'Werk:Klub · K21 Düsseldorf',
        body: [
          'Zwei Soundarbeiten aus Aufnahmen von Kindheit und 18. Geburtstag, verarbeitet mit selbst gebauten algorithmischen Tools, die den Ton schichten und verformen. Erinnerung als etwas, das sich mit jeder Wiedergabe neu formt. Entstanden im Werk:Klub im K21 Düsseldorf.',
        ],
        pull: [
          {
            label: 'Nr. 5 · 5 min',
            text: 'Erinnerung erzeugt keine Vergangenheit. Sie erzeugt dich. Chaotisch. Unklar. Nebelig.',
          },
          {
            label: 'Nr. 7 · 7 min',
            text: 'Erinnerung ist kein Speicher. Sie erfindet. Immer wieder. Was du für wahr hältst war vielleicht nie so.',
          },
        ],
        media: {
          aspect: '16 / 9',
          kind: 'image',
          src: '/images/soundwalk.jpg',
          alt: 'Die Soundwalk-Soundarbeiten im K21, zwei Stücke aus biografischem Material.',
        },
      },
      {
        id: 'uncut-2026',
        index: '07',
        year: '2026',
        date: '10. Okt 2026',
        status: 'upcoming',
        statusLabel: 'Kommend',
        title: 'Uncut Award 2026',
        role: 'Technik · Darstellung · Social Media · Produktion',
        medium: 'Filmwettbewerb · Mitorganisation',
        place: 'Filmwerkstatt Düsseldorf',
        body: [
          'Mitorganisator des Uncut Award an der Filmwerkstatt Düsseldorf, Technik, Darstellung, Social Media. Findet am 10. Oktober 2026 statt.',
        ],
        media: {
          aspect: '16 / 9',
          kind: 'image',
          alt: 'Platzhalter für den kommenden Uncut Award 2026 in der Filmwerkstatt Düsseldorf, mitorganisiert von Demien Rapp.',
        },
      },
    ],
  },

  workPage: {
    back: 'Zurück zu den Werken',
    more: 'Mehr Arbeiten',
  },

  tools: {
    title: 'Selbst gebaute Tools',
    items: [
      {
        id: 'mosh-unit',
        name: 'MOSH_UNIT',
        body: 'Ein Video-Glitch-Tool für Windows: Datamosh-Effekte auf Clips malen und als MP4 exportieren.',
        href: '/mosh_unit',
        hrefLabel: 'Ansehen',
      },
      {
        id: 'compression-unit',
        name: 'Compression Unit',
        body: 'Ein Tool für visuelle Effekte: kontrollierte JPEG-Artefakte und Kompressions-„Damage".',
        href: 'https://rappde.github.io/compression_unit/',
        hrefLabel: 'Öffnen',
      },
      {
        id: 'displacement-unit',
        name: 'Displacement Unit',
        body: 'Ein brutalistischer Signalprozessor: Pixel werden per Luminanz verschoben, aus Bild, Video oder Live-Kamera.',
        href: 'https://rappde.github.io/displacement_unit/',
        hrefLabel: 'Öffnen',
      },
      {
        id: 'paint-unit',
        name: 'Paint Unit',
        body: 'Ein destruktives Paint-Tool: Pixel im eigenen Bild verschmieren, verschieben oder stempeln.',
        href: 'https://rappde.github.io/paint_unit/',
        hrefLabel: 'Öffnen',
      },
    ],
    githubLabel: 'Alle Repositories',
    githubHref: GITHUB,
    guideLabel: 'Datamoshing-Guide',
    guideHref: '/datamoshing',
  },

  contact: {
    forLine: 'Kontakt.',
    email: 'demien.rp@gmail.com',
    copyLabel: 'Kopieren',
    copiedLabel: 'Kopiert',
    ctaPrimary: 'Schreib mir',
    portfolioLabel: 'Mappe (PDF)',
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
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
}
