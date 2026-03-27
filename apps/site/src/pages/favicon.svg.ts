import { getSiteIconSvg } from '@/lib/site-icon'

export function GET() {
  return new Response(getSiteIconSvg('Site icon'), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
