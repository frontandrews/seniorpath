import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Prepdeck',
        short_name: 'Prepdeck',
        description: 'Mobile-first technical interview flashcards.',
        theme_color: '#101425',
        background_color: '#101425',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@prepdeck/content/decks': fileURLToPath(
        new URL('../../packages/content/src/decks.ts', import.meta.url),
      ),
      '@prepdeck/content/manifest': fileURLToPath(
        new URL('../../packages/content/src/manifest.ts', import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@prepdeck/content': fileURLToPath(
        new URL('../../packages/content/src/index.ts', import.meta.url),
      ),
      '@prepdeck/schemas': fileURLToPath(
        new URL('../../packages/schemas/src/index.ts', import.meta.url),
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-router')) {
            return 'router'
          }

          if (
            id.includes('/node_modules/react') ||
            id.includes('/node_modules/react-dom') ||
            id.includes('/node_modules/scheduler')
          ) {
            return 'react-vendor'
          }

          if (
            id.includes('/node_modules/motion') ||
            id.includes('/node_modules/framer-motion') ||
            id.includes('/node_modules/motion-dom') ||
            id.includes('/node_modules/motion-utils')
          ) {
            return 'motion'
          }

          if (id.includes('/packages/content/src/data/decks/')) {
            return 'deck-content'
          }

          if (id.includes('/node_modules/zod')) {
            return 'zod'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
