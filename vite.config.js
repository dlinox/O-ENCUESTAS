import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig(({ mode }) => ({
  
  base: mode === 'production' ||  mode === 'test' ? '/fichaintegral' : '/',
  // server: {
  //   port: 6001,
  //   host: '10.1.2.70',
  // },

  plugins: [vue()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}))