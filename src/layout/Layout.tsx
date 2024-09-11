import { Menu, Button } from '@arco-design/web-react'
import { useLocalStorageState } from 'ahooks'
import React, { useState } from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'

import routes from '../routes'

const LayoutView: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [sideOpen, setSideOpen] = useLocalStorageState('side-open', { defaultValue: false })

  return (
    <div className="h-full">
      <aside className="fixed left-0 top-0 z-10 h-full">
        <Button className="absolute top-0 z-20" onClick={() => setSideOpen(!sideOpen)}>
          {sideOpen ? 'Close' : 'Open'}
        </Button>

        <Menu
          className="w-[200px] h-full overflow-auto border-r-2 transition-all"
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

      <section className="p-[10px] transition-all h-full" style={{ marginLeft: sideOpen ? 200 : 0 }}>
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutView
