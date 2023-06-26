import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSSL from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSSL(),
    nodePolyfills()
  ],
})
