import { renderLlmsTxt } from '@/lib/discoverability'
import { siteConfig } from '@/lib/site-config'

export function GET(context: { site?: URL }) {
  return new Response(renderLlmsTxt(context.site ?? siteConfig.site.siteUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
