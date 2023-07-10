import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'
import App from './App'
import './app.less'

import '@arco-design/web-react/dist/css/arco.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
      <App />
    </ConfigProvider>
  </HashRouter>
)
