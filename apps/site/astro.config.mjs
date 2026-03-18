import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [icon(), sitemap()],
  output: 'static',
  site: 'https://seniorpath.pro',
})
