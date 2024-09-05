import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from '../layout/Layout'

import OrPortalTest from '../views/OrPortalTest'

import Dm from '../views/Dm/Dm'
import MyPortalTest from '../views/PortalTest/MyPortalTest'
import Hooks18 from '../views/Hooks18'
import VSelect from '../views/VSelect'
import Immer from '../views/Immer'
import QuadTree from '../views/QuadTree'
import ScrollDemo from '../views/ScrollDemo'
import Sku from '../views/Sku'
import ContextSelector from '@/views/ContextSelector'
import LgDemo from '@/views/LiteGraph/LgDemo'
import YogaLayout from '@/views/YogaLayout'
import ZrDragIndex from '@/views/ZrDrag/ZrDragIndex'
import Cart from '@/views/Sku/Cart'
import Svg from '@/views/Svg/Svg'
import ElementRise from '@/views/ElementRise'
import MapView from '@/mapView'
import Ck from '@/views/Ck/Ck'
import Webgl from '@/views/Webgl/Webgl'

type IRouteObject = RouteObject & { hidden?: boolean }
const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/immer" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/immer" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'immer', element: <Immer /> },
      { path: 'ck', element: <Ck /> },
      { path: 'gl', element: <Webgl /> },
      { path: 'ZrDrag', element: <ZrDragIndex /> },
      { path: 'contextSelector', element: <ContextSelector /> },
      { path: 'Hooks18', element: <Hooks18 /> },
      { path: 'QuadTree', element: <QuadTree /> },
      { path: 'MapView', element: <MapView /> }
      // { path: 'YogaLayout', element: <YogaLayout /> }
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
      { path: 'dm', element: <Dm /> },
      { path: 'svg-ruler', element: <Svg /> },
      { path: 'elementRise', element: <ElementRise /> }
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
