import React from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'
import EditHtml from './views/EditHtml'
import PartialRender from './views/PartialRender'
import Visible from './views/Visible'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui" />, hidden: true },
  {
    path: '/ui',
    element: <LayoutView />,
    children: [
      {
        path: 'visible',
        element: <Visible />
      },
      {
        path: 'partialRender',
        element: <PartialRender />
      }
    ]
  },
  {
    path: '/edit',
    element: <LayoutView />,
    children: [
      {
        path: 'editHtml',
        element: <EditHtml />
      },
      {
        path: 'ee-2',
        element: <div>ee 2</div>
      }
    ]
  }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
