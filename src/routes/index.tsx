import type { RouteObject } from 'react-router-dom'

import MapView from '@/views/Canvas/mapView'
import Ck from '@/views/Canvas/Ck/Ck'
import ContextSelector from '@/views/ContextSelector'
import ElementRise from '@/views/ElementRise'
import LgDemo from '@/views/LiteGraph/LgDemo'
import Cart from '@/views/Sku/Cart'
import Svg from '@/views/Svg/Svg'
import Webgl from '@/views/Canvas/Webgl/Webgl'
import YogaLayout from '@/views/Canvas/YogaLayout'
import ZrDragIndex from '@/views/ZrDrag/ZrDragIndex'
import { Navigate } from 'react-router-dom'

import LayoutView from '../layout/Layout'
import Dm from '../views/Dm/Dm'
import Hooks18 from '../views/Hooks18'
import Rmst from '../views/Rmst'
import OrPortalTest from '../views/OrPortalTest'
import MyPortalTest from '../views/PortalTest/MyPortalTest'
import QuadTree from '../views/QuadTree'
import ScrollDemo from '../views/ScrollDemo'
import Sku from '../views/Sku'
import VSelect from '../views/VSelect'
import Sokoban from '@/views/Sokoban'
import Pixi from '@/views/Canvas/Pixi/Pixi'
import Native from '@/views/Canvas/Native/Native'
import LeaferDemo from '@/views/Canvas/Leafer/Leafer'
import PickerView from '@/views/PickerView'

type IRouteObject = RouteObject & { hidden?: boolean }
const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/rmst" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/rmst" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'rmst', element: <Rmst /> },
      { path: 'ZrDrag', element: <ZrDragIndex /> },
      { path: 'PickerView', element: <PickerView /> },
      { path: 'Sokoban', element: <Sokoban /> },
      { path: 'contextSelector', element: <ContextSelector /> },
      { path: 'Hooks18', element: <Hooks18 /> },
      { path: 'QuadTree', element: <QuadTree /> }
    ]
  },
  {
    path: '/canvas',
    element: <LayoutView />,
    children: [
      { path: 'ck', element: <Ck /> },
      { path: 'gl', element: <Webgl /> },
      { path: 'MapView', element: <MapView /> },
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
