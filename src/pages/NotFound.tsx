import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>404 · Demien Rapp</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="notfound" id="main">
        <p className="eyebrow">Error 404</p>
        <h1 className="notfound__code">404</h1>
        <p>This page does not exist. Diese Seite gibt es nicht.</p>
        <Link className="btn btn--primary" to="/">
          Back home →
        </Link>
      </main>
    </>
  )
}
