import rss from '@astrojs/rss'

import { getFeedMetadata, getGuideFeedItems } from '@/lib/rss'

export async function GET(context: { site?: URL }) {
  const metadata = getFeedMetadata('pt-br')
  const items = await getGuideFeedItems('pt-br')

  return rss({
    customData: '<language>pt-br</language>',
    description: metadata.description,
    items,
    site: context.site ?? 'https://seniorpath.pro',
    title: metadata.title,
  })
}
