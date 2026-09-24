import { useState } from 'react'
import type { Content } from '@/content/types'

/**
 * Contact as conversion (§2c): the single inverted accent block. Kept
 * deliberately minimal (2026-08-02, Demien) — no statement headline, just
 * the "for line" as the section heading, the email visible + 1-click
 * copyable, plus all profile links and the CV. No mandatory form.
 */
export function Contact({ content }: { content: Content }) {
  const { contact } = content
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the mailto link and visible address still work */
    }
  }

  return (
    <section className="contact inverted" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__main">
          <h2 className="contact__for" id="contact-title">
            {contact.forLine}
          </h2>

          <div className="contact__email-row">
            <a className="contact__email-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <button type="button" className="contact__copy" onClick={copy}>
              <span aria-hidden="true">{copied ? '✓ ' : ''}</span>
              {copied ? contact.copiedLabel : contact.copyLabel}
              <span className="sr-only"> {contact.email}</span>
            </button>
          </div>

          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${contact.email}`}>
              {contact.ctaPrimary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href={contact.portfolioHref} download>
              {contact.portfolioLabel}
            </a>
          </div>
        </div>

        <div className="contact__side">
          <ul className="contact__links">
            {contact.links.map((link) => (
              <li key={link.href}>
                <a
                  className="contact__link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact__link-label">{link.label}</span>
                  <span className="contact__link-handle">{link.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
