import type { Content, TickerItem } from '@/content/types'

function Group({ items, hidden }: { items: TickerItem[]; hidden?: boolean }) {
  return (
    <div className="ticker__group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className="ticker__item" key={i}>
          {item.date && <span className="ticker__date">{item.date}</span>}
          {item.text}
        </span>
      ))}
    </div>
  )
}

/**
 * Broadcast-style crawl of current / upcoming dates (REDESIGN-BRIEF §4).
 * Maintainable array in content. The track is duplicated for a seamless loop;
 * the duplicate is hidden from assistive tech. Pauses on hover; under
 * prefers-reduced-motion the animation stops and the strip scrolls manually.
 */
export function NewsTicker({ content }: { content: Content }) {
  const { ticker } = content

  return (
    <aside className="ticker" aria-label={ticker.label}>
      <div className="ticker__label">{ticker.label}</div>
      <div className="ticker__viewport">
        <div className="ticker__track">
          <Group items={ticker.items} />
          <Group items={ticker.items} hidden />
        </div>
      </div>
    </aside>
  )
}
