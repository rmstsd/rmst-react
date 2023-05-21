import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      exclude: '**/*.tsx'
    })
  ],
  server: {
    port: 10000
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
