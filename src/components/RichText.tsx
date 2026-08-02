import { Fragment } from 'react'

/**
 * Renders a string, turning [[words]] into pixel-font spans — the typo-mix
 * break that carries the identity (§2c). Keep it to one word per headline.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[\[([^\]]+)\]\]$/)
        if (match) {
          return (
            <span className="pixel" key={i}>
              {match[1]}
            </span>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
