import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal primitive. Returns a ref + visibility flag.
 * SSR-safe: starts hidden only once JS confirms IntersectionObserver exists,
 * and the `.reveal` hidden state is scoped to `html.js` so no-JS users always
 * see content. Reduced motion is handled in CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
