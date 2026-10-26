/* Startseite, EN unter "/" und DE unter "/de". /de ist eine echte
   Uebersetzung, Google erkennt die Sprache nur am sichtbaren Text.
   TODO: Bild fuer Uncut Award 2026 fehlt noch. */

import type { Lang } from './types'

/** Ein Absatz. `lead` wird kursiv vorangestellt, mit Zeilenumbruch (`break`)
    oder direkt davor. In `text` und `lead` wird [Wort](https://…) zum Link,
    der in einem neuen Tab aufgeht. */
export interface HomePara {
  lead?: string
  break?: boolean
  /** groesser gesetzter Absatz, z. B. Aufruf zum Ausleihen */
  big?: boolean
  text: string
  /** selbst gehostete Audiodatei, Player unter dem Absatz */
  audio?: string
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
  /** statt Bild: erstes Bild neben dem Text, die weiteren darunter (Originalverhaeltnis).
      Ist das erste `full`, steht alles unter dem Text. Mit `poster` ist der
      Eintrag ein Video ohne Ton. */
  gallery?: { src: string; alt: string; caption?: string; full?: boolean; poster?: string }[]
  /** statt Bild: Video ohne Ton, `poster` bis zum Abspielen */
  video?: { src: string; poster: string; label: string }
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
  /** letzte Intro-Zeile, `link` fuehrt aufs Manifest */
  contact: { text: string; link: string }
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
      '19, Düsseldorf. I use technology as a medium to express my world. I build installations, software and machines. Whatever I need, I bring into reality.',
    ],
    contact: { text: 'Write me. Or read the', link: 'manifest' },
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
        gallery: [
          { src: '/images/mine-publikum.mp4', poster: '/images/mine-publikum.jpg', alt: 'mine: two visitors step up to the black plinth the robot stands on.' },
          { src: '/images/mine-silber.jpg', alt: 'The finished robot, lacquered silver, held in one hand above a street.' },
          { src: '/images/mine-prozess.jpg', alt: 'A single leg linkage of the robot held in a paint-stained hand above the workbench.' },
          { src: '/images/mine.jpg', alt: 'mine: a black-and-white photograph of a low, spider-like walking robot built from 3D-printed linkages, hand-lacquered to a metallic look, on a dark table and tethered by a thin cable.' },
          { src: '/images/mine-praesentation.mp4', poster: '/images/mine-praesentation.jpg', alt: 'The robot on its black plinth, tethered by a cable to a power socket, seen from several angles.' },
          { src: '/images/mine-unlackiert.mp4', poster: '/images/mine-unlackiert.jpg', alt: 'The robot before lacquering, black and yellow, held in one hand at the desk.' },
        ],
      },
      {
        id: 'photo-unit',
        label: 'PHOTO UNIT',
        title: 'PHOTO UNIT',
        year: '2026',
        desc: [
          P('I built a photo booth into a wine crate. Press the button, and a few seconds later your photo comes out of a label printer on thermal paper.'),
          P('Inside is a ThinkPad, plus a few 3D-printed parts. You can switch between different looks, and a QR code lets you download your photo straight to your phone. One label roll lasts for around 300 photos, so a whole evening.'),
          P('I kept everything as simple as possible: plug it in and it runs.'),
          { big: true, text: 'Want PHOTO UNIT at your event? I am very happy to lend it out. [Write me](mailto:demien.rp@gmail.com).' },
        ],
        gallery: [
          { src: '/images/photo-unit.jpg', alt: 'PHOTO UNIT: a black wooden crate with an upright screen in a white frame, showing a live dithered image under the words PHOTO UNIT and PRESS THE BUTTON, a round white button below.' },
          { src: '/images/photo-unit-prints.jpg', alt: 'A dozen dithered black-and-white prints scattered on a metal table, each with made by rappde.com underneath.' },
          { src: '/images/photo-unit-button.jpg', alt: 'Close-up of the crate front: the screen reads PRESS THE BUTTON with arrows pointing down to the round white button.' },
        ],
      },
      {
        id: 'mosh-unit',
        label: 'MOSH_UNIT',
        title: 'MOSH_UNIT',
        year: '2026',
        desc: [
          P('MOSH_UNIT is a Windows desktop tool I built that turns ordinary video into datamoshing glitch art by bending the compressed byte stream. You import clips, draw where the effect should hit, stack effects like BLOOM, FREEZE, REVERSE and SHUFFLE, and export an MP4.'),
          P('[Get MOSH_UNIT](/mosh_unit)'),
        ],
        gallery: [
          { src: '/mosh/moshunit-bloom-datamosh-demo.mp4', poster: '/mosh/moshunit-bloom-datamosh-demo.jpg', alt: 'MOSH_UNIT: a clip dissolving into smeared, blooming datamosh pixels.' },
          { src: '/mosh/moshunit-interface-timeline.jpg', alt: 'MOSH_UNIT interface with the clip timeline.' },
          { src: '/mosh/moshunit-drawing-effect-zone.jpg', alt: 'Drawing the zone in which the effect hits.' },
          { src: '/mosh/moshunit-effect-stacking-inspector.jpg', alt: 'Inspector with several stacked effects.' },
        ],
      },
      {
        id: 'gefuehle',
        label: 'gefühle',
        title: 'gefühle',
        year: '2025',
        desc: [
          P('Three stacked CRT TVs run through an analogue video mixer. Visitors turn potentiometers to mix a self-portrait into heavily distorted edits of nature and city, a “dirty mix” of my world.'),
          P('It won the Audience Award at the [18th Gestaltungswettbewerb at Lernort Studio Düsseldorf](https://lernort-studio.de/18_gestaltungswettbewerb/).'),
        ],
        gallery: [
          { src: '/images/gefuehle.jpg', alt: '“gefühle”: three stacked CRT televisions showing glitched video, with the potentiometer stand visitors turn to mix the image.' },
          { src: '/images/gefuehle-wir-sehen-rot.jpg', alt: 'Visitors in front of the stacked CRT televisions at the exhibition WIR SEHEN ROT!! by dings.' },
          { src: '/images/gefuehle-zine-seite.jpg', alt: 'A hand holds the exhibition zine open at the page about Demien Rapp, with a photo of the stacked televisions.' },
          { src: '/images/gefuehle-plakat-strasse.jpg', alt: 'Poster for dings. WIR SEHEN ROT!! in a display case on a street.' },
          { src: '/images/gefuehle-plakat.jpg', alt: 'Close-up of the poster: a red hand-drawn eye and the words dings, WIR SEHEN ROT.' },
          { src: '/images/gefuehle-zine.jpg', alt: 'Red zines laid out on a wooden counter next to a sign reading Zine & Plakat.' },
        ],
      },
      {
        id: 'glueck-exe',
        label: 'glück.exe',
        title: 'glück.exe',
        year: '2025',
        desc: [
          P('Nine floppy disks on a silver plate. Each one carries a part of happiness.'),
          P('Large programs once came on several disks. None of them ran alone. Happiness works the same way: it only exists when all of them come together.'),
          P('An Arduino shakes the disks at random, sometimes one, sometimes all at once, like a gift before it is opened. It never opens.'),
        ],
        video: {
          src: '/images/glueck-exe.mp4',
          poster: '/images/glueck-exe.jpg',
          label: 'glück.exe: nine floppy disks with handwritten labels on a silver plate, shaken at random by servo motors.',
        },
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        title: 'Soundwalk',
        year: '2026',
        desc: [
          P('Two sound works built from childhood and 18th-birthday recordings, processed with self-built algorithmic tools that layer and deform the sound. Memory as something that reshapes with every playback. Made in the Werk:Klub at [K21 Düsseldorf](https://www.kunstsammlung.de/en/).'),
          { lead: 'Nr. 5 · Erwachsenkdfsdhfdjmadherf · 5 min', break: true, audio: '/audio/soundwalk-5.mp3', text: 'Memory does not produce a past. It produces you. Chaotic. Unclear. Foggy.' },
          { lead: 'Nr. 7 · Kindsiuiuhfusadufnkskmdibi · 7 min', break: true, audio: '/audio/soundwalk-7.mp3', text: 'Memory is not a storage device. It invents. Again and again. What you held to be true may never have been so.' },
        ],
        gallery: [
          { src: '/images/soundwalk-qr-7.jpg', alt: 'A QR code printed on the stone floor at K21, labelled Demien Rapp, Kindsiuiuhfusadufnkskmdibi, 7:00, a visitor’s shoe at its edge.' },
          { src: '/images/soundwalk-hoeren.jpg', alt: 'A visitor listens to a piece on her phone after scanning a QR code on the floor.' },
          { src: '/images/soundwalk-qr-5.jpg', alt: 'QR code on the floor for Erwachsenkdfsdhfdjmadherf, 5:00.' },
          { src: '/images/soundwalk-boden.jpg', alt: 'The title Soundwalk, Projektpräsentation Werk:Klub, printed on the floor.' },
          { src: '/images/soundwalk-programm.jpg', alt: 'A visitor holds the printed programme of the Soundwalk behind their back.' },
          { src: '/images/soundwalk-rundgang.jpg', alt: 'Visitors gathered in the glass-roofed hall of K21 during the Soundwalk.' },
        ],
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        title: '1/4',
        year: '2025',
        desc: [
          P('[BE A TRANSFORMER!](https://lernort-studio.de/be-a-transformer/) is a collaborative 5 × 12 m banner shown at [K21](https://www.kunstsammlung.de/en/). 1/4 is my part of it: 100 socially and politically significant events of this century, generated as AI images and composed into a single picture.'),
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
          P('I made the short film [2491](https://youtu.be/7R7Ini7Ibq8) and submitted it to the [Uncut Award](https://www.uncut-award.de/) 2025 at the [Filmwerkstatt Düsseldorf](https://www.filmwerkstatt-duesseldorf.de/). A project against surveillance.'),
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
          { lead: '[Circuit bending](https://en.wikipedia.org/wiki/Circuit_bending):', text: 'deliberately short-circuiting and altering a device’s electronics until it malfunctions in unpredictable ways. That is where these glitched, noisy, intensely colourful images come from.' },
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
          P('Coming soon…'),
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
      '19, Düsseldorf. Ich nutze Technik als Medium, um meine Welt auszudrücken. Ich baue Installationen, Software und Maschinen. Was ich brauche, bringe ich in die Wirklichkeit.',
    ],
    contact: { text: 'Schreib mir. Oder lies das', link: 'Manifest' },
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
        gallery: [
          { src: '/images/mine-publikum.mp4', poster: '/images/mine-publikum.jpg', alt: 'mine: zwei Besucher treten an den schwarzen Sockel, auf dem der Roboter steht.' },
          { src: '/images/mine-silber.jpg', alt: 'Der fertige Roboter, silbern lackiert, in einer Hand über einer Straße.' },
          { src: '/images/mine-prozess.jpg', alt: 'Ein einzelnes Beingestänge des Roboters in einer farbverschmierten Hand über der Werkbank.' },
          { src: '/images/mine.jpg', alt: 'mine: ein schwarz-weißes Foto eines niedrigen, spinnenartigen Laufroboters aus 3D-gedruckten Gestängen auf einem dunklen Tisch, von Hand metallisch lackiert und mit einem dünnen Kabel gefesselt.' },
          { src: '/images/mine-praesentation.mp4', poster: '/images/mine-praesentation.jpg', alt: 'Der Roboter auf seinem schwarzen Sockel, per Kabel an eine Steckdose gefesselt, aus mehreren Blickwinkeln.' },
          { src: '/images/mine-unlackiert.mp4', poster: '/images/mine-unlackiert.jpg', alt: 'Der Roboter vor dem Lackieren, schwarz und gelb, in einer Hand am Schreibtisch.' },
        ],
      },
      {
        id: 'photo-unit',
        label: 'PHOTO UNIT',
        title: 'PHOTO UNIT',
        year: '2026',
        desc: [
          P('Ich habe eine Fotobox in eine Weinkiste gebaut. Du drückst den Knopf, und ein paar Sekunden später kommt dein Foto auf Thermopapier aus dem Etikettendrucker.'),
          P('Drin steckt ein ThinkPad, dazu ein paar 3D-gedruckte Teile. Du kannst zwischen verschiedenen Looks wählen, und über einen QR-Code lädst du dein Foto direkt aufs Handy. Eine Etikettenrolle reicht für rund 300 Fotos, also für einen ganzen Abend.'),
          P('Alles ist so einfach wie möglich gebaut: einstecken, läuft.'),
          { big: true, text: 'Du willst die PHOTO UNIT auf deinem Event? Ich verleihe sie sehr gerne. [Schreib mir](mailto:demien.rp@gmail.com).' },
        ],
        gallery: [
          { src: '/images/photo-unit.jpg', alt: 'PHOTO UNIT: eine schwarze Holzkiste mit hochkant stehendem Bildschirm in weißem Rahmen, darauf ein gedithertes Livebild unter den Worten PHOTO UNIT und PRESS THE BUTTON, darunter ein runder weißer Knopf.' },
          { src: '/images/photo-unit-prints.jpg', alt: 'Ein Dutzend geditherte Schwarz-Weiß-Drucke auf einem Metalltisch, unter jedem steht made by rappde.com.' },
          { src: '/images/photo-unit-button.jpg', alt: 'Nahaufnahme der Kistenfront: auf dem Bildschirm steht PRESS THE BUTTON, Pfeile zeigen auf den runden weißen Knopf.' },
        ],
      },
      {
        id: 'mosh-unit',
        label: 'MOSH_UNIT',
        title: 'MOSH_UNIT',
        year: '2026',
        desc: [
          P('MOSH_UNIT ist ein Windows-Desktop-Tool, das ich gebaut habe: Es verwandelt gewöhnliches Video in Datamoshing-Glitch-Art, indem es den komprimierten Byte-Stream verbiegt. Du importierst Clips, zeichnest ein, wo der Effekt greifen soll, stapelst Effekte wie BLOOM, FREEZE, REVERSE und SHUFFLE und exportierst ein MP4.'),
          P('[MOSH_UNIT holen](/de/mosh_unit)'),
        ],
        gallery: [
          { src: '/mosh/moshunit-bloom-datamosh-demo.mp4', poster: '/mosh/moshunit-bloom-datamosh-demo.jpg', alt: 'MOSH_UNIT: ein Clip zerfließt in verschmierte, aufblühende Datamosh-Pixel.' },
          { src: '/mosh/moshunit-interface-timeline.jpg', alt: 'Die Oberfläche von MOSH_UNIT mit der Clip-Timeline.' },
          { src: '/mosh/moshunit-drawing-effect-zone.jpg', alt: 'Einzeichnen der Zone, in der der Effekt greift.' },
          { src: '/mosh/moshunit-effect-stacking-inspector.jpg', alt: 'Inspector mit mehreren gestapelten Effekten.' },
        ],
      },
      {
        id: 'gefuehle',
        label: 'gefühle',
        title: 'gefühle',
        year: '2025',
        desc: [
          P('Drei gestapelte Röhrenfernseher laufen über einen analogen Video-Mixer. Besucher mixen per Potentiometer ein Selbstporträt in stark verzerrte Edits aus Natur und Stadt, ein „dirty mix“ meiner Welt.'),
          P('Ausgezeichnet mit dem Publikumspreis beim [18. Gestaltungswettbewerb im Lernort Studio Düsseldorf](https://lernort-studio.de/18_gestaltungswettbewerb/).'),
        ],
        gallery: [
          { src: '/images/gefuehle.jpg', alt: '„gefühle“: drei gestapelte Röhrenfernseher mit Glitch-Video, daneben das Potentiometer-Stativ, mit dem Besucher das Bild mischen.' },
          { src: '/images/gefuehle-wir-sehen-rot.jpg', alt: 'Besucher vor den gestapelten Röhrenfernsehern in der Ausstellung WIR SEHEN ROT!! von dings.' },
          { src: '/images/gefuehle-zine-seite.jpg', alt: 'Eine Hand hält das Ausstellungs-Zine auf der Seite über Demien Rapp aufgeschlagen, mit einem Foto der gestapelten Fernseher.' },
          { src: '/images/gefuehle-plakat-strasse.jpg', alt: 'Plakat von dings. WIR SEHEN ROT!! in einem Schaukasten an einer Straße.' },
          { src: '/images/gefuehle-plakat.jpg', alt: 'Nahaufnahme des Plakats: ein rot gezeichnetes Auge und die Worte dings, WIR SEHEN ROT.' },
          { src: '/images/gefuehle-zine.jpg', alt: 'Rote Zines auf einer Holztheke neben einem Schild mit der Aufschrift Zine & Plakat.' },
        ],
      },
      {
        id: 'glueck-exe',
        label: 'glück.exe',
        title: 'glück.exe',
        year: '2025',
        desc: [
          P('Neun Disketten auf einer silbernen Platte. Auf jeder steht ein Teil von Glück.'),
          P('Große Programme kamen früher auf mehreren Disketten. Keine lief allein. Mit Glück ist es genauso: Es entsteht erst aus allen zusammen.'),
          P('Ein Arduino schüttelt die Disketten per Zufall, mal eine, mal alle gleichzeitig, wie ein Geschenk vor dem Auspacken. Es geht nie auf.'),
        ],
        video: {
          src: '/images/glueck-exe.mp4',
          poster: '/images/glueck-exe.jpg',
          label: 'glück.exe: neun Disketten mit handschriftlichen Etiketten auf einer silbernen Platte, von Servomotoren zufällig geschüttelt.',
        },
      },
      {
        id: 'soundwalk',
        label: 'Soundwalk',
        title: 'Soundwalk',
        year: '2026',
        desc: [
          P('Zwei Soundarbeiten aus Aufnahmen von Kindheit und 18. Geburtstag, verarbeitet mit selbst gebauten algorithmischen Tools, die den Ton schichten und verformen. Erinnerung als etwas, das sich mit jeder Wiedergabe neu formt. Entstanden im Werk:Klub im [K21 Düsseldorf](https://www.kunstsammlung.de/de/).'),
          { lead: 'Nr. 5 · Erwachsenkdfsdhfdjmadherf · 5 min', break: true, audio: '/audio/soundwalk-5.mp3', text: 'Erinnerung erzeugt keine Vergangenheit. Sie erzeugt dich. Chaotisch. Unklar. Nebelig.' },
          { lead: 'Nr. 7 · Kindsiuiuhfusadufnkskmdibi · 7 min', break: true, audio: '/audio/soundwalk-7.mp3', text: 'Erinnerung ist kein Speicher. Sie erfindet. Immer wieder. Was du für wahr hältst war vielleicht nie so.' },
        ],
        gallery: [
          { src: '/images/soundwalk-qr-7.jpg', alt: 'Ein QR-Code auf dem Steinboden im K21, beschriftet mit Demien Rapp, Kindsiuiuhfusadufnkskmdibi, 7:00, am Rand der Schuh eines Besuchers.' },
          { src: '/images/soundwalk-hoeren.jpg', alt: 'Eine Besucherin hört ein Stück auf ihrem Handy, nachdem sie einen QR-Code am Boden gescannt hat.' },
          { src: '/images/soundwalk-qr-5.jpg', alt: 'QR-Code am Boden für Erwachsenkdfsdhfdjmadherf, 5:00.' },
          { src: '/images/soundwalk-boden.jpg', alt: 'Der Titel Soundwalk, Projektpräsentation Werk:Klub, auf den Boden gedruckt.' },
          { src: '/images/soundwalk-programm.jpg', alt: 'Jemand hält das gedruckte Programm des Soundwalks hinter dem Rücken.' },
          { src: '/images/soundwalk-rundgang.jpg', alt: 'Besucher in der Glashalle des K21 während des Soundwalks.' },
        ],
      },
      {
        id: 'ein-viertel',
        label: '1/4',
        title: '1/4',
        year: '2025',
        desc: [
          P('[BE A TRANSFORMER!](https://lernort-studio.de/be-a-transformer/) ist ein gemeinschaftliches 5 × 12 m großes Banner im [K21](https://www.kunstsammlung.de/de/). 1/4 ist mein Teil davon: 100 gesellschaftlich und politisch relevante Ereignisse dieses Jahrhunderts, als KI-Bilder generiert und zu einem Bild zusammengesetzt.'),
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
          P('Ich habe den Kurzfilm [2491](https://youtu.be/7R7Ini7Ibq8) gemacht und beim [Uncut Award](https://www.uncut-award.de/) 2025 in der [Filmwerkstatt Düsseldorf](https://www.filmwerkstatt-duesseldorf.de/) eingereicht. Ein Projekt gegen Überwachung.'),
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
          { lead: '[Circuit Bending](https://en.wikipedia.org/wiki/Circuit_bending):', text: 'das gezielte Kurzschließen und Verändern der Elektronik eines Geräts, bis es unvorhersehbar fehlerhaft arbeitet. Daher kommen diese glitchenden, verrauschten, sehr bunten Bilder.' },
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
          P('Coming soon…'),
        ],
        placeholder: 'Uncut Award 2026',
      },
    ],
  },
}
