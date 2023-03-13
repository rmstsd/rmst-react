import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'

import TriggerDemo from './views/UiComponent/TriggerDemo'
import EllipsisDemo from './views/UiComponent/EllipsisDemo'
import ImageViewDemo from './views/UiComponent/ImageViewDemo'

import Drag from './views/UiComponent/Drag'
import DndKit from './views/UiComponent/DndKit/DndKit'
import Sector from './views/Sector'
import CssTransitionDe from './views/CssTransitionDe'

import CanvaskitWasmDe from './views/CanvaskitWasmDe'
import FormDe from './views/Form/FormDe'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      // { path: 'VCardList', element: <VCardList /> },

      // { path: 'VirtualList', element: <VirtualListDemo /> },
      // { path: 'AVlistNotHeight', element: <AVlistNotHeight /> },

      { path: 'trigger-demo', element: <TriggerDemo /> },
      { path: 'ellipsis-demo', element: <EllipsisDemo /> },
      { path: 'image-view-demo', element: <ImageViewDemo /> },
      { path: 'drag', element: <Drag /> },
      { path: 'dndKit', element: <DndKit /> },
      { path: 'react-transition-group', element: <DndKit /> }
    ]
  },
  {
    path: '/sector',
    element: <LayoutView />,
    children: [
      { path: 'sector', element: <Sector /> },
      { path: 'CssTransition', element: <CssTransitionDe /> },
      { path: 'CanvaskitWasmDe', element: <CanvaskitWasmDe /> }
    ]
  },
  {
    path: '/form',
    element: <LayoutView />,
    children: [{ path: 'formDe', element: <FormDe /> }]
  }
  // {
  //   path: '*',
  //   element: <LayoutView />,
  //   children: [{ path: 'sector', element: <Sector /> }]
  // }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
