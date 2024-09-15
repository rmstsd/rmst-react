import { Menu, Button } from '@arco-design/web-react'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useMatch, useNavigate, useNavigation } from 'react-router-dom'
import routes from '../routes'
import { useLocalStorageState } from 'ahooks'

const LayoutView: React.FC = props => {
  const navigate = useNavigate()
  const location = useLocation()

  const [sideOpen, setSideOpen] = useLocalStorageState('side-open', { defaultValue: false })

  return (
    <div style={{ display: 'flex' }} className="h-full">
      <aside className="relative">
        <Button className="absolute top-0 z-20" onClick={() => setSideOpen(!sideOpen)}>
          {sideOpen ? 'Close' : 'Open'}
        </Button>

        <Menu
          className="sticky left-0 top-0 h-screen w-[200px] shrink-0 overflow-auto border-r-2 transition-all"
          style={{ marginLeft: sideOpen ? 0 : -200 }}
          defaultOpenKeys={routes.map(item => item.path)}
          selectedKeys={[location.pathname.split('/')[2]]}
          onClickMenuItem={(key, evt, keyPath) => {
            const path = keyPath.reverse().join('/')
            navigate(path)
          }}
        >
          {routes
            .filter(item => !item.hidden)
            .map(item => {
              return (
                <Menu.SubMenu key={item.path} title={item.path}>
                  {item.children?.map(ktem => <Menu.Item key={ktem.path}>{ktem.path}</Menu.Item>)}
                </Menu.SubMenu>
              )
            })}
        </Menu>
      </aside>

      <section className="flex-grow p-[10px]">
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutView
