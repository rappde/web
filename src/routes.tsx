import { Outlet } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { RouteErrorBoundary } from './components/RouteErrorBoundary'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import MoshUnit from './pages/MoshUnit'
import About from './pages/About'
import Datamoshing from './pages/Datamoshing'
import HowToDatamosh from './pages/HowToDatamosh'
import DatamoshingTools from './pages/DatamoshingTools'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import NotFound from './pages/NotFound'

// EN is the default at "/", DE at "/de" (REDESIGN-BRIEF §1b).
// The 3 featured works get their own routes for SEO + shareable links (§2c).
// Legal pages are German and reachable from every footer (§9c).
const FEATURED = ['mine', 'gefuehle', 'ein-viertel', 'soundwalk'] as const

const workRoutes: RouteRecord[] = FEATURED.flatMap((slug) => [
  {
    path: `/works/${slug}`,
    element: <WorkPage lang="en" slug={slug} />,
    entry: 'src/pages/WorkPage.tsx',
  },
  {
    path: `/de/works/${slug}`,
    element: <WorkPage lang="de" slug={slug} />,
    entry: 'src/pages/WorkPage.tsx',
  },
])

// Every route nests under one pathless layout route so a single errorElement
// catches all of them (react-router bubbles a loader/render error up to the
// nearest ancestor errorElement). See RouteErrorBoundary for why this exists:
// stale-hash JSON fetches after a deploy, not an actual app bug.
export const routes: RouteRecord[] = [
  {
    element: <Outlet />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <Home lang="en" />, entry: 'src/pages/Home.tsx' },
      { path: '/de', element: <Home lang="de" />, entry: 'src/pages/Home.tsx' },
      ...workRoutes,
      { path: '/mosh_unit', element: <MoshUnit lang="en" />, entry: 'src/pages/MoshUnit.tsx' },
      { path: '/de/mosh_unit', element: <MoshUnit lang="de" />, entry: 'src/pages/MoshUnit.tsx' },
      { path: '/about', element: <About lang="en" />, entry: 'src/pages/About.tsx' },
      { path: '/de/about', element: <About lang="de" />, entry: 'src/pages/About.tsx' },
      // Datamoshing content hub (English only — targets an English audience; no /de twins).
      { path: '/datamoshing', element: <Datamoshing />, entry: 'src/pages/Datamoshing.tsx' },
      { path: '/how-to-datamosh', element: <HowToDatamosh />, entry: 'src/pages/HowToDatamosh.tsx' },
      { path: '/datamoshing-tools', element: <DatamoshingTools />, entry: 'src/pages/DatamoshingTools.tsx' },
      { path: '/impressum', element: <Impressum />, entry: 'src/pages/Impressum.tsx' },
      { path: '/datenschutz', element: <Datenschutz />, entry: 'src/pages/Datenschutz.tsx' },
      { path: '*', element: <NotFound /> },
    ],
  },
]
