import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-babel-plugin'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [babel(), react()],
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
