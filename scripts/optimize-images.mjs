/* Image optimiser for work media. Heavy source masters live in image-masters/
   (git-ignored, local only); optimised, progressive JPEGs are written to
   public/images so the page stays light and loads fast on mobile (e.g. a 3.9 MB
   master becomes ~300 KB). A tuned mozjpeg beats WebP on these detailed photos,
   so JPEG it is. Re-run with: npm run optimize:images */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const masters = join(root, 'image-masters')
const out = join(root, 'public', 'images')

// [masterFile (in image-masters/), outputBasename (matches the work slug), maxWidth]
const jobs = [
  ['k21_banner_als_gesamt_digital.png', 'ein-viertel-banner', 2000],
  ['sdb_cover.jpg', 'soiree-de-brioche', 1600],
  ['2491_cover.jpg', 'uncut-2025', 1400],
  ['soundwalk_cover.jpg', 'soundwalk', 1800],
  ['IMG_0203.JPG', 'gefuehle', 1600],
  ['mine.jpg', 'mine', 1800],
  ['knisternder-bahnhof.jpg', 'knisternder-bahnhof', 1400],
]

for (const [src, base, maxWidth] of jobs) {
  const input = join(masters, src)

  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(join(out, `${base}.jpg`))

  const meta = await sharp(input).metadata()
  console.log(`${base}: ${meta.width}×${meta.height} → ${base}.jpg`)
}

// Social share card: the mine robot photo, centre-cropped to OG's 1200×630.
await sharp(join(masters, 'mine.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 84, mozjpeg: true, progressive: true })
  .toFile(join(root, 'public', 'og-image.jpg'))
console.log('og-image: mine.jpg → public/og-image.jpg (1200×630)')
