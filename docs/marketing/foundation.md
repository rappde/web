# MOSH_UNIT — Marketing Foundation (alles VOR dem Content)

Reihenfolge: **Foundation → Content → Amplification.** Erst muss die Landestelle verkaufen und messbar
sein, dann lohnt sich Content. Jedes Video, jeder Reddit-Post zeigt später auf *diese* Basis.

Copy-Assets (Bios, Beschreibungen, One-Liner, UTM) sind bewusst **auf Englisch** — das ist deine
Zielgruppe. `TODO: confirm` = Fakt, den nur du kennst.

---

## 0. Der Foundation-Check (das ist „fertig", bevor Content startet)
- [ ] Positionierung + kanonische Botschaft steht (Abschnitt 1)
- [ ] Verkaufsseite auf rappde.com konvertiert + itch.io-Buy-Button live (Abschnitt 2)
- [ ] Demo-Assets produziert (Before/After je Effekt) (Abschnitt 2 + 5)
- [ ] itch.io-Seite optimiert (Abschnitt 2)
- [ ] Tracking + UTM-Schema aktiv (Abschnitt 3)
- [ ] Alle Profile angelegt & einheitlich (Abschnitt 4)
- [ ] Asset-Bibliothek + Press-Kit fertig (Abschnitt 5)
- [ ] Distributions-/Directory-Liste angelegt, Accounts bereit (Abschnitt 6)
- [ ] GEO-Website-Arbeit gelaufen (dein Claude-Code-Prompt)
- [ ] Reddit-Karma-Aufbau begonnen (Abschnitt 7)

---

## 1. Positionierung & Botschaft (das Fundament)

**Das eine Versprechen:** der Datamosh-/Glitch-Look in Minuten — ohne After Effects, ohne Plugins, ohne
Gefummel. Cheap, standalone, purpose-built.

**Zielgruppe (Reihenfolge = Priorität):** Glitch-Artists, VJs, Musikvideo-/Experimentalfilm-Macher,
Editor:innen, die den Effekt schnell wollen, Creative Coder / Generative-Art-Leute.

**Kanonischer One-Liner (überall identisch verwenden):**
> *MOSH_UNIT is an $8 desktop tool that turns ordinary video into datamoshing glitch art through direct
> byte manipulation — no After Effects, no plugins.*

**Kurzform (für Bios/Tags):** *$8 datamoshing tool. Glitch any video. No After Effects.*

**Value-Prop-Leiter (für Hero der Verkaufsseite):**
- Headline: **Datamosh any video. No After Effects.**
- Subhead: *Drop in a clip, pick an effect, export glitch art in minutes. $8, yours forever.*
- 3 Benefit-Bullets: *Real byte-level datamoshing · Bloom / Reverse / Shuffle effects · Runs standalone [TODO: OS]*

**Der Wedge (warum das vs. Alternativen):** After-Effects-Tutorials sind fummelig und brauchen ein Abo;
Avidemux/ffmpeg-Handarbeit ist technisch und frickelig. MOSH_UNIT ist eigens dafür gebaut, billig, mit
benannten Effekten. *„Der Look, ohne das Tutorial-Rabbit-Hole."*

**Einwand-Liste + Antworten (kommen 1:1 in FAQ, Reddit, Sales-Seite):**
- *„Ist Byte-Manipulation ‚echtes' Datamoshing?"* → ehrlich erklären: klassisch = P-Frames löschen /
  I-Frames duplizieren; dein Ansatz manipuliert AVI-Bytes direkt und erzeugt denselben visuellen
  Effekt-Raum. Transparenz schlägt hier Marketing — genau das baut Glaubwürdigkeit.
- *„Brauche ich After Effects?"* → Nein, standalone.
- *„Welches OS?"* → `TODO: confirm` (Win/Mac/Linux?).
- *„8 \$ wert?"* → gegen deine Zeit gerechnet: eine AE-Datamosh-Session dauert länger.
- *„Kann ich vorher testen?"* → `TODO: entscheiden` (Free-Demo-Build? siehe 2).
- *„AI im Development"* (die Kritik, die du eh managst) → offene, kurze Haltung dazu; nicht defensiv.

**Voice:** brutalistisch — knapp, technisch-ehrlich, kleingeschrieben/mono-Ästhetik, kein Hype-Sprech.

---

## 2. Die Konversions-Fläche (verkaufen, BEVOR Traffic kommt)

**rappde.com/mosh (oder deine Sales-Route) — Struktur für einen 8-\$-Impulskauf:**
1. **Hero:** ein autoplay-loopendes Before/After-Glitch-Clip (stumm) + Headline + Preis + **ein**
   Buy-Button (itch.io). Kaufentscheidung muss above the fold möglich sein.
2. **Effekt-Beweis:** je Effekt (Bloom/Reverse/Shuffle) ein kurzes Before→After-Paar.
3. **In 3 Schritten:** Clip rein → Effekt wählen → exportieren.
4. **Specs:** OS, Formate, Preis — als **Text**, nicht im Bild (maschinenlesbar für GEO).
5. **FAQ:** die Einwand-Liste aus 1.
6. **Zweiter Buy-Button** am Ende.

**itch.io-Buy-Button-Integration:** „Buy on itch.io"-Widget/Deep-Link einbetten; Klick als Event tracken
(Abschnitt 3), damit du Sales-Seite → itch.io-Klick messen kannst.

**Demo-Footage-System:** Landscape-Stock von Pexels/Pixabay (lizenzfrei) durch Bloom/Reverse/Shuffle
jagen → Before/After. Diese Clips sind gleichzeitig Sales-Proof *und* dein Social-Content-Vorrat später.

**itch.io-Seite optimieren (eigener Ranking-/GEO-Kanal):**
- Titel mit Keyword: *„MOSH_UNIT — datamoshing tool / glitch video effect"*
- Tags: `datamoshing`, `glitch`, `video`, `generative`, `vfx`, `art`, `tool`
- Kurzbeschreibung = kanonischer One-Liner (Abschnitt 1), identisch zur Website
- Cover + 3–5 Screenshots/GIFs (Effekte zeigen), Preis \$8
- **Entscheidung:** kostenloser Demo-Build (gewasserzeichnet / Export-Limit)? Senkt die Kaufhürde stark
  und pusht dich in itch.io-„Download"-Ranglisten. `TODO: entscheiden`

---

## 3. Messung (damit du weißt, was wirkt)

**Stack:** Plausible (leichtgewichtig, privacy-freundlich) **oder** GA4. Wichtig: ein **`buy_click`-Event**
auf dem itch.io-Button.

**UTM-Schema (immer gleich, sonst unbrauchbar):**
```
utm_source   = kanal        (reddit | youtube | tiktok | instagram | x | hn | itch | perplexity | chatgpt)
utm_medium   = format       (post | comment | video | short | bio | social | referral)
utm_campaign = zweck         (launch | geo | effect_showcase | tutorial)
utm_content  = asset-id      (z. B. sideproject_build | bloom_before_after | yt_2min)
```
Beispiel:
`https://rappde.com/mosh?utm_source=reddit&utm_medium=post&utm_campaign=launch&utm_content=sideproject_build`

**Zusätzlich:** itch.io-eigene Analytics (Views/Downloads/Referrer) checken; KI-Referrals an
`utm_source=chatgpt.com` und Referrern von `perplexity.ai` / `gemini` erkennen.

**Wöchentliches Dashboard (5 Zahlen):** Sales-Seiten-Views · Buy-Klicks · itch.io-Sales · Top-3-Quellen ·
Klick→Kauf-Rate. Mehr brauchst du am Anfang nicht.

---

## 4. Kanäle & Entity-Konsistenz (anlegen + vereinheitlichen)

**Kanonischer Entity-Block (Copy-Paste-Basis für ALLE Profile):**
```
MOSH_UNIT — $8 datamoshing tool. Glitch any video. No After Effects.
by rappde · rappde.com · itch.io/rappde
```

**Profile anlegen/optimieren (gleicher Handle „rappde", gleiche Bio, gleicher Link):**
- **itch.io** (Verkaufskern) — siehe 2
- **Reddit** — Karma-Basis, siehe 7
- **YouTube** — Kanal + Banner + „links"; Pflicht für GEO (wird stark zitiert) und für visuelle Demos
- **TikTok + Instagram (Reels)** — **strategisch groß:** Glitch/Datamosh ist extrem shareable; ein Effekt-
  Clip kann organisch laufen. Vertikale Crops deiner Demo-Clips.
- **X / Bluesky** — Build-in-Public, Effekt-GIFs
- **GitHub** — Autorität/`sameAs` für dein Person-Schema
- **Hacker News** — Account bereithalten für einen „Show HN"

**Bio-Vorlagen:**
- *Kurz (TikTok/IG/X):* `$8 datamoshing tool → glitch any video, no After Effects. by rappde ↓`
- *YouTube-„About":* `MOSH_UNIT is an $8 desktop tool that turns ordinary video into datamoshing glitch
  art through direct byte manipulation — no After Effects, no plugins. Tutorials, effect breakdowns, and
  build logs. Get it: rappde.com`
- *Reddit:* schlicht, Link im Profil, keine Werbe-Bio.

---

## 5. Asset-Bibliothek (damit Content später schnell geht)

**Brand-Kit:** Logo/Wordmark, Paper/Ink-Palette, Bricolage Grotesque + JetBrains Mono, itch.io-Cover-
Template, YT-Thumbnail-Template, Social-Vorlage — alle im brutalist Look.

**Demo-Clip-Bibliothek** (aus Pexels/Pixabay-Landscape, je Effekt):
- Formate: **MP4** (Web/Sales) · **WebM/GIF** (Reddit/Embeds) · **9:16-MP4** (TikTok/Reels/Shorts)
- Immer als **Before/After**-Paar
- Naming: `moshunit_<effekt>_<quelle>_<format>` (z. B. `moshunit_bloom_forest_9x16.mp4`)

**Screenshots:** UI-Shots + Effekt-Presets, für itch.io & Sales-Seite.

**One-Pager / Press-Kit** (eine Seite, verlinkbar): One-Liner, 3 Bullets, 3 GIFs, Preis, OS, Links,
1–2 Sätze zu dir (K21-/Nilsson-Ausstellungshistorie = Glaubwürdigkeit). Für Listicle-Autor:innen &
YouTuber:innen, die dich sonst nicht zitieren können, wenn sie die Fakten nicht griffbereit haben.

**Copy-Snippets-Datei:** kanonischer One-Liner, Kurzform, Entity-Block, FAQ-Antworten — an einem Ort,
damit alles überall identisch ist (Entity-Konsistenz = GEO-Vertrauen).

---

## 6. Distributions-Map (wo du auftauchst — Zugänge jetzt anlegen)

**Directories/Listings (einmalig einreichen, wirken lang):**
- itch.io: passende **Collections/Tags**, ggf. relevante **Bundles**
- **AlternativeTo** — als Alternative zu „After Effects (datamoshing)" / Avidemux listen
- **Product Hunt** — ein sauberer Launch (Assets vorher fertig)
- **Hacker News** — „Show HN: MOSH_UNIT"
- Tool-/Glitch-Art-Roundup-Sites (Software-Review-/Listen-Seiten sind überdurchschnittlich oft KI-Quelle)

**GEO-Flächen:** aus deinem GEO-Strategie-Dokument (Reddit-Threads, YouTube, Q&A-Seiten).

**Outreach-Liste (Tabelle anlegen, noch nicht kontaktieren):** Autor:innen von „best datamoshing/glitch
tools"-Artikeln + YouTuber:innen mit Glitch-/Datamosh-Tutorials → Spalten: Name · Link · Kanal · Angle ·
Status. Wenn Content steht, hast du die Liste schon.

---

## 7. Amplification-Engine (damit jeder Content-Post reist)

- **Reddit-Reputation JETZT starten** (dauert am längsten): 9:1-Regel, in r/glitch_art, r/Vjing,
  r/VideoEditing, r/creativecoding echt mitkommentieren, Karma aufbauen — Wochen *bevor* du promotest.
- **Cross-Post-Matrix** (1 Asset → viele Flächen): ein Effekt-Clip →
  r/glitch_art-Post · TikTok · IG Reel · YT Short · X-GIF · Sales-Seiten-Hero · itch.io-Screenshot.
  So multipliziert jedes Stück Content, statt einmalig zu sein.
- **Audience-Capture für die Zukunft:** itch.io-**Follow** aktiv bewerben + **Devlog** nutzen; simple
  Mailingliste (Buttondown/ConvertKit-Free) für die nächsten „Units" (Compression_/Displacement_Unit) —
  ein aufgebautes Publikum macht jeden nächsten Launch billiger.

---

## Was ich noch von dir brauche (die `TODO`s)
1. **OS-Support** von MOSH_UNIT (Windows / Mac / Linux?)
2. **Unterstützte Formate** (Input/Output)
3. **Free-Demo-Build ja/nein** (starker Konversions-/Ranking-Hebel)
4. **Sind TikTok/Instagram im Scope?** (für ein Glitch-Tool wäre das der größte organische Reichweiten-Hebel)

Sobald die vier stehen, ist die Foundation vollständig fixierbar — dann erst Content.
