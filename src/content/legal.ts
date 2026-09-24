/* Impressum & Datenschutzerklärung — deutscher Pflichttext (REDESIGN-BRIEF §9c).
   ENTWURF / Vorlage, keine geprüfte Rechtsberatung. Vor Veröffentlichung muss
   Demien die ladungsfähige Anschrift ergänzen (sonst ist das Impressum ungültig)
   und den Datenschutztext gegenlesen / mit einem DSGVO-Generator absichern. */

export interface LegalBlock {
  heading?: string
  paragraphs?: string[]
  /** preformatted address-style block */
  pre?: string
  list?: string[]
}

export interface LegalDoc {
  title: string
  updated: string
  backLabel: string
  backHref: string
  blocks: LegalBlock[]
}

export const impressum: LegalDoc = {
  title: 'Impressum',
  updated: 'Stand: Juli 2026',
  backLabel: 'Zurück zur Startseite',
  backHref: '/',
  blocks: [
    {
      heading: 'Angaben gemäß § 5 DDG',
      pre: 'Demien Rapp\nBürgerstraße 2\n40219 Düsseldorf',
    },
    {
      heading: 'Kontakt',
      paragraphs: ['E-Mail: demien.rp@gmail.com'],
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      paragraphs: ['Demien Rapp, Bürgerstraße 2, 40219 Düsseldorf'],
    },
    {
      heading: 'Haftung für Inhalte',
      paragraphs: [
        'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      ],
    },
    {
      heading: 'Haftung für Links',
      paragraphs: [
        'Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
      ],
    },
  ],
}

export const datenschutz: LegalDoc = {
  title: 'Datenschutzerklärung',
  updated: 'Stand: Juli 2026',
  backLabel: 'Zurück zur Startseite',
  backHref: '/',
  blocks: [
    {
      heading: 'Verantwortlicher',
      pre: 'Demien Rapp\nBürgerstraße 2\n40219 Düsseldorf\nE-Mail: demien.rp@gmail.com',
    },
    {
      heading: 'Datenverarbeitung im Überblick',
      paragraphs: [
        'Diese Website ist bewusst datensparsam gebaut: Schriften werden selbst gehostet (keine Verbindung zu Google Fonts), Videos werden erst nach aktivem Klick geladen, und es werden keine Tracking-Cookies und kein klassisches Analyse-Tracking eingesetzt. Eine Einwilligung per Cookie-Banner ist daher nicht erforderlich.',
      ],
    },
    {
      heading: 'Hosting & Server-Logs',
      paragraphs: [
        'Die Website wird über GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) bereitgestellt. Beim Aufruf der Seite werden technisch notwendige Zugriffsdaten verarbeitet, die der Browser übermittelt, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Datei sowie User-Agent. Diese Verarbeitung dient der sicheren und stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). GitHub ist insoweit als Hoster (Auftragsverarbeiter) einzuordnen; weitere Informationen: https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement.',
      ],
    },
    {
      heading: 'Eingebettete Inhalte (YouTube / Vimeo)',
      paragraphs: [
        'Videos sind nicht automatisch eingebunden. Erst wenn ein Vorschaubild aktiv angeklickt wird, wird der externe Player (z. B. YouTube im erweiterten Datenschutzmodus über youtube-nocookie.com oder Vimeo im Do-Not-Track-Modus) geladen. Dabei können Daten an den jeweiligen Anbieter übertragen werden. Bis zu diesem Klick findet keine Verbindung zu diesen Diensten statt.',
      ],
    },
    {
      heading: 'Kontaktaufnahme',
      paragraphs: [
        'Wenn du mich per E-Mail kontaktierst, werden deine Angaben zur Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b bzw. f DSGVO) und nicht ohne deine Einwilligung weitergegeben.',
      ],
    },
    {
      heading: 'Deine Rechte',
      paragraphs: [
        'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie ein Widerspruchsrecht. Außerdem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.',
      ],
    },
  ],
}
