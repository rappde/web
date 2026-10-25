/* image-masters/ (not in git) -> progressive JPEGs in public/images.
   mozjpeg came out smaller than WebP on these photos. npm run optimize:images */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const masters = join(root, 'image-masters')
const out = join(root, 'public', 'images')

// [masterFile (in image-masters/), outputBasename (matches the work slug), maxWidth, { crop?, rotate? }]
const jobs = [
  ['k21_banner_als_gesamt_digital.png', 'ein-viertel-banner', 2000],
  ['sdb_cover.jpg', 'soiree-de-brioche', 1600],
  ['2491_cover.jpg', 'uncut-2025', 1400],
  ['soundwalk_NET02392-2.jpg', 'soundwalk-qr-7', 2000],
  ['soundwalk_NET02410-2.jpg', 'soundwalk-hoeren', 1600],
  ['soundwalk_NET02369-2.jpg', 'soundwalk-qr-5', 1600],
  ['soundwalk_NET02338-2.jpg', 'soundwalk-boden', 1600],
  ['soundwalk_NET02295-2.jpg', 'soundwalk-programm', 1600],
  ['soundwalk_NET02305-2.jpg', 'soundwalk-rundgang', 1600],
  ['gefuehle_4930.jpg', 'gefuehle', 2000, { crop: { left: 0, top: 1180, width: 3024, height: 2016 } }],
  ['IMG_0215.JPG', 'gefuehle-wir-sehen-rot', 1600],
  ['IMG_0208.JPG', 'gefuehle-plakat-strasse', 1600],
  ['IMG_0211.JPG', 'gefuehle-plakat', 1600],
  ['IMG_0210.JPG', 'gefuehle-zine', 1600],
  ['IMG_0248.JPG', 'gefuehle-zine-seite', 1600, { rotate: 0 }], // EXIF orientation is wrong here,
  ['mine.jpg', 'mine', 1800],
  ['knisternder-bahnhof.jpg', 'knisternder-bahnhof', 1400],
  ['photo-unit_front.jpg', 'photo-unit', 1600],
  ['photo-unit_prints.jpg', 'photo-unit-prints', 1600],
  ['photo-unit_button.jpg', 'photo-unit-button', 1600],
]

for (const [src, base, maxWidth, { crop, rotate } = {}] of jobs) {
  const input = join(masters, src)

  // rotate() without angle applies the EXIF orientation of upright camera shots
  const img = sharp(input).rotate(rotate)
  if (crop) img.extract(crop)
  await img
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(join(out, `${base}.jpg`))

  const meta = await sharp(input).metadata()
  console.log(`${base}: ${meta.width}×${meta.height} → ${base}.jpg`)
}

// share card: mine photo, centre-cropped to 1200×630
await sharp(join(masters, 'mine.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 84, mozjpeg: true, progressive: true })
  .toFile(join(root, 'public', 'og-image.jpg'))
console.log('og-image: mine.jpg → public/og-image.jpg (1200×630)')
