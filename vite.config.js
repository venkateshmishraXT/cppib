import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'chart/index.html'),
        nested: resolve(__dirname, 'src/components/chart/index.html'),
      },
    },
  },
})
