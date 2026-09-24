import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Self-hosted fonts (OFL, bundled — never the Google CDN; REDESIGN-BRIEF §2).
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
// Hard bitmap face for the typo-mix break — "error as material" as type (§2c).
import '@fontsource/silkscreen/400.css'
import '@fontsource/silkscreen/700.css'

import './styles/globals.css'
import './styles/glitch.css'
import './styles/sections.css'

export const createRoot = ViteReactSSG({ routes })
