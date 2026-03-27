import { createOgImageResponse } from '@/lib/og-image'
import { getDefaultLocale } from '@/lib/locale-config'
import { siteConfig } from '@/lib/site-config'

export function GET() {
  return createOgImageResponse({
    description: siteConfig.site.description,
    eyebrow: 'Knowledge site',
    locale: getDefaultLocale(),
    metaLine: 'Articles | Tracks | Concepts | Glossary | Challenges',
    title: siteConfig.site.name,
  })
}
