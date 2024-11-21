import { ConfigProvider } from '@arco-design/web-react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'

import ElementQueries from 'css-element-queries/src/ElementQueries'
ElementQueries.listen()

import '@arco-design/web-react/dist/css/arco.css'
import './app.less'
import { RectRender, registerUI } from 'leafer-ui'

import './test.css'
import { useState } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
      <App />
    </ConfigProvider>
  </HashRouter>
)
