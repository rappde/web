import type { Media } from '@/content/types'

/**
 * Renders a real image (when media.src is set) or an aspect-locked black
 * placeholder for material Demien supplies later (REDESIGN-BRIEF §8). The box
 * holds the aspect ratio so real media drops in with no layout shift.
 */
export function MediaPlaceholder({ media }: { media: Media }) {
  const isVideo = media.kind === 'video'
  const hasImage = Boolean(media.src) && !isVideo

  return (
    <div className="media" style={{ aspectRatio: media.aspect }} aria-hidden={hasImage ? undefined : true}>
      {hasImage ? (
        <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />
      ) : (
        <span>{isVideo ? `▶ ${media.label ?? 'Video'}` : 'Image'}</span>
      )}
    </div>
  )
}
