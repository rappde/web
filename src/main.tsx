import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// One stylesheet for every page (design from the former public/v2).
// The Endless font is self-hosted from /fonts, never a CDN.
import './styles/site.css'

export const createRoot = ViteReactSSG({ routes })
