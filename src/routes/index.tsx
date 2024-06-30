import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from '../layout/Layout'

import Drag from '../views/Drag'
import DndKit from '../views/DndKit/IndexDndKit'
import OrPortalTest from '../views/OrPortalTest'

import Dm from '../views/Dm/Dm'
import MyPortalTest from '../views/PortalTest/MyPortalTest'
import NestedContext from '../views/NestedContext'
import Hooks18 from '../views/Hooks18'
import VSelect from '../views/VSelect'
import Immer from '../views/Immer'
import QuadTree from '../views/QuadTree'
import ScrollDemo from '../views/ScrollDemo'
import Sku from '../views/Sku'
import ContextSelector from '@/views/ContextSelector'
import LgDemo from '@/views/LiteGraph/LgDemo'
import YogaLayout from '@/views/YogaLayout'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/immer" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/immer" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'immer', element: <Immer /> },
      { path: 'contextSelector', element: <ContextSelector /> },
      { path: 'drag', element: <Drag /> },
      { path: 'dndKit', element: <DndKit /> },
      { path: 'NestedContext', element: <NestedContext /> },
      { path: 'Hooks18', element: <Hooks18 /> },
      { path: 'QuadTree', element: <QuadTree /> },
      { path: 'Litegraph', element: <LgDemo /> },
      { path: 'YogaLayout', element: <YogaLayout /> }
    ]
  },
  {
    path: '/demo',
    element: <LayoutView />,
    children: [
      { path: 'orPortalTest', element: <OrPortalTest /> },
      { path: 'myPortalTest', element: <MyPortalTest /> },
      { path: 'ScrollDemo', element: <ScrollDemo /> },
      { path: 'VSelect', element: <VSelect /> },
      { path: 'dm', element: <Dm /> }
    ]
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
