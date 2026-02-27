import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE || '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        buy: resolve(__dirname, 'buy/index.html'),
        sell: resolve(__dirname, 'sell/index.html'),
      },
    },
  },
})
