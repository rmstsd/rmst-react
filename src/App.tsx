import React from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'
import EditHtml from './views/EditHtml'
import Visible from './views/Visible'
import ControlNotControl from './views/ControlNotControl'
import Hooks from './views/Hooks'
import CTextEditor from './views/CTextEditor'
import TooltipEg from './views/TooltipEg'
import VCardList from './views/VCardList'
import VirtualList from './views/VirtualList'
import AVlistNotHeight from './views/AVlistNotHeight/App'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'visible', index: true, element: <Visible /> },
      { path: 'tooltipEg', element: <TooltipEg /> },
      { path: 'VCardList', element: <VCardList /> },

      { path: 'VirtualList', element: <VirtualList /> },
      { path: 'AVlistNotHeight', element: <AVlistNotHeight /> }
    ]
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
  },
  {
    path: '/c',
    element: <LayoutView />,
    children: [{ path: 'ct', element: <CTextEditor /> }]
  }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
