import {
  articleCompletionSummaryDomHooks,
  queryByHook,
  readDataHookValue,
} from '@/lib/dom-hooks'
import {
  resolveArticleRecommendations,
  type ArticleRecommendationCandidate,
} from '@/lib/article-recommendations'

function readRecommendationCandidates(root: Element): ArticleRecommendationCandidate[] {
  const serializedCandidates = readDataHookValue(articleCompletionSummaryDomHooks.recommendationCandidates, root)

  if (!serializedCandidates) {
    return []
  }

  try {
    const parsed = JSON.parse(serializedCandidates)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.flatMap((candidate) => {
      if (
        !candidate ||
        typeof candidate !== 'object' ||
        typeof candidate.articleId !== 'string' ||
        typeof candidate.href !== 'string' ||
        typeof candidate.title !== 'string'
      ) {
        return []
      }

      return [{
        articleId: candidate.articleId,
        href: candidate.href,
        relationshipOrder:
          typeof candidate.relationshipOrder === 'number' ? candidate.relationshipOrder : null,
        title: candidate.title,
        topicOverlap:
          typeof candidate.topicOverlap === 'number' ? candidate.topicOverlap : 0,
        trackOrder:
          typeof candidate.trackOrder === 'number' ? candidate.trackOrder : null,
      } satisfies ArticleRecommendationCandidate]
    })
  } catch {
    return []
  }
}

function toggleSection(element: HTMLElement | null, isVisible: boolean) {
  if (!(element instanceof HTMLElement)) {
    return
  }

  element.hidden = !isVisible
}

function resolveSummaryRoot(scope: ParentNode) {
  if (scope instanceof Element && scope.matches(articleCompletionSummaryDomHooks.root.selector)) {
    return scope as HTMLElement
  }

  return queryByHook<HTMLElement>(scope, articleCompletionSummaryDomHooks.root)
}

export function syncArticleCompletionSummaryRecommendations(
  scope: ParentNode,
  completedSet: Set<string>,
) {
  const root = resolveSummaryRoot(scope)

  if (!(root instanceof HTMLElement)) {
    return
  }

  const candidates = readRecommendationCandidates(root)

  if (candidates.length === 0) {
    return
  }

  const { nextStep, relatedItems } = resolveArticleRecommendations(candidates, completedSet)
  const nextStepSection = queryByHook<HTMLElement>(root, articleCompletionSummaryDomHooks.nextStepSection)
  const nextStepLink = queryByHook<HTMLAnchorElement>(root, articleCompletionSummaryDomHooks.nextStepLink)
  const nextStepTitle = queryByHook<HTMLElement>(root, articleCompletionSummaryDomHooks.nextStepTitle)
  const relatedSection = queryByHook<HTMLElement>(root, articleCompletionSummaryDomHooks.relatedSection)
  const relatedList = queryByHook<HTMLElement>(root, articleCompletionSummaryDomHooks.relatedList)
  const relatedItemClass = readDataHookValue(articleCompletionSummaryDomHooks.relatedItemClass, root)

  toggleSection(nextStepSection, nextStep !== null)

  if (nextStep && nextStepLink instanceof HTMLAnchorElement && nextStepTitle instanceof HTMLElement) {
    nextStepLink.setAttribute('href', nextStep.href)
    nextStepTitle.textContent = nextStep.title
  }

  toggleSection(relatedSection, relatedItems.length > 0)

  if (!(relatedList instanceof HTMLElement)) {
    return
  }

  relatedList.replaceChildren(
    ...relatedItems.map((item) => {
      const link = document.createElement('a')

      if (relatedItemClass) {
        link.className = relatedItemClass
      }

      link.setAttribute('href', item.href)
      link.setAttribute(articleCompletionSummaryDomHooks.relatedItem.attr, '')
      link.textContent = item.title
      return link
    }),
  )
}
