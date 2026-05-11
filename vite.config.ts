import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/azure': {
        target: 'https://app-uoaihack6zs3w.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/azure/, ''),
      },
    },
  },
})
