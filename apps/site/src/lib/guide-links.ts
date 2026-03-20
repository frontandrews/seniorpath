import {
  getGuideBranchRoutePath,
  getGuideLegacyRoutePathFromEntryId,
  getGuidePillarRoutePath,
  getGuideRoutePath,
  getGuideRoutePathFromEntryId,
  getGuideSectionSegment,
  SUPPORTED_GUIDE_LOCALES,
} from '@seniorpath/content'

const SUPPORTED_GUIDE_LOCALE_SET = new Set<string>(SUPPORTED_GUIDE_LOCALES)

function getFlatArticleRoutePathFromEntryId(entryId: string) {
  const parts = entryId.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const [locale = 'en', pillarOrKind, slug] = parts
  const normalizedLocale = locale === 'pt-br' ? 'pt-br' : 'en'

  if (!slug || (pillarOrKind !== 'article' && pillarOrKind !== 'artigo')) {
    return null
  }

  const section = getGuideSectionSegment(normalizedLocale)

  return normalizedLocale === 'en' ? `${section}/${slug}` : `${normalizedLocale}/${section}/${slug}`
}

export function getGuideHrefFromEntryId(entryId: string) {
  return `/${getFlatArticleRoutePathFromEntryId(entryId) ?? getGuideRoutePathFromEntryId(entryId)}`
}

type GuideEntryLike = {
  id: string
  data: {
    guideId: string
    locale?: string | null
  }
}

export function getGuideLegacyHrefFromEntryId(entryId: string) {
  return `/${getGuideLegacyRoutePathFromEntryId(entryId)}`
}

export function getGuideHref(guideId: string, locale = 'en') {
  const routePath = getGuideRoutePath(guideId, locale)

  return routePath ? `/${routePath}` : null
}

export function getGuideHrefFromEntry(entry: GuideEntryLike) {
  return getGuideHref(entry.data.guideId, entry.data.locale ?? 'en') ?? getGuideHrefFromEntryId(entry.id)
}

export function getGuidePillarHref(pillarId: string, locale = 'en') {
  const routePath = getGuidePillarRoutePath(pillarId, locale)

  return routePath ? `/${routePath}` : null
}

export function getGuideBranchHref(pillarId: string, branchId: string, locale = 'en') {
  const routePath = getGuideBranchRoutePath(pillarId, branchId, locale)

  return routePath ? `/${routePath}` : null
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
