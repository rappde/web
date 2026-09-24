import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
// Loads the `ssgOptions` augmentation on vite's UserConfig (type-only).
import type {} from 'vite-react-ssg'

// Custom domain (rappde.com) is served from the site root, so base = '/'.
// If this is ever deployed under a project path instead, set base to '/<repo>/'.
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
  // Consumed by vite-react-ssg at build time.
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
