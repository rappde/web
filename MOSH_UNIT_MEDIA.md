# MOSH_UNIT_MEDIA.md — shot list for Demien (not shown on the live page)

Production brief for the media the `/mosh_unit` page is waiting on. This is
for you, not visitors — the public page only shows a short "coming soon"
placeholder, never these notes. When a file is ready: drop it in
`public/mosh/`, then set its path in `src/content/mosh-unit.ts` (see field
next to each item below). No code change needed for new media.

## Interactive demo clips

Short looping MP4s (landscape, muted is fine, keep them small: a few MB, a
few seconds looped is plenty). Field: `effect.video` on each entry in
`effectsEn`/`effectsDe` in `mosh-unit.ts` (path is shared across both
languages — one file per effect).

- **BLOOM** (`id: 'bloom'`) — footage with strong, continuous movement so
  motion visibly piles up and blooms. Good subjects: someone walking toward
  camera, a moving car, swinging lights, fast hand motion.
- **FREEZE** (`id: 'freeze'`) — a scene where one clear moment can hold while
  something keeps moving over it. Good subjects: a person mid-gesture with
  background motion (traffic, crowd, water) continuing behind them.
- **REVERSE** (`id: 'reverse'`) — movement whose backwards version reads
  obviously as backwards. Good subjects: something falling/thrown, someone
  walking in a straight line, liquid pouring.
- **SHUFFLE** (`id: 'shuffle'`) — visually busy, complex footage so the
  scramble reads as chaos rather than a static image. Good subjects: crowds,
  foliage in wind, a busy street, textured surfaces.
- **STACKED** (`id: 'stacked'`) — the example that best shows combining
  effects (e.g. freeze into a bloom, or shuffle over a reverse). Pick whatever
  single clip you already made that stacks effects most convincingly.

## Screenshots (4)

Field: `image` on each entry in `screenshots.items` (EN + DE, same images).

1. **Main interface** (`id: 's1'`) — timeline with clips, effect toolbar,
   preview visible. Goal: show the app looks simple and approachable.
2. **Drawing effects** (`id: 's2'`) — mid-drag, an effect zone being drawn
   onto a clip's filmstrip. Goal: show the unique draw-to-glitch workflow.
3. **Effect stacking** (`id: 's3'`) — the inspector with a zone that has
   multiple stacked effects. Goal: show creative depth/control.
4. **Export** (`id: 's4'`) — the export dialog or the finished-file moment.
   Goal: show the workflow completes cleanly.

## Gallery clips

Field: `video` on each entry in `galleryItems` in `mosh-unit.ts` (shared
across languages). Landscape, one clip per slot; add more slots freely by
copying an object in the `galleryItems` array — no layout change needed.
Current planned tags (feel free to swap for whatever you actually have):

- `g1` Bloom only · `g2` Freeze only · `g3` Reverse only · `g4` Shuffle only
- `g5` Bloom + Freeze combo · `g6` Shuffle + Reverse + Bloom combo

## itch.io

`ITCH_URL` in `mosh-unit.ts` is currently a guess
(`https://rappde.itch.io/mosh-unit`) — confirm or replace once the listing is
live, otherwise every buy button 404s.
