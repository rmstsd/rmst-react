import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'

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
    copy: [{ from: './public', to: '' }],
    cssModules: {
      localIdentName: '[local]-[hash:base64:4]'
    }
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.(frag|vert)$/,
            type: 'asset/source'
          }
        ]
      }
    }
  }
})
