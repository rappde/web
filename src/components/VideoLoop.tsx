import { useEffect, useState } from 'react'
import { cx } from '@/lib/cx'

/**
 * Self-hosted looping clip for the MOSH_UNIT page (demo + gallery).
 * With `src`: a muted, inline video. `autoPlay` (default true) suits a single
 * user-selected demo clip; the gallery passes `autoPlay={false}` so many
 * clips don't all play at once (performance, and the "no unnecessary motion"
 * rule) — it gets native controls instead. Reduced-motion visitors never get
 * autoplay either way. `src` is the H.264 MP4; pass `webm` for the smaller VP9
 * fallback (offered first, MP4 second). A `poster` covers the box until the
 * first frame paints, so there is never a blank/black frame. Without `src`: the
 * site's aspect-locked placeholder box plus an optional short "coming soon"
 * line, so real clips drop in later with zero layout shift. No third-party
 * embeds (CSP).
 */
export function VideoLoop({
  src,
  webm,
  poster,
  label,
  comingSoon,
  aspect = '16 / 9',
  autoPlay = true,
  className,
}: {
  /** H.264 MP4 source (fallback / broad support) */
  src?: string
  /** VP9 WebM source, offered before the MP4 when the browser supports it */
  webm?: string
  poster?: string
  /** placeholder chip text while no src exists */
  label?: string
  /** small muted line under the placeholder chip, e.g. "Demo clip coming soon" */
  comingSoon?: string
  aspect?: string
  autoPlay?: boolean
  className?: string
}) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const playsAuto = autoPlay && !reducedMotion

  return (
    <div className={cx('media', className)} style={{ aspectRatio: aspect }}>
      {src ? (
        <video
          className="media__img"
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={playsAuto}
          controls={!playsAuto}
          preload={playsAuto ? 'auto' : 'metadata'}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="media__inner">
          <span className="media__badge">{label ?? 'Video'}</span>
          {comingSoon && <span className="mosh-soon">{comingSoon}</span>}
        </div>
      )}
    </div>
  )
}
