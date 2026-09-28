import { useRef, useState } from 'react'

/**
 * Click-to-load YouTube embed for the MOSH_UNIT tutorial. The poster is
 * self-hosted and the iframe (youtube-nocookie) only appears after a click,
 * so nothing goes to YouTube before that (privacy, and the CSP frame-src).
 */

export interface VideoChapter {
  /** display timecode, e.g. "01:20" */
  time: string
  /** ?start= value in seconds */
  seconds: number
  label: string
}

const NOCOOKIE = 'https://www.youtube-nocookie.com'

export function VideoEmbed({
  videoId,
  title,
  thumbnail,
  thumbWidth = 1280,
  thumbHeight = 720,
  thumbAlt,
  chapters,
  chaptersLabel,
  playLabel,
  jumpLabel,
  watchOnYouTube,
}: {
  videoId: string
  title: string
  thumbnail: string
  thumbWidth?: number
  thumbHeight?: number
  thumbAlt: string
  chapters: VideoChapter[]
  chaptersLabel: string
  playLabel: string
  jumpLabel: string
  watchOnYouTube: string
}) {
  /** null until the first click; `key` forces a remount so repeat clicks reseek */
  const [active, setActive] = useState<{ start: number; key: number } | null>(null)
  const keyRef = useRef(0)
  const warmedRef = useRef(false)

  const play = (start: number) => setActive({ start, key: (keyRef.current += 1) })

  /** preconnect on first hover/focus, no content fetched */
  const warm = () => {
    if (warmedRef.current || typeof document === 'undefined') return
    warmedRef.current = true
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = NOCOOKIE
    document.head.appendChild(link)
  }

  const src =
    active &&
    `${NOCOOKIE}/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` +
      (active.start > 0 ? `&start=${active.start}` : '')

  return (
    <div className="video-embed">
      <div className="video-embed__player">
        {active ? (
          <iframe
            key={active.key}
            className="video-embed__frame"
            src={src as string}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-embed__facade"
            aria-label={`${playLabel}: ${title}`}
            onClick={() => play(0)}
            onMouseEnter={warm}
            onFocus={warm}
          >
            <img
              className="video-embed__thumb"
              src={thumbnail}
              width={thumbWidth}
              height={thumbHeight}
              alt={thumbAlt}
              loading="lazy"
              decoding="async"
            />
            <span className="video-embed__play" aria-hidden="true">▶</span>
          </button>
        )}

        <noscript>
          <a className="video-embed__noscript" href={`https://www.youtube.com/watch?v=${videoId}`}>
            {watchOnYouTube}
          </a>
        </noscript>
      </div>

      <div className="video-embed__aside">
        <p className="video-embed__chapterslabel meta">{chaptersLabel}</p>
        <ol className="video-embed__chapters">
          {chapters.map((ch) => (
            <li key={ch.seconds}>
              <button
                type="button"
                className="video-embed__chapter"
                aria-label={`${jumpLabel}: ${ch.label} (${ch.time})`}
                onClick={() => play(ch.seconds)}
                onMouseEnter={warm}
                onFocus={warm}
              >
                <span className="video-embed__time meta" aria-hidden="true">{ch.time}</span>
                <span className="video-embed__chapterlabel">{ch.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
