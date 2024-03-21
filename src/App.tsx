import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'

import Drag from './views/Drag'
import DndKit from './views/DndKit/IndexDndKit'
import OrPortalTest from './views/OrPortalTest'

import VirtualListTest from './views/VirtualListTest'
import SlateDemo from './views/SlateDemo'
import Dm from './views/Dm/Dm'
import MyPortalTest from './views/PortalTest/MyPortalTest'
import NestedContext from './views/NestedContext'
import Hooks18 from './views/Hooks18'
import VSelect from './views/VSelect'
import StickDemo from './views/StickDemo'
import QuadTree from './views/QuadTree'
import UndoRedo from './views/UndoRedo'
import ScrollDemo from './views/ScrollDemo'
import MobxDemo from './views/MobxDemo'
import Sku from './views/Sku'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/stickDemo" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/dndKit" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'stickDemo', element: <StickDemo /> },
      { path: 'drag', element: <Drag /> },
      { path: 'dndKit', element: <DndKit /> },
      { path: 'orPortalTest', element: <OrPortalTest /> },
      { path: 'myPortalTest', element: <MyPortalTest /> },
      { path: 'NestedContext', element: <NestedContext /> },
      { path: 'Hooks18', element: <Hooks18 /> },
      { path: 'VSelect', element: <VSelect /> },
      { path: 'QuadTree', element: <QuadTree /> },
      { path: 'UndoRedo', element: <UndoRedo /> },
      { path: 'ScrollDemo', element: <ScrollDemo /> },
      { path: 'MobxDemo', element: <MobxDemo /> }
    ]
  },
  {
    path: '/sector',
    element: <LayoutView />,
    children: [
      { path: 'Misc', element: <VirtualListTest /> },
      { path: 'dm', element: <Dm /> }
    ]
  },

  {
    path: '/slate',
    element: <LayoutView />,
    children: [{ path: 'slate', element: <SlateDemo /> }]
  },
  {
    path: '/sku',
    element: <LayoutView />,
    children: [{ path: 'sku', element: <Sku /> }]
  },
  {
    path: '*',
    element: <Navigate to="/" />,
    hidden: true
  }
]

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
