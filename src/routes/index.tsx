import type { RouteObject } from 'react-router-dom'

import Cart from '@/views/Sku/Cart'
import Webgl from '@/views/Canvas/Webgl/Webgl'
import YogaLayout from '@/views/Canvas/YogaLayout'
import ZrDragIndex from '@/views/ZrDrag/ZrDragIndex'
import { Navigate } from 'react-router-dom'

import LayoutView from '../layout/Layout'
import Rmst from '../views/_RmstSd/Rmstsd'
import OrPortalTest from '../views/OrPortalTest'
import MyPortalTest from '../views/PortalTest/MyPortalTest'
import Sku from '../views/Sku'
import Pixi from '@/views/Canvas/Pixi/Pixi'
import Native from '@/views/Canvas/Native/Native'
import LeaferDemo from '@/views/Canvas/Leafer/Leafer'

type IRouteObject = RouteObject & { hidden?: boolean }
const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/rmst" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/rmst" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'rmst', element: <Rmst /> },
      { path: 'ZrDrag', element: <ZrDragIndex /> }
    ]
  },
  {
    path: '/canvas',
    element: <LayoutView />,
    children: [
      { path: 'gl', element: <Webgl /> },
      { path: 'YogaLayout', element: <YogaLayout /> },
      { path: 'Pixi', element: <Pixi /> },
      { path: 'Native', element: <Native /> },
      { path: 'LeaferDemo', element: <LeaferDemo /> }
    ]
  },
  {
    path: '/demo',
    element: <LayoutView />,
    children: [
      { path: 'orPortalTest', element: <OrPortalTest /> },
      { path: 'myPortalTest', element: <MyPortalTest /> }
    ]
  },
  {
    path: '/sku',
    element: <LayoutView />,
    children: [
      { path: 'sku', element: <Sku /> },
      { path: 'cart', element: <Cart /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />,
    hidden: true
  }
]

export default routes
