export type ArticleRecommendationCandidate = {
  articleId: string
  href: string
  relationshipOrder?: number | null
  title: string
  topicOverlap?: number
  trackOrder?: number | null
}

export type ArticleRecommendationLink = Pick<ArticleRecommendationCandidate, 'articleId' | 'href' | 'title'>

type RecommendationResolution = {
  nextStep: ArticleRecommendationLink | null
  relatedItems: ArticleRecommendationLink[]
}

function normalizeNullableOrder(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null
}

function normalizeTopicOverlap(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0
}

function mergeCandidate(
  current: ArticleRecommendationCandidate | undefined,
  candidate: ArticleRecommendationCandidate,
): ArticleRecommendationCandidate {
  if (!current) {
    return {
      articleId: candidate.articleId,
      href: candidate.href,
      relationshipOrder: normalizeNullableOrder(candidate.relationshipOrder),
      title: candidate.title,
      topicOverlap: normalizeTopicOverlap(candidate.topicOverlap),
      trackOrder: normalizeNullableOrder(candidate.trackOrder),
    }
  }

  const currentRelationshipOrder = normalizeNullableOrder(current.relationshipOrder)
  const nextRelationshipOrder = normalizeNullableOrder(candidate.relationshipOrder)
  const currentTrackOrder = normalizeNullableOrder(current.trackOrder)
  const nextTrackOrder = normalizeNullableOrder(candidate.trackOrder)

  return {
    articleId: current.articleId,
    href: current.href || candidate.href,
    relationshipOrder:
      currentRelationshipOrder == null
        ? nextRelationshipOrder
        : nextRelationshipOrder == null
          ? currentRelationshipOrder
          : Math.min(currentRelationshipOrder, nextRelationshipOrder),
    title: current.title || candidate.title,
    topicOverlap: Math.max(
      normalizeTopicOverlap(current.topicOverlap),
      normalizeTopicOverlap(candidate.topicOverlap),
    ),
    trackOrder:
      currentTrackOrder == null
        ? nextTrackOrder
        : nextTrackOrder == null
          ? currentTrackOrder
          : Math.min(currentTrackOrder, nextTrackOrder),
  }
}

function toRecommendationLink(candidate: ArticleRecommendationCandidate | null): ArticleRecommendationLink | null {
  if (!candidate) {
    return null
  }

  return {
    articleId: candidate.articleId,
    href: candidate.href,
    title: candidate.title,
  }
}

function compareNullableOrder(a: number | null, b: number | null) {
  if (a == null && b == null) {
    return 0
  }

  if (a == null) {
    return 1
  }

  if (b == null) {
    return -1
  }

  return a - b
}

export function resolveArticleRecommendations(
  candidates: ArticleRecommendationCandidate[],
  completedIds: Iterable<string>,
  options: { relatedLimit?: number } = {},
): RecommendationResolution {
  const relatedLimit = typeof options.relatedLimit === 'number' && options.relatedLimit >= 0
    ? options.relatedLimit
    : 3
  const completedSet = completedIds instanceof Set ? completedIds : new Set(completedIds)
  const mergedCandidates = candidates.reduce<Map<string, ArticleRecommendationCandidate>>((map, candidate) => {
    if (!candidate.articleId || !candidate.href || !candidate.title) {
      return map
    }

    map.set(candidate.articleId, mergeCandidate(map.get(candidate.articleId), candidate))
    return map
  }, new Map())

  const orderedCandidates = [...mergedCandidates.values()].sort((left, right) => {
    const leftCompleted = completedSet.has(left.articleId)
    const rightCompleted = completedSet.has(right.articleId)

    if (leftCompleted !== rightCompleted) {
      return leftCompleted ? 1 : -1
    }

    const trackComparison = compareNullableOrder(
      normalizeNullableOrder(left.trackOrder),
      normalizeNullableOrder(right.trackOrder),
    )

    if (trackComparison !== 0) {
      return trackComparison
    }

    const relationshipComparison = compareNullableOrder(
      normalizeNullableOrder(left.relationshipOrder),
      normalizeNullableOrder(right.relationshipOrder),
    )

    if (relationshipComparison !== 0) {
      return relationshipComparison
    }

    const topicOverlapComparison = normalizeTopicOverlap(right.topicOverlap) - normalizeTopicOverlap(left.topicOverlap)

    if (topicOverlapComparison !== 0) {
      return topicOverlapComparison
    }

    return left.title.localeCompare(right.title)
  })

  const nextStepCandidate = orderedCandidates.find((candidate) => !completedSet.has(candidate.articleId))
    ?? orderedCandidates[0]
    ?? null

  return {
    nextStep: toRecommendationLink(nextStepCandidate),
    relatedItems: orderedCandidates
      .filter((candidate) => candidate.articleId !== nextStepCandidate?.articleId)
      .slice(0, relatedLimit)
      .map((candidate) => ({
        articleId: candidate.articleId,
        href: candidate.href,
        title: candidate.title,
      })),
  }
}
