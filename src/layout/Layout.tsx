import { Menu, Button } from '@arco-design/web-react'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useMatch, useNavigate, useNavigation } from 'react-router-dom'
import { routes } from '../routes'

const LayoutView: React.FC = props => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ display: 'flex' }}>
      <Menu
        className="border-r-2 w-[200px] h-screen overflow-auto shrink-0 sticky top-0"
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
                {item.children?.map(ktem => (
                  <Menu.Item key={ktem.path}>{ktem.path}</Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          })}
      </Menu>

      <section className="p-[10px] flex-grow"><Outlet /></section>
    </div>
  )
}

export default LayoutView
