import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
// type-only import, adds `ssgOptions` to vite's UserConfig
import type {} from 'vite-react-ssg'

// custom domain, served from the root. Under a project path this would be '/<repo>/'
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
