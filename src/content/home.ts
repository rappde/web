/* Startseite (EN "/" + DE "/de"). Uebernommen aus v2, fuer die kompakte
   Ansicht gekuerzt. Die deutschen Texte stammen aus content.de.ts.
   Google erkennt die Sprache einer Seite nur am sichtbaren Text, darum ist
   /de eine echte Uebersetzung und nicht dieselbe Seite mit anderem lang.
   TODO Demien: Bild fuer Uncut Award 2026 fehlt noch. */

import type { Lang } from './types'

/** Ein Absatz. `lead` wird kursiv vorangestellt, mit Zeilenumbruch (`break`)
    oder direkt davor. */
export interface HomePara {
  lead?: string
  break?: boolean
  text: string
}

export interface HomeWork {
  id: string
  label: string
  /** unsichtbare Ueberschrift fuer Screenreader, "Titel, Jahr" */
  heading: string
  meta: string
  desc: HomePara[]
  /** Bild rechts neben dem Text (3:2, formatfuellend) */
  image?: { src: string; alt: string }
  /** statt Bild: Galerie unter dem Text, Originalverhaeltnis */
  gallery?: { src: string; alt: string; caption: string; full?: boolean }[]
  /** Platzhalter, solange ein Bild fehlt */
  placeholder?: string
  /** eigene Werkseite /works/<slug> */
  page?: string
}

export interface HomeContent {
  lang: Lang
  path: string
  title: string
  description: string
  skip: string
  intro: string[]
  qrLabel: string
  qrAlt: string
  profilesLabel: string
  worksLabel: string
  fullPage: string
  about: string
  surprise: string
  works: HomeWork[]
}

const P = (text: string): HomePara => ({ text })

export const home: Record<Lang, HomeContent> = {
  en: {
    lang: 'en',
    path: '/',
    title: 'Demien Rapp. Creative Generalist, Düsseldorf',
    description:
      'Demien Rapp is a creative generalist and solo developer based in Düsseldorf. Work at the intersection of engineering and art: physical robots, generative browser tools, kinetic installations.',
    skip: 'Skip to content',
    intro: [
      'Creative generalist and solo developer based in Düsseldorf. Work at the intersection of engineering and art: physical robots, generative browser tools, kinetic installations.',
      'Self-taught, grown up with technology, from a childhood YouTube channel through electronics repair to exhibited works. Function over aesthetics.',
    ],
    qrLabel: 'QR code, links to a portrait',
    qrAlt: 'QR code linking to a portrait of Demien Rapp',
    profilesLabel: 'Profiles elsewhere',
    worksLabel: 'Works',
    fullPage: 'Full project page →',
    about: 'About',
    surprise: '▓▒░ Surprise ░▒▓',
    works: [
      {
        id: 'mine',
        label: 'mine',
        heading: 'mine, 2026',
        meta: 'Interactive installation · Klann-linkage robot, ultrasonic sensors, ESP · Lernort Studio Düsseldorf',
        desc: [
          P('The 19th Gestaltungswettbewerb, on the theme “between form and residual form”, at Lernort Studio Düsseldorf. mine is an interactive installation that only moves when it is watched. Step closer and it runs faster, straining to function as expected.'),
          P('Everything is self-built: a walking robot on a Klann linkage, its parts 3D-printed and then finished and lacquered by hand into a deliberate metallic look. It stands on a table I built for the show, with ultrasonic sensors set into the surface and wired to an ESP; the closer a visitor comes, the harder it works.'),
          P('A power cable binds it to the socket. The socket holds it captive; tearing loose would carry it over the edge of the table. So it keeps going, in the place and the role it was assigned, unable to escape the attempt. Between the form and what would be left of breaking free, mine stays put. What happens when you try to escape?'),
          P('It won both the Audience Award and the Jury Award.'),
        ],
        image: {
          src: '/images/mine.jpg',
          alt: 'mine: a black-and-white photograph of a low, spider-like walking robot built from 3D-printed linkages, hand-lacquered to a metallic look, on a dark table and tethered by a thin cable.',
        },
        page: 'mine',
      },
      {
        id: 'gefuehle',
        label: 'Gefühle',
        heading: 'Gefühle, 2025',
        meta: 'Video installation · 3 CRT TVs, analogue video mixer · “Wir sehen Rot”, Kollektiv Dings, Düsseldorf',
        desc: [
          P('Three stacked CRT TVs run through an analogue video mixer. Visitors turn potentiometers to mix a self-portrait into heavily distorted edits of nature and city, a “dirty mix” of my world. Shown in the group exhibition “Wir sehen Rot” by the collective Dings.'),
          P('It won the Audience Award at the 18th Gestaltungswettbewerb (“Transparenz”) at Lernort Studio Düsseldorf in 2025.'),
        ],
        image: {
          src: '/images/gefuehle.jpg',
          alt: '“Gefühle”: three stacked CRT televisions showing glitched video, with the potentiometer stand visitors turn to mix the image.',
        },
        page: 'gefuehle',
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        heading: 'Soundwalk, 2026',
        meta: 'Two sound works · Sound, algorithmic processing · Werk:Klub, K21 Düsseldorf',
        desc: [
          P('Two sound works built from childhood and 18th-birthday recordings, processed with self-built algorithmic tools that layer and deform the sound. Memory as something that reshapes with every playback. Made in the Werk:Klub at K21 Düsseldorf.'),
          { lead: 'Nr. 5 · 5 min', break: true, text: 'Memory does not produce a past. It produces you. Chaotic. Unclear. Foggy.' },
          { lead: 'Nr. 7 · 7 min', break: true, text: 'Memory is not a storage device. It invents. Again and again. What you held to be true may never have been so.' },
        ],
        image: {
          src: '/images/soundwalk.jpg',
          alt: 'The Soundwalk sound works at K21, two pieces built from biographical recordings.',
        },
        page: 'soundwalk',
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        heading: '1/4, 2025',
        meta: 'Digital AI collage · Banner 5 × 12 m, part of BE A TRANSFORMER! · K21 Düsseldorf',
        desc: [
          P('BE A TRANSFORMER! is a collaborative 5 × 12 m banner shown at K21. 1/4 is my part of it: 100 socially and politically significant events of this century, generated as AI images and composed into a single picture.'),
        ],
        gallery: [
          {
            src: '/images/ein-viertel-banner.jpg',
            alt: "The 5 × 12 m BE A TRANSFORMER! banner on the dome wall at K21; 1/4 is Demien's AI collage of 100 events of this century.",
            caption: 'BE A TRANSFORMER!, 5 × 12 m, K21 Düsseldorf',
            full: true,
          },
        ],
        page: 'ein-viertel',
      },
      {
        id: 'uncut-2025',
        label: '2491 · Last Slice',
        heading: '2491 · Last Slice, 2025',
        meta: 'Director (2491) · Camera and technical lead (Last Slice) · Uncut Award, Filmwerkstatt Düsseldorf',
        desc: [
          P('My own entry “2491” takes a critical look at surveillance. On “Last Slice” I was cameraman and technical lead, and that film won the Audience Award.'),
        ],
        image: { src: '/images/uncut-2025.jpg', alt: 'Still from “2491” / “Last Slice”, shown at the Uncut Award.' },
      },
      {
        id: 'soiree-de-brioche',
        label: 'Soirée de Brioche',
        heading: 'Soirée de Brioche, 2024',
        meta: 'DOP · Camera · Stills · Co-direction · Premiere at Metropol Kino Düsseldorf',
        desc: [
          P('A drama about twins raised apart, and my first large film. I was director of photography, camera, stills and part of the direction; it premiered at the Metropol Kino Düsseldorf.'),
        ],
        image: { src: '/images/soiree-de-brioche.jpg', alt: 'Cover still from the feature film Soirée de Brioche.' },
      },
      {
        id: 'knisternder-bahnhof',
        label: 'Knisternder Bahnhof',
        heading: 'Knisternder Bahnhof, 2024',
        meta: 'Circuit bending · Photo series · Lernort Studio',
        desc: [
          P('A cheap children’s camera taken apart and rebuilt through circuit bending, it renders glitched, noisy, intensely colourful images. I shot Düsseldorf’s main station with it, no post-processing.'),
          { lead: 'Circuit bending:', text: 'deliberately short-circuiting and altering a device’s electronics to turn unpredictable malfunctions into an artistic effect.' },
        ],
        gallery: [
          {
            src: '/images/knisternder-bahnhof.jpg',
            alt: 'Knisternder Bahnhof: a grid of 24 glitched, intensely colourful photographs of Düsseldorf main station, shot on a circuit-bent camera.',
            caption: '24 shots, Düsseldorf main station',
          },
        ],
      },
      {
        id: 'uncut-2026',
        label: 'Uncut Award 2026',
        heading: 'Uncut Award 2026',
        meta: 'Upcoming · Tech, presentation, social media, production · Filmwerkstatt Düsseldorf',
        desc: [
          P('Co-organiser of the Uncut Award at the Filmwerkstatt Düsseldorf, technology, presentation, social media. Taking place 10 October 2026.'),
        ],
        placeholder: 'Uncut Award 2026',
      },
    ],
  },

  de: {
    lang: 'de',
    path: '/de',
    title: 'Demien Rapp. Künstler und Entwickler aus Düsseldorf',
    description:
      'Demien Rapp ist Künstler und Entwickler aus Düsseldorf. Arbeiten zwischen Technik und Kunst: Roboter, interaktive Installationen, Videoinstallationen, Soundarbeiten und selbst gebaute Browser-Tools.',
    skip: 'Zum Inhalt springen',
    intro: [
      'Künstler und Entwickler aus Düsseldorf. Arbeiten an der Schnittstelle von Technik und Kunst: Roboter, generative Browser-Tools, kinetische und interaktive Installationen.',
      'Autodidakt, mit Technik aufgewachsen, vom YouTube-Kanal als Kind über Elektronik-Reparatur bis zu ausgestellten Werken. Funktion vor Ästhetik.',
    ],
    qrLabel: 'QR-Code, führt zu einem Porträt',
    qrAlt: 'QR-Code, der zu einem Porträt von Demien Rapp führt',
    profilesLabel: 'Profile',
    worksLabel: 'Arbeiten',
    fullPage: 'Zur Projektseite →',
    about: 'Über mich',
    surprise: '▓▒░ Überraschung ░▒▓',
    works: [
      {
        id: 'mine',
        label: 'mine',
        heading: 'mine, 2026',
        meta: 'Interaktive Installation · Klann-Mechanismus-Roboter, Ultraschallsensoren, ESP · Lernort Studio Düsseldorf',
        desc: [
          P('Der 19. Gestaltungswettbewerb zum Thema „zwischen Form und Restform“ im Lernort Studio Düsseldorf. mine ist eine interaktive Installation, die sich nur bewegt, wenn sie beobachtet wird. Tritt jemand näher, läuft sie schneller und strengt sich an, wie erwartet zu funktionieren.'),
          P('Alles selbst gebaut: ein Laufroboter auf einem Klann-Mechanismus, die Teile 3D-gedruckt und anschließend von Hand nachbearbeitet und lackiert, bis sie bewusst wie Metall wirken. Er steht auf einem Tisch, den ich für die Ausstellung gebaut habe, mit Ultraschallsensoren in der Oberfläche, verbunden mit einem ESP; je näher ein Besucher kommt, desto mehr strengt er sich an.'),
          P('Ein Kabel bindet sie an die Steckdose. Die Steckdose hält sie gefangen; sich loszureißen würde sie über die Tischkante tragen. Also läuft sie weiter, an der Stelle und in der Rolle, die ihr zugewiesen wurde, und kommt aus dem Versuch nicht heraus. Genau dort, zwischen der Form und dem, was vom Loslösen übrig bliebe, hält mine sich auf. Was passiert, wenn man versucht zu entkommen?'),
          P('Ausgezeichnet mit dem Publikumspreis und dem Jurypreis.'),
        ],
        image: {
          src: '/images/mine.jpg',
          alt: 'mine: ein schwarz-weißes Foto eines niedrigen, spinnenartigen Laufroboters aus 3D-gedruckten Gestängen auf einem dunklen Tisch, von Hand metallisch lackiert und mit einem dünnen Kabel gefesselt.',
        },
        page: 'mine',
      },
      {
        id: 'gefuehle',
        label: 'Gefühle',
        heading: 'Gefühle, 2025',
        meta: 'Videoinstallation · 3 Röhrenfernseher, analoger Video-Mixer · „Wir sehen Rot“, Kollektiv Dings, Düsseldorf',
        desc: [
          P('Drei gestapelte Röhrenfernseher laufen über einen analogen Video-Mixer. Besucher mixen per Potentiometer ein Selbstporträt in stark verzerrte Edits aus Natur und Stadt, ein „dirty mix“ meiner Welt. Gezeigt in der Gruppenausstellung „Wir sehen Rot“ des Kollektivs Dings.'),
          P('Ausgezeichnet mit dem Publikumspreis beim 18. Gestaltungswettbewerb („Transparenz“) im Lernort Studio Düsseldorf 2025.'),
        ],
        image: {
          src: '/images/gefuehle.jpg',
          alt: '„Gefühle“: drei gestapelte Röhrenfernseher mit Glitch-Video, daneben das Potentiometer-Stativ, mit dem Besucher das Bild mischen.',
        },
        page: 'gefuehle',
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        heading: 'Soundwalk, 2026',
        meta: 'Zwei Soundarbeiten · Sound, algorithmische Verarbeitung · Werk:Klub, K21 Düsseldorf',
        desc: [
          P('Zwei Soundarbeiten aus Aufnahmen von Kindheit und 18. Geburtstag, verarbeitet mit selbst gebauten algorithmischen Tools, die den Ton schichten und verformen. Erinnerung als etwas, das sich mit jeder Wiedergabe neu formt. Entstanden im Werk:Klub im K21 Düsseldorf.'),
          { lead: 'Nr. 5 · 5 min', break: true, text: 'Erinnerung erzeugt keine Vergangenheit. Sie erzeugt dich. Chaotisch. Unklar. Nebelig.' },
          { lead: 'Nr. 7 · 7 min', break: true, text: 'Erinnerung ist kein Speicher. Sie erfindet. Immer wieder. Was du für wahr hältst war vielleicht nie so.' },
        ],
        image: {
          src: '/images/soundwalk.jpg',
          alt: 'Die Soundwalk-Soundarbeiten im K21, zwei Stücke aus biografischem Material.',
        },
        page: 'soundwalk',
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        heading: '1/4, 2025',
        meta: 'Digitale KI-Collage · Banner 5 × 12 m, Teil von BE A TRANSFORMER! · K21 Düsseldorf',
        desc: [
          P('BE A TRANSFORMER! ist ein gemeinschaftliches 5 × 12 m großes Banner im K21. 1/4 ist mein Teil davon: 100 gesellschaftlich und politisch relevante Ereignisse dieses Jahrhunderts, als KI-Bilder generiert und zu einem Bild zusammengesetzt.'),
        ],
        gallery: [
          {
            src: '/images/ein-viertel-banner.jpg',
            alt: 'Das 5 × 12 m große Banner BE A TRANSFORMER! an der Kuppelwand im K21; 1/4 ist Demiens KI-Collage aus 100 Ereignissen dieses Jahrhunderts.',
            caption: 'BE A TRANSFORMER!, 5 × 12 m, K21 Düsseldorf',
            full: true,
          },
        ],
        page: 'ein-viertel',
      },
      {
        id: 'uncut-2025',
        label: '2491 · Last Slice',
        heading: '2491 · Last Slice, 2025',
        meta: 'Regie (2491) · Kamera und Technik (Last Slice) · Uncut Award, Filmwerkstatt Düsseldorf',
        desc: [
          P('Mein eigener Beitrag „2491“ wirft einen kritischen Blick auf Überwachung. Bei „Last Slice“ war ich Kameramann und Techniker, dieser Film gewann den Publikumspreis.'),
        ],
        image: { src: '/images/uncut-2025.jpg', alt: 'Standbild aus „2491“ / „Last Slice“, gezeigt beim Uncut Award.' },
      },
      {
        id: 'soiree-de-brioche',
        label: 'Soirée de Brioche',
        heading: 'Soirée de Brioche, 2024',
        meta: 'DOP · Kamera · Foto · Co-Regie · Premiere im Metropol Kino Düsseldorf',
        desc: [
          P('Ein Drama über ein getrennt aufgewachsenes Zwillingspaar und mein erster großer Film. Ich war Director of Photography, Kamera, Foto und teils Regie; Premiere im Metropol Kino Düsseldorf.'),
        ],
        image: { src: '/images/soiree-de-brioche.jpg', alt: 'Cover-Still aus dem Spielfilm Soirée de Brioche.' },
      },
      {
        id: 'knisternder-bahnhof',
        label: 'Knisternder Bahnhof',
        heading: 'Knisternder Bahnhof, 2024',
        meta: 'Circuit Bending · Fotoserie · Lernort Studio',
        desc: [
          P('Eine billige Kinder-Kamera, auseinandergebaut und per Circuit Bending umgebaut, sie erzeugt glitchende, verrauschte, sehr bunte Bilder. Damit habe ich den Düsseldorfer Hauptbahnhof fotografiert, ohne Nachbearbeitung.'),
          { lead: 'Circuit Bending:', text: 'das gezielte Kurzschließen und Verändern der Elektronik eines Geräts, um unvorhersehbare Fehlfunktionen als künstlerischen Effekt zu nutzen.' },
        ],
        gallery: [
          {
            src: '/images/knisternder-bahnhof.jpg',
            alt: 'Knisternder Bahnhof: ein Raster aus 24 glitchenden, sehr bunten Fotografien des Düsseldorfer Hauptbahnhofs, aufgenommen mit einer Circuit-Bending-Kamera.',
            caption: '24 Aufnahmen, Düsseldorf Hauptbahnhof',
          },
        ],
      },
      {
        id: 'uncut-2026',
        label: 'Uncut Award 2026',
        heading: 'Uncut Award 2026',
        meta: 'Kommend · Technik, Darstellung, Social Media, Produktion · Filmwerkstatt Düsseldorf',
        desc: [
          P('Mitorganisator des Uncut Award an der Filmwerkstatt Düsseldorf, Technik, Darstellung, Social Media. Findet am 10. Oktober 2026 statt.'),
        ],
        placeholder: 'Uncut Award 2026',
      },
    ],
  },
}
