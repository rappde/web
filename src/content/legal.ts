/* Impressum und Datenschutzerklärung. Vorlage, keine geprüfte Rechtsberatung.
   TODO: Datenschutztext gegenlesen lassen. */

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
    {
      heading: 'Urheberrecht',
      paragraphs: [
        'Die auf dieser Seite gezeigten Werke, Texte und Bilder sind urheberrechtlich geschützt. Nutzung nur mit Zustimmung.',
      ],
    },
  ],
}

export const datenschutz: LegalDoc = {
  title: 'Datenschutzerklärung',
  updated: 'Stand: September 2026',
  backLabel: 'Zurück zur Startseite',
  backHref: '/',
  blocks: [
    {
      heading: 'Verantwortlicher',
      pre: 'Demien Rapp\nBürgerstraße 2\n40219 Düsseldorf\nE-Mail: demien.rp@gmail.com',
    },
    {
      heading: 'Keine Cookies, kein Tracking',
      paragraphs: [
        'Diese Website setzt keine Cookies, nutzt keine Analyse- oder Trackingdienste und bindet keine externen Schriftarten, Karten oder Social-Media-Widgets ein. Die verwendete Schriftart wird vom eigenen Server geladen. Verlinkungen zu YouTube, GitHub, LinkedIn, Instagram und itch.io sind reine Textlinks. Es werden erst Daten an diese Anbieter übertragen, wenn Sie den Link anklicken. Danach gilt die Datenschutzerklärung des jeweiligen Anbieters.',
      ],
    },
    {
      heading: 'Eingebettete eigene Tools',
      paragraphs: [
        'Auf der Seite Tools (rappde.com/tools) lassen sich meine Browser-Tools in einem Rahmen (iframe) direkt auf der Seite ausführen. Die Tools liegen unter rappde.github.io und werden damit ebenfalls von GitHub, Inc. ausgeliefert.',
        'Der Rahmen bleibt zunächst leer. Erst wenn Sie ein Tool anwählen, wird es abgerufen und Ihre IP-Adresse dabei an GitHub übermittelt. Ohne diese Auswahl findet keine Verbindung statt. Rechtsgrundlage für die Verarbeitung danach ist Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an der Darstellung eigener Arbeiten.',
        'Zwei der Tools können auf Wunsch Ihre Kamera verwenden. Der Browser fragt Sie vorher um Erlaubnis. Das Kamerabild wird ausschließlich lokal in Ihrem Browser verarbeitet und nicht übertragen, gespeichert oder von mir eingesehen.',
      ],
    },
    {
      heading: 'Eingebettete Videos (YouTube)',
      paragraphs: [
        'Videos sind nicht automatisch eingebunden. Erst wenn ein Vorschaubild aktiv angeklickt wird, wird der YouTube-Player im erweiterten Datenschutzmodus über youtube-nocookie.com geladen. Dabei werden Daten an Google Ireland Limited übertragen. Bis zu diesem Klick findet keine Verbindung zu YouTube statt.',
      ],
    },
    {
      heading: 'Server-Logfiles',
      paragraphs: [
        'Beim Aufruf der Website übermittelt Ihr Browser technisch notwendige Daten, die der Hoster in Logfiles speichert:',
      ],
      list: [
        'IP-Adresse',
        'Datum und Uhrzeit des Zugriffs',
        'aufgerufene Datei und übertragene Datenmenge',
        'Referrer-URL',
        'Browsertyp, Browserversion und Betriebssystem',
      ],
    },
    {
      paragraphs: [
        'Zweck ist der stabile und sichere Betrieb der Website sowie die Abwehr von Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse am technisch fehlerfreien Betrieb. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.',
      ],
    },
    {
      heading: 'Hosting über GitHub Pages',
      paragraphs: [
        'Diese Website wird gehostet von GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Seite verarbeitet GitHub die oben genannten Zugriffsdaten auf Servern, die auch außerhalb der Europäischen Union stehen können.',
        'Rechtsgrundlage für die Übermittlung in die USA ist Art. 45 Abs. 1 DSGVO in Verbindung mit dem EU-US Data Privacy Framework, für das GitHub zertifiziert ist. Ergänzend gelten die Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO, die Bestandteil der GitHub-Datenschutzvereinbarung sind.',
        'Auf die Logfiles von GitHub Pages habe ich keinen Zugriff und kann sie nicht auswerten. Die Speicherdauer bestimmt GitHub. Details stehen in der Datenschutzerklärung von GitHub: https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement',
      ],
    },
    {
      heading: 'Kontaktaufnahme per E-Mail',
      paragraphs: [
        'Ein Kontaktformular gibt es nicht. Wenn Sie per E-Mail schreiben, verarbeite ich Ihre Angaben ausschließlich zur Beantwortung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei Anfragen mit Vertragsbezug, sonst Art. 6 Abs. 1 lit. f DSGVO. Ihre Nachricht wird gelöscht, sobald sie nicht mehr benötigt wird und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      ],
    },
    {
      heading: 'Google Search Console',
      paragraphs: [
        'Zur Überwachung der Auffindbarkeit dieser Website in der Google-Suche nutze ich die Google Search Console. Der Nachweis der Inhaberschaft erfolgt über einen Meta-Tag im Quellcode. In Ihrem Browser wird dabei kein Code von Google ausgeführt, es werden keine Cookies gesetzt und keine Besucherdaten an Google übermittelt. Die Search Console zeigt mir ausschließlich aggregierte Daten aus der Google-Suche selbst.',
      ],
    },
    {
      heading: 'Kauf von MOSH_UNIT',
      paragraphs: [
        'MOSH_UNIT wird nicht über diese Website verkauft. Die Kauf-Schaltflächen auf den Seiten Tools und MOSH_UNIT sind gewöhnliche Links zur Verkaufsseite auf itch.io. Ein Vertrag kommt erst dort zustande, und die Zahlungsabwicklung liegt vollständig bei itch.io (itch corp., 1999 Harrison St Ste 1800, Oakland, CA 94612, USA). Erst wenn Sie den Link anklicken, werden Daten an itch.io übermittelt. Ab diesem Zeitpunkt gilt die Datenschutzerklärung von itch.io.',
      ],
    },
    {
      heading: 'Ihre Rechte',
      paragraphs: [
        'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage eines berechtigten Interesses (Art. 21). Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.',
        'Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig für Düsseldorf ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2-4, 40213 Düsseldorf.',
      ],
    },
  ],
}
