import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6001,
    host: '10.1.2.62',
  },
  plugins: [vue()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
