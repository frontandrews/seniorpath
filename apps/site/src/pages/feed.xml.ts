import rss from '@astrojs/rss'

import { getFeedMetadata, getGuideFeedItems } from '@/lib/rss'

export async function GET(context: { site?: URL }) {
  const metadata = getFeedMetadata('en')
  const items = await getGuideFeedItems('en')

  return rss({
    customData: '<language>en-us</language>',
    description: metadata.description,
    items,
    site: context.site ?? 'https://seniorpath.pro',
    title: metadata.title,
  })
}
