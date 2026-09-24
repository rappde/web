import { Link } from 'react-router-dom'
import type { Lang } from '@/content/types'

/** Persist the visitor's explicit choice so the browser-language auto-redirect
    in index.html never overrides it again. */
function remember(lang: Lang) {
  try {
    localStorage.setItem('lang', lang)
  } catch {
    /* private mode etc. — the choice simply isn't remembered */
  }
}

/**
 * EN / DE toggle. EN lives at "/", DE at "/de" (REDESIGN-BRIEF §1b).
 * On legal pages the home targets can be overridden.
 */
export function LanguageSwitcher({
  lang,
  enHref = '/',
  deHref = '/de',
}: {
  lang: Lang
  enHref?: string
  deHref?: string
}) {
  return (
    <div className="lang-switch" role="group" aria-label="Language / Sprache">
      <Link
        to={enHref}
        hrefLang="en"
        aria-current={lang === 'en' ? 'page' : undefined}
        onClick={() => remember('en')}
      >
        EN
      </Link>
      <Link
        to={deHref}
        hrefLang="de"
        aria-current={lang === 'de' ? 'page' : undefined}
        onClick={() => remember('de')}
      >
        DE
      </Link>
    </div>
  )
}
