import { useEffect, useRef } from 'react'
import { cx } from '@/lib/cx'

interface GlitchTextProps {
  text: string
  className?: string
}

/**
 * The site's signature: controlled monochrome luminance displacement.
 * Bursts once on load, re-triggers briefly when scrolled back into view,
 * and on hover (CSS). No continuous JS loop. Disabled under reduced motion.
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: number | undefined
    const trigger = () => {
      el.classList.remove('is-active')
      // force reflow so the animation can restart
      void el.offsetWidth
      el.classList.add('is-active')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => el.classList.remove('is-active'), 700)
    }

    trigger()

    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) trigger()
          }
        },
        { threshold: 0.6 },
      )
      observer.observe(el)
    }

    return () => {
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [text])

  return (
    <span ref={ref} className={cx('glitch', className)} data-text={text}>
      <span className="glitch__base">{text}</span>
      <span className="glitch__layer glitch__layer--1" aria-hidden="true">
        {text}
      </span>
      <span className="glitch__layer glitch__layer--2" aria-hidden="true">
        {text}
      </span>
    </span>
  )
}
