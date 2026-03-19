import { fileURLToPath } from 'node:url'

import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [sitemap(), svelte()],
  output: 'static',
  site: 'https://seniorpath.pro',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
  },
})
