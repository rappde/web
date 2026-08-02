import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cx } from '@/lib/cx'

interface RevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** stagger delay in ms */
  delay?: number
}

/** Wraps children in a scroll-revealing <div>. */
export function Reveal({ children, className, style, delay }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  )
}
