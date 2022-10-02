import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'

import Visible from './views/UiComponent/Visible'
import TooltipEg from './views/UiComponent/TooltipEg'
import VCardList from './views/UiComponent/VCardList'
import VirtualListDemo from './views/UiComponent/VirtualListDemo'
import AVlistNotHeight from './views/UiComponent/AVlistNotHeight/App'

import ControlNotControl from './views/ControlNotControl'
import Hooks from './views/Hooks'

import EditHtml from './views/EditHtml'
import WangEditor from './views/UiComponent/WangEditor'
import TriggerDemo from './views/UiComponent/TriggerDemo'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'visible', index: true, element: <Visible /> },

      // { path: 'tooltipEg', element: <TooltipEg /> },
      // { path: 'VCardList', element: <VCardList /> },

      // { path: 'VirtualList', element: <VirtualListDemo /> },
      // { path: 'AVlistNotHeight', element: <AVlistNotHeight /> },

      // { path: 'WangEditor', element: <WangEditor /> },

      { path: 'TriggerDemo', element: <TriggerDemo /> }
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
  }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
