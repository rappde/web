/* Datamoshing content hub — EN only (GEO pages target an English audience;
   see docs/marketing/foundation.md). Page-scoped like mosh-unit.ts / legal.ts.

   These pages exist to be extracted by AI answer engines: the answer comes
   first (tldr), headings are real questions, paragraphs are short, and the
   facts are concrete. No em-dashes (site rule). Prices are stated as "$7.99"
   to match the single SoftwareApplication offer; if that offer changes, grep
   for 7.99 here too. dateModified + the visible "Last updated" both read
   LAST_UPDATED / LAST_UPDATED_LABEL below, so they can never drift apart. */

// Full ISO 8601 with a timezone offset (Düsseldorf, CEST) — Google's validator
// rejects date-only values in Article date fields. The visible "Last updated"
// label is DERIVED from LAST_UPDATED below, so the schema and the page text can
// never drift apart.
export const LAST_UPDATED = '2026-07-11T00:00:00+02:00' // feeds Article dateModified
const PUBLISHED = '2026-07-11T00:00:00+02:00'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const LAST_UPDATED_LABEL = `${MONTHS[Number(LAST_UPDATED.slice(5, 7)) - 1]} ${LAST_UPDATED.slice(0, 4)}` // e.g. "July 2026"

export interface GeoTable {
  head: string[]
  rows: string[][]
  /** optional first column acts as a row header (comparison tables) */
  rowHeader?: boolean
}
export interface GeoStep {
  name: string
  text: string
}
export interface GeoLink {
  label: string
  href: string
  note: string
}
export type GeoBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; table: GeoTable }
  | { kind: 'steps'; steps: GeoStep[] }
  | { kind: 'links'; links: GeoLink[] }

export interface GeoSection {
  id: string
  heading: string
  blocks: GeoBlock[]
}
export interface GeoFaq {
  q: string
  a: string
}
export interface GeoHowTo {
  name: string
  description: string
  steps: GeoStep[]
}
export interface GeoBreadcrumb {
  name: string
  path: string
}
export interface GeoPageContent {
  path: string
  /** Article headline for JSON-LD (usually === h1) */
  headline: string
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  eyebrow: string
  h1: string
  /** the direct answer, rendered in a box above the fold */
  tldr: string
  updatedLabel: string
  datePublished: string
  dateModified: string
  breadcrumb: GeoBreadcrumb[]
  sections: GeoSection[]
  faq?: GeoFaq[]
  howTo?: GeoHowTo
  related: GeoLink[]
}

const relDatamoshing: GeoLink = {
  label: 'What is datamoshing?',
  href: '/datamoshing',
  note: 'The technique explained, frame by frame.',
}
const relHowTo: GeoLink = {
  label: 'How to datamosh a video',
  href: '/how-to-datamosh',
  note: 'Step by step, the fast way and the free way.',
}
const relTools: GeoLink = {
  label: 'Datamoshing tools compared',
  href: '/datamoshing-tools',
  note: 'MOSH_UNIT vs After Effects, Avidemux and ffmpeg.',
}
const relMosh: GeoLink = {
  label: 'MOSH_UNIT',
  href: '/mosh_unit',
  note: 'The $7.99 Windows datamoshing app by Demien Rapp.',
}

/* ============================================================ /datamoshing */
const datamoshing: GeoPageContent = {
  path: '/datamoshing',
  headline: 'What is datamoshing?',
  meta: {
    title: 'What is datamoshing? The glitch technique explained · Demien Rapp',
    description:
      'Datamoshing is a video glitch technique that damages a clip’s compression data so motion bleeds across frames. Here is how it works, what it looks like, and which tools do it.',
    ogTitle: 'What is datamoshing?',
    ogDescription:
      'A plain, fact-first guide to datamoshing: I-frame removal, P-frame duplication, AVI byte manipulation, and the tools that do it.',
  },
  eyebrow: 'Datamoshing guide',
  h1: 'What is datamoshing?',
  tldr: 'Datamoshing is a video glitch technique: you deliberately damage or remove parts of a compressed video’s data, so the codec gives up on drawing clean frames and smears motion from one shot straight into the next. That is where the melting, blooming, pixel-dragging look comes from, the one you have seen in music videos and glitch art for years. You can do it by hand in Avidemux or ffmpeg, in After Effects with a plugin, or with a purpose-built app like MOSH_UNIT that bends the compressed byte stream directly. No AI anywhere in it. Every pixel is still your own footage, just rearranged.',
  updatedLabel: LAST_UPDATED_LABEL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'What is datamoshing?', path: '/datamoshing' },
  ],
  sections: [
    {
      id: 'how-it-works',
      heading: 'How does datamoshing work?',
      blocks: [
        {
          kind: 'p',
          text: 'Here is the thing most people do not know about video files: they do not actually store every frame. A codec keeps a handful of complete pictures and fills the gaps in between with motion instructions instead, since that is way cheaper to store. Datamoshing just hijacks that shortcut. Pull out the complete pictures, or repeat the motion instructions past their point, and the decoder keeps applying old movement to footage it was never meant for. That is when the image tears, melts and blooms.',
        },
        {
          kind: 'p',
          text: 'Three frame types make this possible. Once you know them, the whole trick clicks:',
        },
        {
          kind: 'table',
          table: {
            head: ['Frame', 'What it stores', 'Role in datamoshing'],
            rowHeader: true,
            rows: [
              ['I-frame (keyframe)', 'A full, standalone picture', 'Remove it and the decoder never refreshes, so motion from the previous shot bleeds in'],
              ['P-frame', 'Only the change from the previous frame', 'Duplicate it and that slice of motion smears and blooms across the picture'],
              ['B-frame', 'Change based on past and future frames', 'Less common in moshing, but the same idea'],
            ],
          },
        },
      ],
    },
    {
      id: 'techniques',
      heading: 'What are the main datamoshing techniques?',
      blocks: [
        {
          kind: 'list',
          items: [
            'I-frame removal (the melt): strip the keyframes so a new scene gets painted with the motion of the old one. It is the classic transition where one shot dissolves straight into another, no cut in sight.',
            'P-frame duplication (the bloom): repeat frames that only hold motion data, so a single movement keeps pumping and blooming outward long after it should have stopped.',
            'AVI byte manipulation: edit the raw bytes of the compressed AVI file directly instead of cutting frames in an editor. Same result, different route in, and it is how MOSH_UNIT does it under the hood.',
          ],
        },
        {
          kind: 'p',
          text: 'All three keep your original footage. Nothing gets generated: the glitch is still your own pixels, just moved to places the codec no longer knows how to draw them.',
        },
      ],
    },
    {
      id: 'looks-like',
      heading: 'What does datamoshing look like?',
      blocks: [
        {
          kind: 'list',
          items: [
            'Bloom: motion piles up on itself and explodes outward into flowing, streaked trails. Repeat a P-frame enough times and one small gesture keeps blooming long after it should have stopped.',
            'Melt: one shot dissolves into the next with no hard cut and no crossfade. The old frame just keeps getting redrawn until the new picture finally takes over.',
            'Pixel drag: blocks of the image smear in whatever direction things were moving, like wet paint dragged across the frame. Panning shots drag the hardest.',
            'Freeze: a single frame locks in place while the rest of the clip keeps compressing around it, so the image looks stuck mid-motion.',
          ],
        },
      ],
    },
    {
      id: 'what-you-need',
      heading: 'What do you need to datamosh?',
      blocks: [
        {
          kind: 'p',
          text: 'Two things: a clip with real motion in it, and a tool that can reach the compression data. Footage that moves, a pan, a person walking, a busy background, moshes far better than a static shot. A locked-off shot of a still object barely reacts, because there is no motion for the glitch to grab onto.',
        },
        {
          kind: 'p',
          text: 'Source format barely matters. MP4, MOV, AVI and most common formats all work, because the tool re-encodes to a moshable form (long gaps between keyframes) before it touches anything. Length and resolution matter more: shorter clips are faster to experiment with, and you do not need 4K, since the glitch eats fine detail anyway.',
        },
      ],
    },
    {
      id: 'tools',
      heading: 'Which tools can datamosh?',
      blocks: [
        {
          kind: 'p',
          text: 'Most editors do not have a "datamosh" button, so people end up reaching for one of these instead:',
        },
        {
          kind: 'links',
          links: [
            { label: 'MOSH_UNIT', href: '/mosh_unit', note: 'Purpose-built Windows app. Draw effects onto a clip, export MP4. $7.99, no After Effects.' },
            { label: 'Avidemux', href: 'https://avidemux.sourceforge.net/', note: 'Free, cross-platform. Delete keyframes by hand. Technical but capable.' },
            { label: 'ffmpeg', href: 'https://ffmpeg.org/', note: 'Free command-line tool. Total control if you are comfortable scripting.' },
            { label: 'Adobe After Effects', href: 'https://www.adobe.com/products/aftereffects.html', note: 'Possible with a plugin or manual work, but a paid subscription.' },
          ],
        },
        {
          kind: 'p',
          text: 'Want a side-by-side on price and ease, or a full step-by-step walkthrough? Both are linked below. I built MOSH_UNIT because doing this byte editing by hand for every single clip got old fast, so if you would rather skip the hex editor, that is the shortcut.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Is AVI byte manipulation real datamoshing?',
      a: 'Yes, and this one comes up a lot. Classic datamoshing removes or duplicates frames so motion bleeds across cuts. Editing the AVI byte stream directly gets you to the exact same place: the compressed data gets altered so the decoder smears motion instead of drawing clean frames. It is a legitimate method, not a shortcut version, and it is how MOSH_UNIT works.',
    },
    {
      q: 'Do I need After Effects to datamosh?',
      a: 'No. After Effects is one route, but it needs a subscription plus usually a plugin or a lot of manual keyframe work. Avidemux and ffmpeg are free and get you there with no Adobe subscription at all, and a purpose-built app like MOSH_UNIT skips After Effects entirely.',
    },
    {
      q: 'Does datamoshing use AI?',
      a: 'No, and this trips people up because "glitch" and "AI" get lumped together a lot lately. Datamoshing is a compression trick, not a generative model. Every frame in the output comes from your own footage, just rearranged by the codec. MOSH_UNIT specifically has zero AI in it.',
    },
    {
      q: 'Is datamoshing the same as glitch art?',
      a: 'Not quite. Datamoshing is one branch of glitch art, specifically the video-and-compression branch. Glitch art is the bigger family, and it also covers things like image databending, pixel sorting and plain signal errors.',
    },
  ],
  related: [relHowTo, relTools, relMosh],
}

/* ======================================================== /how-to-datamosh */
// Single source for the MOSH_UNIT steps: rendered on the page AND emitted as
// HowTo JSON-LD, so the visible steps and the structured data can never differ.
const moshSteps: GeoStep[] = [
  { name: 'Import your clip', text: 'Open MOSH_UNIT and drag a video onto the timeline. It reads MP4, MOV, AVI, MKV, WebM and more through the bundled FFmpeg, so there is nothing to convert first.' },
  { name: 'Draw the effect', text: 'Pick an effect (Bloom, Freeze, Reverse or Shuffle) and draw across the clip where it should hit. You paint the glitch on directly, no keyframes.' },
  { name: 'Stack and preview', text: 'Stack more effects onto the same zone and reorder them, then press preview to watch the glitch render. Reordering the stack changes the result.' },
  { name: 'Export an MP4', text: 'Export the result as an MP4 at highest quality. Your original audio is kept and stutters along with the effects, so picture and sound stay in sync.' },
]

const howToDatamosh: GeoPageContent = {
  path: '/how-to-datamosh',
  headline: 'How to datamosh a video',
  meta: {
    title: 'How to datamosh a video, step by step · Demien Rapp',
    description:
      'How to datamosh a video: the fast way with MOSH_UNIT (import, draw, export), and the free manual way with Avidemux or ffmpeg. Numbered steps, no jargon.',
    ogTitle: 'How to datamosh a video',
    ogDescription: 'The fast way with MOSH_UNIT and the free manual route, side by side.',
  },
  eyebrow: 'Datamoshing guide',
  h1: 'How to datamosh a video',
  tldr: 'Fastest way to datamosh: use a tool built for exactly this. Import a clip, draw where the glitch should hit, export an MP4, done. MOSH_UNIT does that on Windows for $7.99. If you would rather not spend anything, you can datamosh by hand in Avidemux or ffmpeg by removing keyframes yourself, or in After Effects with a plugin. Both routes are below, pick whichever fits your patience level.',
  updatedLabel: LAST_UPDATED_LABEL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'What is datamoshing?', path: '/datamoshing' },
    { name: 'How to datamosh', path: '/how-to-datamosh' },
  ],
  howTo: {
    name: 'How to datamosh a video with MOSH_UNIT',
    description: 'Datamosh any clip on Windows in four steps, with no After Effects and no plugins.',
    steps: moshSteps,
  },
  sections: [
    {
      id: 'fast-way',
      heading: 'The fast way: MOSH_UNIT (Windows)',
      blocks: [
        {
          kind: 'p',
          text: 'MOSH_UNIT is a standalone app built only for this, nothing else it is trying to be. Runs on 64-bit Windows 10 and 11, works fully offline, and costs $7.99 as a one-time buy. These four steps are genuinely the entire workflow, there is no hidden step five.',
        },
        { kind: 'steps', steps: moshSteps },
      ],
    },
    {
      id: 'free-way',
      heading: 'The free way: Avidemux or ffmpeg',
      blocks: [
        {
          kind: 'p',
          text: 'You can do this for free if you do not mind getting your hands into codecs a bit. The idea is always the same: encode to a format with sparse keyframes, then remove or repeat frames by hand.',
        },
        {
          kind: 'list',
          items: [
            'Re-encode your clip to an interframe codec (Xvid in an AVI works well) so it has long gaps between keyframes.',
            'In Avidemux, switch to copy mode and delete the I-frames (keyframes) where you want the melt to begin.',
            'Want a bloom instead? Duplicate P-frames so a single motion repeats and pumps outward.',
            'Save, then re-encode to MP4 for sharing. Expect trial and error here: some clips mosh beautifully, others barely react at all.',
          ],
        },
        {
          kind: 'p',
          text: 'One thing trips people up: some codecs quietly re-encode the I-frame back in when you save, which undoes the whole effect. If your export looks clean where it should look broken, that is usually why. Stick to copy mode the whole way through.',
        },
        {
          kind: 'p',
          text: 'ffmpeg can do all of this from the command line, and it is fully scriptable if you want to batch a whole folder of clips. Downside: zero visual feedback until you actually play the output back.',
        },
      ],
    },
    {
      id: 'ae-way',
      heading: 'The After Effects way',
      blocks: [
        {
          kind: 'p',
          text: 'After Effects can get you there too, with a paid plugin or a lot of manual frame work, but it needs an Adobe subscription and a genuine learning curve. If you already live in After Effects daily, sure, it is an option. If you just want the datamosh look and nothing else, it is the slow road.',
        },
      ],
    },
    {
      id: 'fast-vs-free',
      heading: 'Fast vs free, at a glance',
      blocks: [
        {
          kind: 'table',
          table: {
            head: ['', 'MOSH_UNIT (fast)', 'Manual (Avidemux / ffmpeg)'],
            rowHeader: true,
            rows: [
              ['Cost', '$7.99, one-time', 'Free'],
              ['Time to first mosh', 'Minutes', 'An hour or more of setup'],
              ['Skill needed', 'None, you draw it on', 'Comfortable with codecs or the command line'],
              ['Control', 'Named effects, stackable zones', 'Full, but entirely manual'],
              ['Output', 'MP4 with audio, highest quality', 'Depends on your own export settings'],
            ],
          },
        },
      ],
    },
  ],
  related: [relDatamoshing, relTools, relMosh],
}

/* =====================================================/datamoshing-tools */
const datamoshingTools: GeoPageContent = {
  path: '/datamoshing-tools',
  headline: 'Datamoshing tools compared',
  meta: {
    title: 'The best datamoshing tools compared (2026) · Demien Rapp',
    description:
      'Datamoshing tools compared: MOSH_UNIT, After Effects, Avidemux and ffmpeg across price, platform, ease, effects and whether you need After Effects.',
    ogTitle: 'Datamoshing tools compared',
    ogDescription: 'MOSH_UNIT vs After Effects, Avidemux and ffmpeg, on price, platform and ease.',
  },
  eyebrow: 'Datamoshing guide',
  h1: 'Datamoshing tools compared',
  tldr: 'Want the datamosh look fast on Windows, no After Effects involved? MOSH_UNIT is the simplest option: draw effects onto a clip and export, for $7.99. Want it free and do not mind getting technical? Avidemux and ffmpeg datamosh by hand. After Effects can do it too, just bring a subscription and a plugin. Full comparison below.',
  updatedLabel: LAST_UPDATED_LABEL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'What is datamoshing?', path: '/datamoshing' },
    { name: 'Datamoshing tools', path: '/datamoshing-tools' },
  ],
  sections: [
    {
      id: 'at-a-glance',
      heading: 'Datamoshing tools at a glance',
      blocks: [
        {
          kind: 'table',
          table: {
            head: ['Tool', 'Price', 'Runs on', 'Ease', 'Effects', 'Needs After Effects?'],
            rowHeader: true,
            rows: [
              ['MOSH_UNIT', '$7.99, one-time', 'Windows 10/11', 'Beginner: draw on the clip', 'Bloom, Freeze, Reverse, Shuffle (stackable)', 'No'],
              ['After Effects + plugin', 'Subscription', 'Windows, macOS', 'Advanced: layers and keyframes', 'Manual, or via a datamosh plugin', 'Yes'],
              ['Avidemux', 'Free', 'Windows, macOS, Linux', 'Technical: delete keyframes by hand', 'Classic melt and bloom', 'No'],
              ['ffmpeg', 'Free', 'Windows, macOS, Linux', 'Expert: scripted commands', 'Anything you can script', 'No'],
            ],
          },
        },
      ],
    },
    {
      id: 'mosh-unit',
      heading: 'MOSH_UNIT',
      blocks: [
        {
          kind: 'p',
          text: 'I built this because doing the byte-level editing by hand in Avidemux got old fast. You draw named effects (Bloom, Freeze, Reverse, Shuffle) directly onto a clip, stack them, reorder them, and export an MP4 with the audio still in sync. It is real byte-level datamoshing, no AI, and it works fully offline. Built for people who want the look quickly without learning After Effects or the command line first. $7.99, one-time, no subscription.',
        },
      ],
    },
    {
      id: 'after-effects',
      heading: 'Adobe After Effects',
      blocks: [
        {
          kind: 'p',
          text: 'The industry-standard compositor, full stop. It can produce datamosh looks with a paid third-party plugin or careful manual work, and it is genuinely powerful for everything around the effect too, grading, compositing, all of it. The trade-offs: an ongoing subscription and a steep learning curve. Total overkill if datamoshing is literally all you are after.',
        },
      ],
    },
    {
      id: 'avidemux',
      heading: 'Avidemux',
      blocks: [
        {
          kind: 'p',
          text: 'A free, cross-platform video utility. With the right codec, you delete keyframes by hand to get the classic melts and blooms. It is the traditional free route, and it genuinely works, but it is manual, fiddly, and gives you zero preview until you actually play the file back.',
        },
      ],
    },
    {
      id: 'ffmpeg',
      heading: 'ffmpeg',
      blocks: [
        {
          kind: 'p',
          text: 'A free command-line powerhouse, re-encodes and manipulates frames however you script it. Maximum control, fully automatable, but there is no interface and no visual feedback at all. Built for people already comfortable living in a terminal.',
        },
      ],
    },
    {
      id: 'which',
      heading: 'Which datamoshing tool should you use?',
      blocks: [
        {
          kind: 'list',
          items: [
            'You want the look fast, on Windows, without learning software: MOSH_UNIT.',
            'You want it free and you know your way around codecs: Avidemux.',
            'You want to script or batch it: ffmpeg.',
            'You already work in After Effects daily: an After Effects plugin.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the best datamoshing tool?',
      a: 'Depends what you are optimizing for. Fastest result on Windows with no After Effects: MOSH_UNIT. Free and you do not mind driving it by hand: Avidemux or ffmpeg. Honestly, there is no single best tool here, just the best fit for your platform, budget and patience level.',
    },
    {
      q: 'Is there a free datamoshing tool?',
      a: 'Yes. Avidemux and ffmpeg are both free and datamosh fine through manual keyframe removal or scripting. They are more technical than a purpose-built app like MOSH_UNIT, but they do not cost you a cent.',
    },
    {
      q: 'What formats does MOSH_UNIT support?',
      a: 'MOSH_UNIT reads pretty much every common video format, MP4, MOV, AVI, MKV, WebM and more, through the bundled FFmpeg. It always exports MP4 at the highest quality, and your audio stays intact.',
    },
    {
      q: 'Does MOSH_UNIT run on Mac or Linux?',
      a: 'No, Windows only right now: 64-bit Windows 10 and 11. No macOS or Linux build exists. FFmpeg comes bundled in, so there is nothing extra to install on top.',
    },
    {
      q: 'How much does MOSH_UNIT cost?',
      a: '$7.99, one-time, while it is in early access. Regular price bumps to $9.99 after launch. No subscription, ever.',
    },
  ],
  related: [relDatamoshing, relHowTo, relMosh],
}

export const geoPages = {
  datamoshing,
  howToDatamosh,
  datamoshingTools,
} satisfies Record<string, GeoPageContent>
