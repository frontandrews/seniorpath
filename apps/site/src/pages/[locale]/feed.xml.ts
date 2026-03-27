import rss from '@astrojs/rss'

import { getArticleFeedItems } from '@/lib/rss'
import { getSectionDisabledResponse } from '@/lib/section-gate'
import { getFeedMetadata, getFeedResponseHeaders, siteConfig } from '@/lib/site-config'
import { getLocaleHtmlLang, getNonDefaultLocales } from '@/lib/locale-config'

export async function getStaticPaths() {
  return getNonDefaultLocales().map((locale) => ({
    params: { locale },
    props: { locale },
  }))
}

export async function GET(context: { props: { locale: string }; site?: URL }) {
  const disabledResponse = getSectionDisabledResponse('articles')

  if (disabledResponse) {
    return disabledResponse
  }

  const locale = context.props.locale
  const metadata = getFeedMetadata(locale)
  const items = await getArticleFeedItems(locale)

  const response = await rss({
    customData: `<language>${getLocaleHtmlLang(locale).toLowerCase()}</language>`,
    description: metadata.description,
    items,
    site: context.site ?? siteConfig.site.siteUrl,
    title: metadata.title,
  })

  for (const [headerName, headerValue] of Object.entries(getFeedResponseHeaders())) {
    response.headers.set(headerName, headerValue)
  }

  return response
}
