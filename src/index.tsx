import { ConfigProvider } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'
import './app.less'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
      <App />
    </ConfigProvider>
  </HashRouter>
)

const Func = <T,>(p: T) => {
  console.log(p)
}

Func(1)
