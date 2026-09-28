import { Fragment } from 'react'

/** [[word]] becomes a pixel-font span. One per headline is enough. */
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
