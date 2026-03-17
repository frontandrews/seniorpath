import { getGuideSlug } from '@prepdeck/content'
import type { Deck } from '@prepdeck/schemas'

const BLOG_PATH = '/blog'

function getBlogBase(siteBaseUrl?: string): string {
  const normalizedBase = siteBaseUrl?.trim().replace(/\/+$/, '') ?? ''

  if (!normalizedBase) {
    return BLOG_PATH
  }

  return normalizedBase.endsWith(BLOG_PATH) ? normalizedBase : `${normalizedBase}${BLOG_PATH}`
}

export function resolveArticleHref(slug: string, siteBaseUrl?: string): string {
  return `${getBlogBase(siteBaseUrl)}/${slug}`
}

export function getArticleHref(guideId: string): string | null {
  const slug = getGuideSlug(guideId)

  if (!slug) {
    return null
  }

  return resolveArticleHref(slug, import.meta.env.VITE_PUBLIC_SITE_URL)
}

export type DeckArticleLink = {
  guideId: string
  question: string
  slug: string
}

export function getDeckArticleLinks(deck: Deck): DeckArticleLink[] {
  const seenGuideIds = new Set<string>()

  return deck.cards.flatMap((card) => {
    if (!card.learnMoreGuideId || seenGuideIds.has(card.learnMoreGuideId)) {
      return []
    }

    const slug = getGuideSlug(card.learnMoreGuideId)

    if (!slug) {
      return []
    }

    seenGuideIds.add(card.learnMoreGuideId)

    return [
      {
        guideId: card.learnMoreGuideId,
        question: card.question,
        slug,
      },
    ]
  })
}
