import { getTopicGroupRouteSegment, getTopicRouteSegment } from '@seniorpath/content'

export function getTopicIndexHref(locale = 'en') {
  return locale === 'pt-br' ? '/pt-br/topicos' : '/topics'
}

export function getTopicGroupHref(groupId: string, locale = 'en') {
  const baseHref = getTopicIndexHref(locale)

  return `${baseHref}/${getTopicGroupRouteSegment(groupId, locale)}`
}

export function getTopicHref(topicId: string, locale = 'en') {
  const params = new URLSearchParams({
    topic: getTopicRouteSegment(topicId, locale),
  })

  return `${getTopicIndexHref(locale)}?${params.toString()}`
}
