import { getGuideRoutePath } from '@seniorpath/content'
import type { Deck } from '@seniorpath/schemas'

const LEGACY_GUIDE_SEGMENTS = ['/guides', '/guias', '/learn', '/aprender']
const GUIDE_INDEX_SUFFIXES = ['/learn', '/pt-br/aprender', '/en/guides', '/pt-br/guias', ...LEGACY_GUIDE_SEGMENTS]

function getSiteBase(siteBaseUrl?: string): string {
  const normalizedBase = siteBaseUrl?.trim().replace(/\/+$/, '') ?? ''

  if (!normalizedBase) {
    return ''
  }

  const guideSegment = GUIDE_INDEX_SUFFIXES.find((segment) => normalizedBase.endsWith(segment))

  return guideSegment
    ? normalizedBase.slice(0, normalizedBase.length - guideSegment.length)
    : normalizedBase
}

export function resolveArticleHref(routePath: string, siteBaseUrl?: string): string {
  const normalizedRoutePath = routePath.replace(/^\/+/, '')
  const siteBase = getSiteBase(siteBaseUrl)

  return siteBase ? `${siteBase}/${normalizedRoutePath}` : `/${normalizedRoutePath}`
}

export function getArticleHref(guideId: string): string | null {
  const routePath = getGuideRoutePath(guideId)

  if (!routePath) {
    return null
  }

  return resolveArticleHref(routePath, import.meta.env.VITE_PUBLIC_SITE_URL)
}

export function getGuideIndexHref(locale = 'en', siteBaseUrl?: string): string {
  const normalizedLocale = locale === 'pt-br' ? 'pt-br' : 'en'
  const section = normalizedLocale === 'pt-br' ? 'aprender' : 'learn'
  const siteBase = getSiteBase(siteBaseUrl ?? import.meta.env.VITE_PUBLIC_SITE_URL)

  if (normalizedLocale === 'en') {
    return siteBase ? `${siteBase}/${section}` : `/${section}`
  }

  return siteBase ? `${siteBase}/${normalizedLocale}/${section}` : `/${normalizedLocale}/${section}`
}

export type DeckArticleLink = {
  guideId: string
  question: string
  routePath: string
}

export function getDeckArticleLinks(deck: Deck): DeckArticleLink[] {
  const seenGuideIds = new Set<string>()

  return deck.cards.flatMap((card) => {
    if (!card.learnMoreGuideId || seenGuideIds.has(card.learnMoreGuideId)) {
      return []
    }

    const routePath = getGuideRoutePath(card.learnMoreGuideId)

    if (!routePath) {
      return []
    }

    seenGuideIds.add(card.learnMoreGuideId)

    return [
      {
        guideId: card.learnMoreGuideId,
        question: card.question,
        routePath,
      },
    ]
  })
}
