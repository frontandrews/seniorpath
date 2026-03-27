import { getDefaultLocale, getLocaleHtmlLang, getLocalePath } from '@/lib/locale-config'
import { siteAppearance, siteConfig } from '@/lib/site-config'
import { getEnabledSections, getSectionHref, getSectionLabel } from '@/lib/section-manifest'

export function GET() {
  const defaultLocale = getDefaultLocale()
  const shortcuts = getEnabledSections()
    .map((section) => ({
      name: getSectionLabel(section.id, defaultLocale),
      url: getSectionHref(section.id, defaultLocale),
    }))
    .filter(
      (
        shortcut,
      ): shortcut is {
        name: string
        url: string
      } => Boolean(shortcut.url),
    )
    .slice(0, 4)

  const manifest = {
    background_color: siteAppearance.backgroundColor,
    categories: ['developer tools', 'education', 'productivity'],
    description: siteConfig.site.description,
    dir: 'ltr',
    display: 'standalone',
    icons: [
      {
        purpose: 'any maskable',
        sizes: 'any',
        src: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    id: getLocalePath(defaultLocale),
    lang: getLocaleHtmlLang(defaultLocale),
    name: siteConfig.site.name,
    scope: '/',
    short_name: siteConfig.site.name,
    shortcuts,
    start_url: getLocalePath(defaultLocale),
    theme_color: siteAppearance.themeColor,
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
