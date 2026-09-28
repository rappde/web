import { Outlet } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { RouteErrorBoundary } from './components/RouteErrorBoundary'
import Home from './pages/Home'
import MoshUnit from './pages/MoshUnit'
import Datamoshing from './pages/Datamoshing'
import HowToDatamosh from './pages/HowToDatamosh'
import DatamoshingTools from './pages/DatamoshingTools'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import Tools from './pages/Tools'
import NotFound from './pages/NotFound'

// EN is the default at "/", DE at "/de" (both real translations, hreflang pair).

// Every route nests under one pathless layout route so a single errorElement
// catches all of them (react-router bubbles a loader/render error up to the
// nearest ancestor errorElement). See RouteErrorBoundary for why this exists:
// stale-hash JSON fetches after a deploy, not an actual app bug.
export const routes: RouteRecord[] = [
  {
    element: <Outlet />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <Home />, entry: 'src/pages/Home.tsx' },
      { path: '/de', element: <Home lang="de" />, entry: 'src/pages/Home.tsx' },
      { path: '/tools', element: <Tools />, entry: 'src/pages/Tools.tsx' },
      { path: '/mosh_unit', element: <MoshUnit lang="en" />, entry: 'src/pages/MoshUnit.tsx' },
      { path: '/de/mosh_unit', element: <MoshUnit lang="de" />, entry: 'src/pages/MoshUnit.tsx' },
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
