import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'

export default defineConfig({
  plugins: [pluginNodePolyfill(), pluginLess(), pluginReact()],
  dev: {
    assetPrefix: './',
    hmr: false
  },
  html: {
    template: './index.html'
  },
  output: {
    assetPrefix: './',
    copy: [{ from: './public', to: '' }]
  }
})
