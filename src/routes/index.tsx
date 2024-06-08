import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from '../layout/Layout'

import Drag from '../views/Drag'
import DndKit from '../views/DndKit/IndexDndKit'
import OrPortalTest from '../views/OrPortalTest'

import VirtualListTest from '../views/VirtualListTest'
import SlateDemo from '../views/SlateDemo'
import Dm from '../views/Dm/Dm'
import MyPortalTest from '../views/PortalTest/MyPortalTest'
import NestedContext from '../views/NestedContext'
import Hooks18 from '../views/Hooks18'
import VSelect from '../views/VSelect'
import Immer from '../views/Immer'
import QuadTree from '../views/QuadTree'
import UndoRedo from '../views/UndoRedo'
import ScrollDemo from '../views/ScrollDemo'
import MobxDemo from '../views/MobxDemo'
import Sku from '../views/Sku'
import ContextSelector from '@/views/ContextSelector'
import LgDemo from '@/views/LiteGraph/LgDemo'
import YogaLayout from '@/views/YogaLayout'
import ReactflowDemo from '@/views/ReactflowDemo'

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
      { path: 'YogaLayout', element: <YogaLayout /> },
      { path: 'ReactflowDemo', element: <ReactflowDemo /> }
    ]
  },
  {
    path: '/demo',
    element: <LayoutView />,
    children: [
      { path: 'orPortalTest', element: <OrPortalTest /> },
      { path: 'myPortalTest', element: <MyPortalTest /> },
      { path: 'UndoRedo', element: <UndoRedo /> },
      { path: 'ScrollDemo', element: <ScrollDemo /> },
      { path: 'MobxDemo', element: <MobxDemo /> },
      { path: 'VSelect', element: <VSelect /> }
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
