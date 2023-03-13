import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'
import App from './App'
import './app.less'

import '@arco-design/web-react/dist/css/arco.css'
import 'antd/dist/reset.css'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
