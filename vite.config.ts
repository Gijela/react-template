import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.scss";`
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    rollupOptions: {
      external: /\.scss$/,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') 
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/4a611b718a8bd439b64640cdad77123f/test', // 配置接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
