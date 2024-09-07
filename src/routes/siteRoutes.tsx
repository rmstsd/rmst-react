import type { RouteObject } from 'react-router-dom'

import Home from '@/siteViews/Home'
import { Navigate } from 'react-router-dom'

export const siteRoutes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]
