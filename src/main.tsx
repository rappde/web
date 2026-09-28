import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Endless font is self-hosted from /fonts
import './styles/site.css'

export const createRoot = ViteReactSSG({ routes })
