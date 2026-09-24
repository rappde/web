import { useEffect, useState } from 'react'

/**
 * Root errorElement (wired in routes.tsx as the top-level layout route).
 *
 * vite-react-ssg embeds a random build hash into every prerendered page
 * (window.__VITE_REACT_SSG_HASH__) and fetches
 * static-loader-data-manifest-<hash>.json client-side on every route change.
 * Each deploy fully replaces dist/, so that hash's JSON is gone the moment a
 * new version ships. A browser tab left open across a deploy will 404 on
 * that fetch; GitHub Pages serves 404.html (a copy of index.html) for any
 * missing path, so `.json()` tries to parse "<!doctype html>..." and throws
 * "JSON.parse: unexpected character at line 1 column 1" — react-router's
 * default errorElement then shows a raw "Unexpected Application Error!".
 *
 * A hard reload re-fetches the current HTML with the current hash and
 * self-heals immediately. Only show the manual fallback if that didn't fix
 * it (a real error, not a stale deploy), so we don't reload-loop forever.
 */
export function RouteErrorBoundary() {
  const [retried, setRetried] = useState(true)

  useEffect(() => {
    const key = 'ssg-error-reload-attempted'
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1')
      window.location.reload()
    } else {
      setRetried(false)
    }
  }, [])

  if (retried) return null

  return (
    <main className="container" style={{ paddingBlock: 'clamp(6rem, 12vh, 9rem)' }}>
      <p className="meta">ERROR</p>
      <h1 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Something broke loading this page.</h1>
      <p>
        <a href={window.location.pathname}>Reload</a> usually fixes it. If it keeps happening,{' '}
        <a href="mailto:demien.rp@gmail.com">let me know</a>.
      </p>
    </main>
  )
}
