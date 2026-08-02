import { Link } from 'react-router-dom'
import type { Content } from '@/content/types'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Footer({ content }: { content: Content }) {
  const { footer } = content
  const year = new Date().getFullYear()
  const legalLabel = content.lang === 'de' ? 'Rechtliches' : 'Legal'

  return (
    <footer className="footer container" role="contentinfo">
      <span className="footer__copy">© {year} Demien Rapp</span>

      <div className="footer__meta">
        <nav className="footer__nav" aria-label={legalLabel}>
          {footer.legalLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher lang={content.lang} />
      </div>
    </footer>
  )
}
