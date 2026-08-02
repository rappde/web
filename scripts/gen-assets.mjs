/* Generates the favicon + share-asset set (REDESIGN-BRIEF §9b) from pure
   vector shapes — a blocky "DR" glitch monogram in strict black & white.
   No <text>, so it rasterises identically everywhere (no font dependency).
   These are placeholders; Demien supplies the final icon / OG image later.

   Run: node scripts/gen-assets.mjs   (also wired into `npm run gen:assets`) */

import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '../public')
mkdirSync(PUBLIC, { recursive: true })

const INK = '#0B0B0C'
const PAPER = '#F2F0EB'
const HI = '#FFFFFF'
const MUTED = '#8A8A8E'
const LINE = '#2A2A2E'

// 5×5 block font, only the glyphs we need.
const GLYPHS = {
  D: ['11110', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '11110', '10000', '11111'],
  M: ['10001', '11011', '10101', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001'],
  R: ['11110', '10001', '11110', '10010', '10001'],
  A: ['01110', '10001', '11111', '10001', '10001'],
  P: ['11110', '10001', '11110', '10000', '10000'],
  C: ['01111', '10000', '10000', '10000', '01111'],
  O: ['01110', '10001', '10001', '10001', '01110'],
  '.': ['00000', '00000', '00000', '00000', '01100'],
  ' ': ['00000', '00000', '00000', '00000', '00000'],
}

/** Returns cells [{x,y,row}] for a word laid out at (ox,oy) with cell size `c`. */
function cells(word, ox, oy, c, gap = 1) {
  const out = []
  let cx = ox
  for (const ch of word.toUpperCase()) {
    const g = GLYPHS[ch] ?? GLYPHS[' ']
    for (let r = 0; r < g.length; r++) {
      for (let col = 0; col < g[r].length; col++) {
        if (g[r][col] === '1') {
          out.push({ x: cx + col * c, y: oy + r * c, row: r })
        }
      }
    }
    cx += (5 + gap) * c
  }
  return out
}

function rects(list, c, fill, dx = 0) {
  return list
    .map((p) => `<rect x="${(p.x + dx).toFixed(2)}" y="${p.y.toFixed(2)}" width="${c}" height="${c}" fill="${fill}"/>`)
    .join('')
}

function wordWidth(word, c, gap = 1) {
  return word.length * (5 + gap) * c - gap * c
}

/** Square monogram icon SVG — light field, black DR, white displacement tear. */
function iconSvg(size) {
  const c = size / 16 // cell size → 5-tall glyph = ~5/16 of canvas
  const word = 'DR'
  const w = wordWidth(word, c)
  const ox = (size - w) / 2
  const oy = (size - 5 * c) / 2
  const base = cells(word, ox, oy, c)
  // displacement: rows 1–2 torn by a white slice (right), row 3 doubled (left)
  const bandWhite = base.filter((p) => p.row === 1 || p.row === 2)
  const bandMuted = base.filter((p) => p.row === 3)
  const shift = c * 0.9
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
<rect width="${size}" height="${size}" fill="${PAPER}"/>
${rects(base, c, INK)}
${rects(bandMuted, c, MUTED, -shift)}
${rects(bandWhite, c, PAPER, shift)}
</svg>`
}

/** 1200×630 Open Graph card — light field, no background pattern (§2c). */
function ogSvg() {
  const W = 1200
  const H = 630
  const c = 26 // cell size for the wordmark
  const l1 = cells('DEMIEN', 80, 150, c)
  const l2 = cells('RAPP', 80, 150 + 7 * c, c)
  const band1 = l1.filter((p) => p.row === 1)
  const band2 = l2.filter((p) => p.row === 2)
  const shift = c * 0.45
  const dc = 9
  const dom = cells('RAPPDE.COM', 80, H - 90, dc)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="${PAPER}"/>
<rect x="80" y="96" width="120" height="3" fill="${INK}"/>
${rects(l1, c, INK)}
${rects(l2, c, INK)}
${rects(band1, c, PAPER, shift)}
${rects(band2, c, PAPER, -shift)}
<rect x="80" y="${H - 130}" width="${W - 160}" height="1" fill="#d7d4cc"/>
${rects(dom, dc, '#56565b')}
</svg>`
}

async function png(svg, size, name) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toFile(resolve(PUBLIC, name))
  return buf
}

async function main() {
  const masterSvg = iconSvg(512)

  // vector favicon (modern browsers prefer this)
  writeFileSync(resolve(PUBLIC, 'favicon.svg'), masterSvg)

  // raster icons
  const sizes = [
    [16, 'favicon-16.png'],
    [32, 'favicon-32.png'],
    [48, 'favicon-48.png'],
    [180, 'apple-touch-icon.png'],
    [192, 'icon-192.png'],
    [512, 'icon-512.png'],
  ]
  for (const [size, name] of sizes) {
    await sharp(Buffer.from(iconSvg(512))).resize(size, size).png().toFile(resolve(PUBLIC, name))
  }

  // .ico from 16/32/48
  const icoBufs = await Promise.all(
    [16, 32, 48].map((s) => sharp(Buffer.from(iconSvg(512))).resize(s, s).png().toBuffer()),
  )
  const ico = await pngToIco(icoBufs)
  writeFileSync(resolve(PUBLIC, 'favicon.ico'), ico)

  // OG / Twitter card lives in optimize-images.mjs now (real photo of "mine",
  // written to public/og-image.jpg) — no generated placeholder anymore.

  // silence unused-var lint for helpers kept for ad-hoc use
  void png
  void ogSvg

  console.log('✓ Generated favicon + share assets in /public')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
