import { getRobotsTxtContent } from '@/lib/site-config'

export function GET() {
  return new Response(getRobotsTxtContent(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
