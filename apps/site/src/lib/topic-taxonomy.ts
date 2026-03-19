import type { CollectionEntry } from 'astro:content'
import { getPathPillarById, getTopicById, getTopicLabel, getTopicSummary, TOPIC_DEFINITIONS } from '@seniorpath/content'

import { getSiteLocale, type SiteLocale } from './site-copy'
import { getTopicHref, getTopicIndexHref } from './topic-links'
import { sortGuides } from './guide-tree'

type GuideEntry = CollectionEntry<'guides'>

export type TopicBreadcrumbItem = {
  href: string | null
  label: string
}

export function getLocalizedTopicLabel(topicId: string, locale: SiteLocale) {
  return getTopicLabel(topicId, locale)
}

export function getLocalizedTopicSummary(topicId: string, locale: SiteLocale) {
  return getTopicSummary(topicId, locale)
}

export function getGuideTopicIds(post: GuideEntry) {
  const topicIds = new Set<string>()

  if (post.data.pillarId) {
    const pillar = getPathPillarById(post.data.pillarId)

    pillar?.legacyTopics.forEach((topicId) => topicIds.add(topicId))
  }

  post.data.tags.forEach((tag) => {
    if (getTopicById(tag)) {
      topicIds.add(tag)
    }
  })

  return [...topicIds]
}

export function getLocalizedGuideTopics(post: GuideEntry) {
  const locale = getSiteLocale(post.data.locale)

  return getGuideTopicIds(post).map((topicId) => ({
    href: getTopicHref(topicId, locale),
    id: topicId,
    label: getLocalizedTopicLabel(topicId, locale),
  }))
}

export function getTopicBreadcrumb(topicId: string, locale: SiteLocale): TopicBreadcrumbItem[] {
  return [
    {
      href: getTopicIndexHref(locale),
      label: locale === 'pt-br' ? 'Topicos' : 'Topics',
    },
    {
      href: null,
      label: getLocalizedTopicLabel(topicId, locale),
    },
  ]
}

export function getTopicGuides(posts: GuideEntry[], topicId: string, locale: SiteLocale) {
  return sortGuides(
    posts.filter(
      (post) =>
        post.data.locale === locale && post.data.status !== 'archived' && getGuideTopicIds(post).includes(topicId),
    ),
  )
}

export function getAvailableTopics(posts: GuideEntry[], locale: SiteLocale) {
  return TOPIC_DEFINITIONS.filter((topic) =>
    posts.some(
      (post) => post.data.locale === locale && post.data.status !== 'archived' && getGuideTopicIds(post).includes(topic.id),
    ),
  )
}
