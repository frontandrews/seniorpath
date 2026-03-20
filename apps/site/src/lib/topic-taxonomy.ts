import type { CollectionEntry } from 'astro:content'
import {
  getTopicAncestorIds,
  getTopicById,
  getTopicChildren,
  getTopicRouteSegment,
  getTopicGroupLabel,
  getTopicGroupSummary,
  getTopicLabel,
  getTopicRootGroupId,
  getTopicSummary,
  TOPIC_GROUP_DEFINITIONS,
  TOPIC_DEFINITIONS,
} from '@seniorpath/content'

import { getSiteLocale, type SiteLocale } from '@/lib/site-copy'
import { getTopicGroupHref, getTopicHref, getTopicIndexHref } from '@/lib/topic-links'
import { sortGuides } from '@/lib/guide-tree'

type GuideEntry = CollectionEntry<'guides'>

export type TopicBreadcrumbItem = {
  href: string | null
  label: string
}

const TOPIC_EDITORIAL_ORDER = [
  'delivery',
  'security',
  'coding-interview',
  'javascript',
  'react',
  'data-storage',
  'accessibility',
  'system-design',
  'performance',
  'architecture-patterns',
  'ai-engineering',
  'debugging-production',
  'leadership',
  'node',
  'tech-english',
] as const

export function getLocalizedTopicLabel(topicId: string, locale: SiteLocale) {
  return getTopicLabel(topicId, locale)
}

export function getLocalizedTopicGroupLabel(groupId: string, locale: SiteLocale) {
  return getTopicGroupLabel(groupId, locale)
}

export function getLocalizedTopicSummary(topicId: string, locale: SiteLocale) {
  return getTopicSummary(topicId, locale)
}

export function getLocalizedTopicGroupSummary(groupId: string, locale: SiteLocale) {
  return getTopicGroupSummary(groupId, locale)
}

export function getGuideTopicIds(post: GuideEntry) {
  return [...new Set(post.data.topicIds.filter((topicId) => Boolean(getTopicById(topicId))))]
}

function getTopicTreeIds(parentId: string): string[] {
  return getTopicChildren(parentId).flatMap((topic) => [topic.id, ...getTopicTreeIds(topic.id)])
}

export function getLocalizedGuideTopics(post: GuideEntry) {
  const locale = getSiteLocale(post.data.locale)

  return getGuideTopicIds(post).map((topicId) => ({
    href: getTopicHref(topicId, locale),
    id: getTopicRouteSegment(topicId, locale),
    label: getLocalizedTopicLabel(topicId, locale),
  }))
}

export function getGuideTopicIdsInGroup(post: GuideEntry, groupId: string) {
  return [
    ...new Set(
      getGuideTopicIds(post).flatMap((topicId) => {
        if (getTopicRootGroupId(topicId) !== groupId) {
          return []
        }

        return [...getTopicAncestorIds(topicId), topicId]
      }),
    ),
  ]
}

export function getLocalizedGuideTopicsInGroup(post: GuideEntry, groupId: string, locale: SiteLocale) {
  return getGuideTopicIdsInGroup(post, groupId).map((topicId) => ({
    href: getTopicHref(topicId, locale),
    id: getTopicRouteSegment(topicId, locale),
    label: getLocalizedTopicLabel(topicId, locale),
  }))
}

export function getTopicBreadcrumb(topicId: string, locale: SiteLocale): TopicBreadcrumbItem[] {
  const groupId = getTopicRootGroupId(topicId)
  const ancestorIds = getTopicAncestorIds(topicId)

  return [
    {
      href: getTopicIndexHref(locale),
      label: locale === 'pt-br' ? 'Topicos' : 'Topics',
    },
    ...(groupId
      ? [
          {
            href: getTopicGroupHref(groupId, locale),
            label: getLocalizedTopicGroupLabel(groupId, locale),
          },
        ]
      : []),
    ...ancestorIds.map((ancestorId) => ({
      href: getTopicHref(ancestorId, locale),
      label: getLocalizedTopicLabel(ancestorId, locale),
    })),
    {
      href: null,
      label: getLocalizedTopicLabel(topicId, locale),
    },
  ]
}

export function getTopicGroupBreadcrumb(groupId: string, locale: SiteLocale): TopicBreadcrumbItem[] {
  return [
    {
      href: getTopicIndexHref(locale),
      label: locale === 'pt-br' ? 'Topicos' : 'Topics',
    },
    {
      href: null,
      label: getLocalizedTopicGroupLabel(groupId, locale),
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

export function getTopicGroupGuides(posts: GuideEntry[], groupId: string, locale: SiteLocale) {
  const topicIds = new Set(getTopicTreeIds(groupId))

  return sortGuides(
    posts.filter(
      (post) =>
        post.data.locale === locale &&
        post.data.status !== 'archived' &&
        getGuideTopicIds(post).some((topicId) => topicIds.has(topicId)),
    ),
  )
}

function hasGuidesInTopicTree(posts: GuideEntry[], parentId: string, locale: SiteLocale): boolean {
  if (TOPIC_DEFINITIONS.some((topic) => topic.id === parentId) && getTopicGuides(posts, parentId, locale).length > 0) {
    return true
  }

  return getTopicChildren(parentId).some((topic) => hasGuidesInTopicTree(posts, topic.id, locale))
}

export function getAvailableTopicGroups(posts: GuideEntry[], locale: SiteLocale) {
  return TOPIC_GROUP_DEFINITIONS.filter((group) => hasGuidesInTopicTree(posts, group.id, locale))
}

export function getAvailableChildTopics(posts: GuideEntry[], parentId: string, locale: SiteLocale) {
  return getTopicChildren(parentId).filter((topic) => hasGuidesInTopicTree(posts, topic.id, locale))
}

export function getAvailableTopicsInGroup(posts: GuideEntry[], groupId: string, locale: SiteLocale) {
  return getTopicTreeIds(groupId)
    .map((topicId) => getTopicById(topicId))
    .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic))
    .filter((topic) => hasGuidesInTopicTree(posts, topic.id, locale))
}

export function getOrderedAvailableTopicFilters(posts: GuideEntry[], locale: SiteLocale) {
  const availableTopicIds = new Set(
    posts
      .filter((post) => post.data.locale === locale && post.data.status !== 'archived')
      .flatMap((post) => getGuideTopicIds(post)),
  )

  const priorityIds = TOPIC_EDITORIAL_ORDER.filter((topicId) => availableTopicIds.has(topicId))
  const remainingIds = TOPIC_DEFINITIONS
    .filter((topic) => availableTopicIds.has(topic.id) && !priorityIds.includes(topic.id as (typeof TOPIC_EDITORIAL_ORDER)[number]))
    .sort((left, right) => getLocalizedTopicLabel(left.id, locale).localeCompare(getLocalizedTopicLabel(right.id, locale)))
    .map((topic) => topic.id)

  return [...priorityIds, ...remainingIds].map((topicId) => ({
    id: getTopicRouteSegment(topicId, locale),
    label: getLocalizedTopicLabel(topicId, locale),
  }))
}
