import { Menu } from 'antd'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { routes } from '../App'

const LayoutView: React.FC = props => {
  const navigate = useNavigate()
  const location = useLocation()

  const handle = (array: typeof routes) => {
    return array
      .filter(item => !item.hidden)
      .map(item => ({
        label: item.path,
        key: item.path,
        ...(item.children ? { children: handle(item.children) } : null)
      }))
  }

  const items = handle(routes)
  return (
    <div style={{ display: 'flex' }}>
      <Menu
        style={{ width: 200, height: '100vh' }}
        items={items}
        mode="inline"
        theme="dark"
        onClick={({ key, keyPath }) => {
          navigate(keyPath.reverse().join('/'))
        }}
        defaultOpenKeys={routes.map(item => item.path)}
        selectedKeys={[location.pathname.split('/')[2]]}
      />

      <section style={{ padding: 10, flexGrow: 1 }}>{<Outlet />}</section>
    </div>
  )
}

export default LayoutView
