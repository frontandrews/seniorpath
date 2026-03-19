import { getTopicRouteSegment } from '@seniorpath/content'

export function getTopicIndexHref(locale = 'en') {
  return locale === 'pt-br' ? '/pt-br/topicos' : '/topics'
}

export function getTopicHref(topicId: string, locale = 'en') {
  const topicSegment = getTopicRouteSegment(topicId)
  const baseHref = getTopicIndexHref(locale)

  return `${baseHref}/${topicSegment}`
}
