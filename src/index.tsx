import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'

import { unstable_scheduleCallback } from 'scheduler'

import App from './App'
import './app.less'

export const NestContext = createContext(null)
;(() => {
  // test.js

  // const tasks = [1, 1, 2, 2, 3, 3, 4, 4, 1, 2, 3, 4, 1, 2, 3, 4, 3, 2, 1, 1, 1, 1, 1]

  // tasks.forEach((priority, i) => {
  //   unstable_scheduleCallback(priority, () => {
  //     console.log(priority, `第${i}任务`)
  //   })
  // })

  // console.log('script!')

  // Promise.resolve().then(res => console.log('script屁股后的微任务'))

  // return

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
      <NestContext.Provider value={{ name: 'nest root app', uu: 'other' }}>
        <ConfigProvider componentConfig={{ Button: { type: 'primary' } }}>
          <App />
        </ConfigProvider>
      </NestContext.Provider>
    </HashRouter>
  )
})()

// 将语言文件 和 i18next 一起放在 一个 npm 包里, window 定义 i18next (由 i18next 官方提供) , 发布包为 cdn 格式
// 默认语言为 zh, 存到 localStorage 里, 更改语言后刷新页面

// 使用

// index.html
// <script id="i18n" src='http://xxx.js' />

// main.js
/*
  document.querySelector(`script id=["i18n"]`).onload = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(<>{window.i18next.t('title')}</>)
  }
*/

// qiankun 子应用 内使用主应用的 window.i18next.t 方法
