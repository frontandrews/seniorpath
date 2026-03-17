export type GuideRegistryEntry = {
  guideId: string
  locale: string
  slug: string
}

const GUIDE_REGISTRY: GuideRegistryEntry[] = [
  {
    guideId: 'javascript-event-loop',
    locale: 'en',
    slug: 'javascript-event-loop-without-hand-waving',
  },
  {
    guideId: 'node-single-thread',
    locale: 'en',
    slug: 'node-single-threaded-does-not-mean-what-people-think',
  },
  {
    guideId: 'rag-vs-fine-tuning',
    locale: 'en',
    slug: 'rag-vs-fine-tuning-without-false-binaries',
  },
  {
    guideId: 'react-derived-state',
    locale: 'en',
    slug: 'react-derived-state-without-extra-bugs',
  },
  {
    guideId: 'scope-risk-and-quality',
    locale: 'en',
    slug: 'scope-risk-and-quality-without-fake-certainty',
  },
  {
    guideId: 'status-updates',
    locale: 'en',
    slug: 'status-updates-that-sound-clear-in-tech-teams',
  },
]

export function getGuideRegistry() {
  return GUIDE_REGISTRY
}

export function getGuideEntry(guideId: string, locale = 'en') {
  return (
    GUIDE_REGISTRY.find((entry) => entry.guideId === guideId && entry.locale === locale) ??
    GUIDE_REGISTRY.find((entry) => entry.guideId === guideId)
  )
}

export function getGuideSlug(guideId: string, locale = 'en') {
  return getGuideEntry(guideId, locale)?.slug
}
