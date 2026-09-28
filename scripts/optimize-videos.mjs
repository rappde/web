/* media_moshunit/ (not in git) -> MP4 + WebM + poster per demo clip and
   screenshot stills in public/mosh/. Needs ffmpeg (or FFMPEG=/path).
   npm run optimize:videos */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const FFMPEG = process.env.FFMPEG || 'ffmpeg'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const masters = join(root, 'media_moshunit')
const out = join(root, 'public', 'mosh')
mkdirSync(out, { recursive: true })

const WIDTH = 1280 // cap 1920 masters to 720p: plenty for the tiles, keeps page light
const FPS = 30
const scale = `scale=${WIDTH}:-2:flags=lanczos`
const run = (args) => execFileSync(FFMPEG, ['-y', ...args], { stdio: 'inherit' })

/* demo loop clips: [masterGif, outputBasename, posterAtSeconds] */
const clips = [
  ['bloom_demo.gif', 'moshunit-bloom-datamosh-demo', 5.0],
  ['reverse_demo.gif', 'moshunit-reverse-datamosh-demo', 4.4],
  ['shuffle_demo.gif', 'moshunit-shuffle-datamosh-demo', 4.7],
  ['alleffect_demo.gif', 'moshunit-stacked-datamosh-demo', 6.8],
  ['transition_demo.gif', 'moshunit-melt-transition-datamosh-demo', 8.0],
]

/* app screenshots grabbed as a single frame from a GIF: [masterGif, outBase, atSeconds] */
const stills = [
  ['deawingeffect_demo.gif', 'moshunit-drawing-effect-zone', 2.8],
  ['effectstacking_demo.gif', 'moshunit-effect-stacking-inspector', 3.5],
]

/* app screenshots from a PNG master: [masterPng, outBase, maxWidth].
   export_preview_demo.png is left out, too small (369x208). */
const images = [
  ['inteface_demo.png', 'moshunit-interface-timeline', 1600],
]

for (const [src, base, posterAt] of clips) {
  const input = join(masters, src)
  // H.264, faststart, no audio
  run(['-i', input, '-an', '-vf', `${scale},fps=${FPS}`,
    '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-preset', 'slow', '-crf', '26', '-movflags', '+faststart',
    join(out, `${base}.mp4`)])
  // VP9 WebM. yuv420p because the GIFs have alpha, which VP9 won't encode
  run(['-i', input, '-an', '-vf', `${scale},fps=${FPS}`,
    '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-crf', '37', '-b:v', '0',
    '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
    join(out, `${base}.webm`)])
  // poster: representative frame (seek after -i for frame accuracy on GIF)
  run(['-i', input, '-ss', String(posterAt), '-frames:v', '1',
    '-vf', scale, '-q:v', '3', join(out, `${base}.jpg`)])
  console.log(`clip  ${base}`)
}

for (const [src, base, at] of stills) {
  run(['-i', join(masters, src), '-ss', String(at), '-frames:v', '1',
    '-vf', 'scale=1600:-2:flags=lanczos', '-q:v', '2', join(out, `${base}.jpg`)])
  console.log(`still ${base}`)
}

for (const [src, base, maxW] of images) {
  // min() guards against upscaling a small master; escape the comma for ffmpeg's filtergraph parser
  run(['-i', join(masters, src), '-vf', `scale=min(${maxW}\\,iw):-2:flags=lanczos`,
    '-q:v', '2', join(out, `${base}.jpg`)])
  console.log(`image ${base}`)
}

console.log('\nDone. Optimised assets in public/mosh/')
