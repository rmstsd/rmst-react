import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  dev: {
    hmr: false
  },
  html: {
    template: './index.html'
  },
  output: {
    copy: [{ from: './public', to: '' }]
  }
})
