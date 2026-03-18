import { getGuideRoutePathFromEntryId, getGuideSectionSegment, SUPPORTED_GUIDE_LOCALES } from '@seniorpath/content'

const SUPPORTED_GUIDE_LOCALE_SET = new Set<string>(SUPPORTED_GUIDE_LOCALES)

export function getGuideHrefFromEntryId(entryId: string) {
  return `/${getGuideRoutePathFromEntryId(entryId)}`
}

export function getGuideIndexHref(locale = 'en') {
  const normalizedLocale = locale === 'pt-br' ? 'pt-br' : 'en'
  const section = getGuideSectionSegment(normalizedLocale)

  return normalizedLocale === 'en' ? `/${section}` : `/${normalizedLocale}/${section}`
}

export function getGuideLocaleFromPathname(pathname: string) {
  const [, maybeLocale] = pathname.split('/')
  return maybeLocale && SUPPORTED_GUIDE_LOCALE_SET.has(maybeLocale) ? maybeLocale : 'en'
}
