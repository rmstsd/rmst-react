import Home from '@/siteViews'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

export const siteRoutes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]
