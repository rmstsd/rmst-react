import { Menu } from 'antd'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { routes } from '../App'

const LayoutView: React.FC = props => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ display: 'flex' }}>
      <Menu
        style={{ width: 200, height: '100vh' }}
        mode="inline"
        theme="dark"
        defaultOpenKeys={routes.map(item => item.path)}
        selectedKeys={[location.pathname]}
      >
        {routes.map(
          routeItem =>
            !routeItem.hidden && (
              <Menu.SubMenu key={routeItem.path} title={routeItem.path}>
                {routeItem.children &&
                  routeItem.children.map(childItem => {
                    const wholePath = routeItem.path + '/' + childItem.path
                    return (
                      <Menu.Item key={wholePath} onClick={() => navigate(wholePath)}>
                        {wholePath.slice(1).replaceAll('/', '-')}
                      </Menu.Item>
                    )
                  })}
              </Menu.SubMenu>
            )
        )}
      </Menu>

      <section style={{ padding: 10 }}>{<Outlet />}</section>
    </div>
  )
}

export default LayoutView
