import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/una-surveys',
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