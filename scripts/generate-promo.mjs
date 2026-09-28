/* Promo images into promo/. Run: node scripts/generate-promo.mjs
   Wordmark uses a system grotesk, Bricolage is only a web font. */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'promo')
mkdirSync(out, { recursive: true })
const master = join(root, 'image-masters', 'mine.jpg')

const PAPER = '#f2f0eb'
const INK = '#0b0b0c'
const MUTED = '#56565b'
const FF = "'Arial Black','Arial Bold',Arial,'Helvetica Neue',sans-serif"
const MONO = "'Consolas','Courier New',monospace"
const svg = (s) => Buffer.from(s)

// 1. social media 1200x630
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="80" y="86" width="120" height="4" fill="${INK}"/>
  <text x="76" y="118" font-family="${MONO}" font-size="22" letter-spacing="7" fill="${MUTED}">CONCEPT · DESIGN · CODE · PRODUCTION</text>
  <text x="72" y="330" font-family="${FF}" font-weight="800" font-size="215" letter-spacing="-8" fill="${INK}">DEMIEN</text>
  <text x="72" y="510" font-family="${FF}" font-weight="800" font-size="215" letter-spacing="-8" fill="${MUTED}">RAPP</text>
  <rect x="80" y="560" width="1040" height="1" fill="#d7d4cc"/>
  <text x="80" y="596" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${MUTED}">rappde.com</text>
  <text x="1120" y="596" text-anchor="end" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${MUTED}">Düsseldorf</text>
</svg>`
await sharp(svg(social)).png().toFile(join(out, 'social-1200x630.png'))

// 2. square icon 1024/512/256
const favSquare = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="${INK}"/>
  <rect x="150" y="150" width="724" height="724" fill="none" stroke="${PAPER}" stroke-width="10"/>
  <text x="512" y="512" text-anchor="middle" dominant-baseline="central" font-family="${FF}" font-weight="800" font-size="520" letter-spacing="-20" fill="${PAPER}">DR</text>
</svg>`
for (const size of [1024, 512, 256]) {
  await sharp(svg(favSquare)).resize(size, size).png().toFile(join(out, `favicon-${size}.png`))
}

// 3. wide cover 21:9 (2100x900), mine photo + wordmark
const coverOverlay = `<svg xmlns="http://www.w3.org/2000/svg" width="2100" height="900" viewBox="0 0 2100 900">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0.55" y2="0.2">
      <stop offset="0" stop-color="${INK}" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="${INK}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${INK}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="2100" height="900" fill="url(#g)"/>
  <text x="96" y="150" font-family="${MONO}" font-size="26" letter-spacing="8" fill="${PAPER}" opacity="0.7">ARTIST · MAKER · DÜSSELDORF</text>
  <text x="88" y="760" font-family="${FF}" font-weight="800" font-size="230" letter-spacing="-10" fill="${PAPER}">DEMIEN RAPP</text>
  <text x="96" y="835" font-family="${MONO}" font-size="28" letter-spacing="5" fill="${PAPER}" opacity="0.75">rappde.com</text>
</svg>`
await sharp(master)
  .resize(2100, 900, { fit: 'cover', position: 'north' })
  .grayscale()
  .modulate({ brightness: 1.02 })
  .composite([{ input: svg(coverOverlay), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(out, 'cover-wide-21x9.jpg'))

// 4. transparent logo. White fill for dark backgrounds, ink stroke for light ones
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="440" viewBox="0 0 1800 440">
  <g font-family="${FF}" font-weight="800" letter-spacing="-6">
    <text x="20" y="250" font-size="215" fill="${PAPER}" stroke="${INK}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">DEMIEN RAPP</text>
  </g>
  <rect x="24" y="300" width="1180" height="6" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
  <text x="1214" y="308" font-family="${MONO}" font-size="34" font-weight="700" letter-spacing="2" fill="${PAPER}" stroke="${INK}" stroke-width="1.2" paint-order="stroke">rappde.com</text>
</svg>`
await sharp(svg(logo)).png().toFile(join(out, 'logo.png'))

console.log('promo/ written: social-1200x630.png, favicon-{1024,512,256}.png, cover-wide-21x9.jpg, logo.png')
