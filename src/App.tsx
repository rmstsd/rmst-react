import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import LayoutView from './layout/Layout'

import Drag from './views/UiComponent/Drag'
import DndKit from './views/UiComponent/DndKit/IndexDndKit'
import Sector from './views/Sector'

import CanvaskitWasmDe from './views/CanvaskitWasmDe'
import FormDe from './views/Form/FormDe'
import Misc from './views/Misc'
import StuCore from './views/StuCore/StuCore'
import SlateDemo from './views/SlateDemo'
import Dm from './views/Dm/Dm'

type IRouteObject = RouteObject & { hidden?: boolean }

export const routes: IRouteObject[] = [
  { path: '/', element: <Navigate to="/ui-component/drag" />, hidden: true },
  { path: '/ui-component', element: <Navigate to="/ui-component/drag" />, hidden: true },
  {
    path: '/ui-component',
    element: <LayoutView />,
    children: [
      { path: 'drag', element: <Drag /> },
      { path: 'dndKit', element: <DndKit /> }
    ]
  },
  {
    path: '/sector',
    element: <LayoutView />,
    children: [
      { path: 'sector', element: <Sector /> },
      { path: 'CanvaskitWasmDe', element: <CanvaskitWasmDe /> },
      { path: 'Misc', element: <Misc /> },
      { path: 'dm', element: <Dm /> }
    ]
  },
  {
    path: '/form',
    element: <LayoutView />,
    children: [{ path: 'formDe', element: <FormDe /> }]
  },
  {
    path: '/std',
    element: <LayoutView />,
    children: [{ path: 'std', element: <StuCore /> }]
  },
  {
    path: '/slate',
    element: <LayoutView />,
    children: [{ path: 'slate', element: <SlateDemo /> }]
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
