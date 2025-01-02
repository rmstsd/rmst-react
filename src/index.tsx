import { ConfigProvider } from '@arco-design/web-react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'

import '@arco-design/web-react/dist/css/index.less'
import './app.less'

import './test.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
      <App />
    </ConfigProvider>
  </HashRouter>
)
