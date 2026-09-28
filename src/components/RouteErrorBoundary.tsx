import { useEffect, useState } from 'react'

/**
 * A tab left open across a deploy still has the old build hash, so the
 * static-loader-data-manifest-<hash>.json fetch gets 404.html back and
 * JSON.parse throws. One reload fixes that. If the error is still there
 * after the reload, show the fallback instead of looping.
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
    <main className="win doc">
      <p className="winbar">Error</p>
      <h1>Something broke loading this page.</h1>
      <p style={{ marginTop: 'var(--line)' }}>
        <a href={window.location.pathname}>Reload</a> usually fixes it. If it keeps happening,{' '}
        <a href="mailto:demien.rp@gmail.com">let me know</a>.
      </p>
    </main>
  )
}
