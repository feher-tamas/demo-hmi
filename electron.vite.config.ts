import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          'main-window': resolve(__dirname, 'src/preload/main-window.ts'),
          'tab-window': resolve(__dirname, 'src/preload/tab-window.ts')
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          'main-window': resolve(__dirname, 'src/renderer/main-window.html'),
          'tab-window': resolve(__dirname, 'src/renderer/tab-window.html')
        }
      }
    }
  }
})
