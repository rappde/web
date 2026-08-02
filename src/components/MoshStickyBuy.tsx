import { useEffect, useState } from 'react'
import { ItchBuyButton } from './ItchBuyButton'
import { ITCH_URL, ITCH_USER, ITCH_GAME } from '@/content/mosh-unit'

/**
 * Mobile-only sticky buy bar: keeps the price + Get MOSH_UNIT one tap away while
 * the visitor scrolls the page. Paper background + a top hairline (NOT inverted),
 * so the page keeps its single inverted block (the pricing section); only the
 * primary button is ink-filled, exactly like every other primary button on the
 * site. It hides itself while the pricing #buy block is on screen so it never
 * doubles up on the real buy button. Shown via a CSS media query (<=760px) only;
 * SSR renders the markup and the observer wires up on mount. Respects the iOS
 * home-indicator safe area (handled in CSS).
 */
export function MoshStickyBuy({
  price,
  cta,
  note,
}: {
  price: string
  cta: string
  note: string
}) {
  const [overBuy, setOverBuy] = useState(false)

  useEffect(() => {
    // Hide the bar while the pricing block OR the footer is on screen: over #buy
    // it would double the buy button, and over the footer it would cover content.
    // A scroll listener with getBoundingClientRect (rather than IntersectionObserver)
    // keeps this cheap and works everywhere; two rects per frame is negligible.
    const targets = [
      document.getElementById('buy'),
      document.querySelector('footer'),
    ].filter((el): el is HTMLElement => el !== null)
    if (!targets.length) return

    const check = () => {
      const vh = window.innerHeight
      const anyVisible = targets.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < vh && r.bottom > 0
      })
      setOverBuy(anyVisible)
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
    <div className={overBuy ? 'mosh-stickybuy is-hidden' : 'mosh-stickybuy'} aria-hidden={overBuy}>
      <span className="mosh-stickybuy__price">
        <span className="mosh-stickybuy__now">{price}</span>
        <span className="mosh-stickybuy__note meta">{note}</span>
      </span>
      <ItchBuyButton
        user={ITCH_USER}
        game={ITCH_GAME}
        href={ITCH_URL}
        className="btn btn--primary mosh-stickybuy__btn"
      >
        {cta}
        <span className="btn__arrow" aria-hidden="true">→</span>
      </ItchBuyButton>
    </div>
  )
}
