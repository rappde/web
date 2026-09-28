import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { Shell } from '@/components/Shell'

export default function NotFound() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>404 · Demien Rapp</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Shell title="Error 404">
        <h1>404</h1>
        <p>This page does not exist. Diese Seite gibt es nicht.</p>
        <div className="actions">
          <Link className="buy" to="/">
            Back to the start page →
          </Link>
        </div>
      </Shell>
    </>
  )
}
