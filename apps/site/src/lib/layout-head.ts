import {
  getDefaultLocale,
  getLocaleFeedHref,
  getLocaleLabel,
  getLocalePath,
  getLocaleShortLabel,
  getSupportedLocaleDefinitions,
} from '@/lib/locale-config'
import { createWebsiteSchema, normalizeStructuredData } from '@/lib/seo'
import type { SiteLocale } from '@/lib/site-copy'

type StructuredData = Record<string, unknown>

type ResolveLayoutHeadContextInput = {
  alternateLocaleHrefs?: Record<string, string | null>
  canonicalUrl: string
  currentLocale: SiteLocale
  description: string
  homeHref: string
  localeHrefs?: Record<string, string | null>
  pathname: string
  siteUrl: string | URL
  structuredData?: StructuredData | StructuredData[]
}

export type LayoutAlternateLink = {
  absoluteHref: string
  code: string
  htmlLang: string
}

export type LayoutLocaleLink = {
  code: string
  href: string
  htmlLang: string
  isActive: boolean
  label: string
  shortLabel: string
}

function resolveAbsoluteHref(href: string, siteUrl: URL) {
  return new URL(href, siteUrl).toString()
}

export function resolveLayoutHeadContext({
  alternateLocaleHrefs = {},
  canonicalUrl,
  currentLocale,
  description,
  homeHref,
  localeHrefs = {},
  pathname,
  siteUrl,
  structuredData,
}: ResolveLayoutHeadContextInput) {
  const resolvedSiteUrl = siteUrl instanceof URL ? siteUrl : new URL(siteUrl)
  const hasExplicitLocaleAvailability = Object.keys(alternateLocaleHrefs).length > 0
  const seoAlternateSource =
    hasExplicitLocaleAvailability ? alternateLocaleHrefs : localeHrefs

  const seoAlternateLinks = getSupportedLocaleDefinitions().flatMap((locale) => {
    const href = seoAlternateSource[locale.code]

    if (!href) {
      return []
    }

    return [{
      absoluteHref: resolveAbsoluteHref(href, resolvedSiteUrl),
      code: locale.code,
      htmlLang: locale.htmlLang,
    }]
  })

  const defaultLocale = getDefaultLocale()
  const defaultAlternateHref = seoAlternateSource[defaultLocale]
    ? resolveAbsoluteHref(seoAlternateSource[defaultLocale]!, resolvedSiteUrl)
    : null

  const localeSwitchLinks = getSupportedLocaleDefinitions().flatMap((locale) => {
    const explicitAlternateHref = alternateLocaleHrefs[locale.code] ?? null
    const isActive = locale.code === currentLocale

    if (hasExplicitLocaleAvailability && !isActive && !explicitAlternateHref) {
      return []
    }

    return [{
      code: locale.code,
      href: explicitAlternateHref ?? localeHrefs[locale.code] ?? getLocalePath(locale.code),
      htmlLang: locale.htmlLang,
      isActive,
      label: getLocaleLabel(locale.code),
      shortLabel: getLocaleShortLabel(locale.code),
    }]
  })

  const structuredDataItems = [
    ...normalizeStructuredData(structuredData),
    ...(pathname === homeHref
      ? [
          createWebsiteSchema({
            description,
            locale: currentLocale,
            url: canonicalUrl,
          }),
        ]
      : []),
  ]

  return {
    defaultAlternateHref,
    localeSwitchLinks,
    rssHref: getLocaleFeedHref(currentLocale),
    seoAlternateLinks,
    structuredDataItems,
  }
}
