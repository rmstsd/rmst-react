import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'

import App from './App.tsx'

import '@arco-design/web-react/dist/css/arco.css'
import './app.less'
import { createContext } from 'react'

export const NestContext = createContext(null)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <NestContext.Provider value={{ name: 'nest root app', uu: 'other' }}>
      <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
        <App />
      </ConfigProvider>
    </NestContext.Provider>
  </HashRouter>
)
