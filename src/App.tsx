import React from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'
import EditHtml from './views/EditHtml'
import Visible from './views/Visible'
import ControlNotControl from './views/ControlNotControl'
import Hooks from './views/Hooks'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui" />, hidden: true },
  {
    path: '/ui',
    element: <LayoutView />,
    children: [{ path: 'visible', element: <Visible /> }]
  },
  {
    path: '/edit',
    element: <LayoutView />,
    children: [{ path: 'editHtml', element: <EditHtml /> }]
  },
  {
    path: '/control-component',
    element: <LayoutView />,
    children: [{ path: 'control-not-control', element: <ControlNotControl /> }]
  },
  {
    path: '/hooks',
    element: <LayoutView />,
    children: [{ path: 'hooks', element: <Hooks /> }]
  }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
