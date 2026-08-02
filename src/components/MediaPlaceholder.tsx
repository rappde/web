import type { Media } from '@/content/types'
import { cx } from '@/lib/cx'

/**
 * Renders a real image (when media.src is set) or an aspect-locked placeholder
 * for material Demien supplies later (REDESIGN-BRIEF §8). The box holds the
 * aspect ratio so real media drops in with no layout shift. The description
 * lives on the image's alt (no visible caption — that only repeated the copy).
 */
export function MediaPlaceholder({
  media,
  className,
}: {
  media: Media
  className?: string
}) {
  const isVideo = media.kind === 'video'
  const hasImage = Boolean(media.src) && !isVideo

  return (
    <figure className={cx('media-figure', className)}>
      <div
        className="media"
        style={{ aspectRatio: media.aspect }}
        aria-hidden={hasImage ? undefined : true}
      >
        {hasImage ? (
          <img
            className="media__img"
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="media__inner">
            {isVideo ? (
              <span className="media__play">
                <span className="media__play-icon">▶</span>
                {media.label ?? 'Video'}
              </span>
            ) : (
              <span className="media__badge">Image</span>
            )}
          </div>
        )}
      </div>
    </figure>
  )
}
