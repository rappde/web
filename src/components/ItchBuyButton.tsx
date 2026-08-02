import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

declare global {
  interface Window {
    Itch?: {
      attachBuyButton: (
        el: Element,
        opts: { user: string; game: string; width?: number; height?: number },
      ) => void
    }
  }
}

const SCRIPT_SRC = 'https://static.itch.io/api.js'
let scriptPromise: Promise<void> | null = null

function loadItchScript(): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('itch.io widget failed to load'))
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

/**
 * itch.io's official buy-button widget (itch.io/docs/api/javascript): loads
 * static.itch.io/api.js once and calls Itch.attachBuyButton on this element,
 * which opens the purchase flow in a real popup window without navigating
 * the current tab away. The element itself is a plain link to the itch.io
 * page, so if the script is blocked (ad blocker, offline, CSP) it still
 * works as a normal link that opens itch.io in a new tab.
 */
export function ItchBuyButton({
  user,
  game,
  href,
  className,
  children,
}: {
  user: string
  game: string
  href: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let cancelled = false
    loadItchScript()
      .then(() => {
        if (!cancelled && ref.current && window.Itch) {
          window.Itch.attachBuyButton(ref.current, { user, game })
        }
      })
      .catch(() => {
        /* script blocked or offline — the element still works as a plain link */
      })
    return () => {
      cancelled = true
    }
  }, [user, game])

  return (
    <a ref={ref} className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
