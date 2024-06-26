import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
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
