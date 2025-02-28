import { Button, Menu } from '@arco-design/web-react'
import { IconLeft, IconRight } from '@arco-design/web-react/icon'

import { useLocalStorageState } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'

import routes from '../routes'

const LayoutView: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [sideOpen, setSideOpen] = useLocalStorageState('side-open', {
    defaultValue: window.innerWidth < 500 ? false : true
  })

  useEffect(() => {
    document.title = location.pathname
  }, [location.pathname])

  return (
    <div className="h-full">
      <Button
        shape="round"
        className="fixed bottom-4 left-4 z-20"
        size="large"
        icon={sideOpen ? <IconLeft /> : <IconRight />}
        onClick={() => setSideOpen(!sideOpen)}
        style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)', border: '1px solid #ddd' }}
        type="default"
      ></Button>

      <aside className="fixed left-0 top-0 z-10 h-full">
        <Menu
          className="h-full w-[200px] overflow-auto border-r-2 transition-all"
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

          <div className="h-40"></div>
        </Menu>
      </aside>

      <section className="box-border h-full p-[10px] transition-all" style={{ marginLeft: sideOpen ? 200 : 0 }}>
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutView
