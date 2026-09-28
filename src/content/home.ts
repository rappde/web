/* Startseite (EN "/" + DE "/de"). Uebernommen aus v2, fuer die kompakte
   Ansicht gekuerzt. Es gibt keine eigenen Werkseiten, alles steht hier.
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
  /** Eintrag in der Taskbar */
  label: string
  /** sichtbare Ueberschrift im Panel: "Titel, Jahr" */
  title: string
  year: string
  desc: HomePara[]
  /** Bild rechts neben dem Text (3:2, formatfuellend) */
  image?: { src: string; alt: string }
  /** statt Bild: Galerie unter dem Text, Originalverhaeltnis */
  gallery?: { src: string; alt: string; caption: string; full?: boolean }[]
  /** Platzhalter, solange ein Bild fehlt */
  placeholder?: string
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
    ],
    qrLabel: 'QR code, links to a portrait',
    qrAlt: 'QR code linking to a portrait of Demien Rapp',
    profilesLabel: 'Profiles elsewhere',
    worksLabel: 'Works',
    surprise: 'Eisbär',
    works: [
      {
        id: 'mine',
        label: 'mine',
        title: 'mine',
        year: '2026',
        desc: [
          P('I built a robot that reacts to how close its visitors are: the closer someone steps up to it, the faster it starts to walk.'),
          P('The twist: it cannot move freely through the room. It is chained to a power socket.'),
          P('It won both the Audience Award and the Jury Award at the 19th Gestaltungswettbewerb at Lernort Studio Düsseldorf.'),
        ],
        image: {
          src: '/images/mine.jpg',
          alt: 'mine: a black-and-white photograph of a low, spider-like walking robot built from 3D-printed linkages, hand-lacquered to a metallic look, on a dark table and tethered by a thin cable.',
        },
      },
      {
        id: 'gefuehle',
        label: 'gefühle',
        title: 'gefühle',
        year: '2025',
        desc: [
          P('Three stacked CRT TVs run through an analogue video mixer. Visitors turn potentiometers to mix a self-portrait into heavily distorted edits of nature and city, a “dirty mix” of my world.'),
          P('It won the Audience Award at the 18th Gestaltungswettbewerb at Lernort Studio Düsseldorf.'),
        ],
        image: {
          src: '/images/gefuehle.jpg',
          alt: '“gefühle”: three stacked CRT televisions showing glitched video, with the potentiometer stand visitors turn to mix the image.',
        },
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        title: 'Soundwalk',
        year: '2026',
        desc: [
          P('Two sound works built from childhood and 18th-birthday recordings, processed with self-built algorithmic tools that layer and deform the sound. Memory as something that reshapes with every playback. Made in the Werk:Klub at K21 Düsseldorf.'),
          { lead: 'Nr. 5 · 5 min', break: true, text: 'Memory does not produce a past. It produces you. Chaotic. Unclear. Foggy.' },
          { lead: 'Nr. 7 · 7 min', break: true, text: 'Memory is not a storage device. It invents. Again and again. What you held to be true may never have been so.' },
        ],
        image: {
          src: '/images/soundwalk.jpg',
          alt: 'The Soundwalk sound works at K21, two pieces built from biographical recordings.',
        },
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        title: '1/4',
        year: '2025',
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
      },
      {
        id: 'uncut-2025',
        label: '2491',
        title: '2491',
        year: '2025',
        desc: [
          P('I made the short film 2491 and submitted it to the Uncut Award 2025 at the Filmwerkstatt Düsseldorf. A project against surveillance.'),
          { lead: 'Also in 2025:', text: 'I was the cameraman on the film project Last Slice, which went on to win the Audience Award.' },
        ],
        image: { src: '/images/uncut-2025.jpg', alt: 'Still from the short film 2491, shown at the Uncut Award.' },
      },
      {
        id: 'soiree-de-brioche',
        label: 'Soirée de Brioche',
        title: 'Soirée de Brioche',
        year: '2024',
        desc: [
          P('A drama about twins raised apart, and my first large film. I was director of photography, camera, stills and part of the direction; it premiered at the Metropol Kino Düsseldorf.'),
        ],
        image: { src: '/images/soiree-de-brioche.jpg', alt: 'Cover still from the feature film Soirée de Brioche.' },
      },
      {
        id: 'knisternder-bahnhof',
        label: 'Knisternder Bahnhof',
        title: 'Knisternder Bahnhof',
        year: '2024',
        desc: [
          P('I reinvented a cheap camera by circuit bending it, and shot a photo series with it in Düsseldorf.'),
          { lead: 'Circuit bending:', text: 'deliberately short-circuiting and altering a device’s electronics until it malfunctions in unpredictable ways. That is where these glitched, noisy, intensely colourful images come from.' },
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
        label: 'Uncut Award',
        title: 'Uncut Award',
        year: '2026',
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
    ],
    qrLabel: 'QR-Code, führt zu einem Porträt',
    qrAlt: 'QR-Code, der zu einem Porträt von Demien Rapp führt',
    profilesLabel: 'Profile',
    worksLabel: 'Arbeiten',
    surprise: 'Eisbär',
    works: [
      {
        id: 'mine',
        label: 'mine',
        title: 'mine',
        year: '2026',
        desc: [
          P('Ich habe einen Roboter gebaut, der auf die Nähe der Besucher reagiert: Je näher jemand an ihn herantritt, desto schneller fängt er an zu laufen.'),
          P('Das Besondere: Er kann sich nicht frei im Raum bewegen. Er ist an eine Steckdose gekettet.'),
          P('Ausgezeichnet mit dem Publikumspreis und dem Jurypreis beim 19. Gestaltungswettbewerb im Lernort Studio Düsseldorf.'),
        ],
        image: {
          src: '/images/mine.jpg',
          alt: 'mine: ein schwarz-weißes Foto eines niedrigen, spinnenartigen Laufroboters aus 3D-gedruckten Gestängen auf einem dunklen Tisch, von Hand metallisch lackiert und mit einem dünnen Kabel gefesselt.',
        },
      },
      {
        id: 'gefuehle',
        label: 'gefühle',
        title: 'gefühle',
        year: '2025',
        desc: [
          P('Drei gestapelte Röhrenfernseher laufen über einen analogen Video-Mixer. Besucher mixen per Potentiometer ein Selbstporträt in stark verzerrte Edits aus Natur und Stadt, ein „dirty mix“ meiner Welt.'),
          P('Ausgezeichnet mit dem Publikumspreis beim 18. Gestaltungswettbewerb im Lernort Studio Düsseldorf.'),
        ],
        image: {
          src: '/images/gefuehle.jpg',
          alt: '„gefühle“: drei gestapelte Röhrenfernseher mit Glitch-Video, daneben das Potentiometer-Stativ, mit dem Besucher das Bild mischen.',
        },
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        title: 'Soundwalk',
        year: '2026',
        desc: [
          P('Zwei Soundarbeiten aus Aufnahmen von Kindheit und 18. Geburtstag, verarbeitet mit selbst gebauten algorithmischen Tools, die den Ton schichten und verformen. Erinnerung als etwas, das sich mit jeder Wiedergabe neu formt. Entstanden im Werk:Klub im K21 Düsseldorf.'),
          { lead: 'Nr. 5 · 5 min', break: true, text: 'Erinnerung erzeugt keine Vergangenheit. Sie erzeugt dich. Chaotisch. Unklar. Nebelig.' },
          { lead: 'Nr. 7 · 7 min', break: true, text: 'Erinnerung ist kein Speicher. Sie erfindet. Immer wieder. Was du für wahr hältst war vielleicht nie so.' },
        ],
        image: {
          src: '/images/soundwalk.jpg',
          alt: 'Die Soundwalk-Soundarbeiten im K21, zwei Stücke aus biografischem Material.',
        },
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        title: '1/4',
        year: '2025',
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
      },
      {
        id: 'uncut-2025',
        label: '2491',
        title: '2491',
        year: '2025',
        desc: [
          P('Ich habe den Kurzfilm 2491 gemacht und beim Uncut Award 2025 in der Filmwerkstatt Düsseldorf eingereicht. Ein Projekt gegen Überwachung.'),
          { lead: 'Außerdem 2025:', text: 'Beim Filmprojekt Last Slice war ich Kameramann, der Film hat den Publikumspreis gewonnen.' },
        ],
        image: { src: '/images/uncut-2025.jpg', alt: 'Standbild aus dem Kurzfilm 2491, gezeigt beim Uncut Award.' },
      },
      {
        id: 'soiree-de-brioche',
        label: 'Soirée de Brioche',
        title: 'Soirée de Brioche',
        year: '2024',
        desc: [
          P('Ein Drama über ein getrennt aufgewachsenes Zwillingspaar und mein erster großer Film. Ich war Director of Photography, Kamera, Foto und teils Regie; Premiere im Metropol Kino Düsseldorf.'),
        ],
        image: { src: '/images/soiree-de-brioche.jpg', alt: 'Cover-Still aus dem Spielfilm Soirée de Brioche.' },
      },
      {
        id: 'knisternder-bahnhof',
        label: 'Knisternder Bahnhof',
        title: 'Knisternder Bahnhof',
        year: '2024',
        desc: [
          P('Ich habe eine billige Kamera neu erfunden, indem ich sie per Circuit Bending umgebaut habe, und damit eine Fotoserie in Düsseldorf gemacht.'),
          { lead: 'Circuit Bending:', text: 'das gezielte Kurzschließen und Verändern der Elektronik eines Geräts, bis es unvorhersehbar fehlerhaft arbeitet. Daher kommen diese glitchenden, verrauschten, sehr bunten Bilder.' },
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
        label: 'Uncut Award',
        title: 'Uncut Award',
        year: '2026',
        desc: [
          P('Mitorganisator des Uncut Award an der Filmwerkstatt Düsseldorf, Technik, Darstellung, Social Media. Findet am 10. Oktober 2026 statt.'),
        ],
        placeholder: 'Uncut Award 2026',
      },
    ],
  },
}
