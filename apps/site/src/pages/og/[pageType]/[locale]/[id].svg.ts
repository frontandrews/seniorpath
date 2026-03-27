import type { CollectionEntry } from 'astro:content'

import { getArticleCategoryLabel, getArticleLevelLabel, getArticleReadingTimeMinutes } from '@/lib/article-meta'
import { getChallengeLevelLabel } from '@/lib/challenge-meta'
import {
  getLocalizedConceptDomainLabel,
  getLocalizedConceptGroupLabel,
} from '@/lib/concept-taxonomy'
import { createOgImageResponse, type OgImagePageType } from '@/lib/og-image'
import { getSupportedLocales, type SiteLocale } from '@/lib/locale-config'
import { resolveEditorialRoadmaps, type EditorialLocale } from '@/lib/roadmaps'
import { getPageTypeLabel } from '@/lib/section-manifest'
import { getSiteCopy } from '@/lib/site-copy'
import {
  getArticleCollection,
  getChallengeCollection,
  getConceptCollection,
  getGlossaryCollection,
} from '@/lib/site-content'

type ArticleEntry = CollectionEntry<'articles'>
type ChallengeEntry = CollectionEntry<'challenges'>
type ConceptEntry = CollectionEntry<'concepts'>
type GlossaryEntry = CollectionEntry<'glossary'>

type OgImageProps = {
  description: string
  eyebrow: string
  locale: SiteLocale
  metaLine: string
  title: string
}

function joinMeta(parts: Array<string | null | undefined>) {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join(' | ')
}

function getTrackMetaLine(locale: SiteLocale, level: string, stepCount: number, minutes: number) {
  const copy = getSiteCopy(locale)
  const stepLabel = stepCount === 1 ? copy.startHere.stepLabel : copy.startHere.stepsLabel

  return joinMeta([
    copy.articleMeta.levelLabels[level as keyof typeof copy.articleMeta.levelLabels],
    `${stepCount} ${stepLabel}`,
    `~${minutes} min`,
  ])
}

function createArticleOgPath(entry: ArticleEntry) {
  return {
    params: {
      id: entry.data.articleId,
      locale: entry.data.locale,
      pageType: 'articles',
    },
    props: {
      description: entry.data.description,
      eyebrow: getPageTypeLabel('articles', entry.data.locale),
      locale: entry.data.locale,
      metaLine: joinMeta([
        getArticleCategoryLabel(entry),
        getArticleLevelLabel(entry.data.level, entry.data.locale),
        `${getArticleReadingTimeMinutes(entry)} min`,
      ]),
      title: entry.data.title,
    },
  }
}

function createTrackOgPaths(locale: SiteLocale, articles: ArticleEntry[]) {
  return resolveEditorialRoadmaps(locale as EditorialLocale, articles).map((roadmap) => ({
    params: {
      id: roadmap.id,
      locale,
      pageType: 'tracks',
    },
    props: {
      description: roadmap.summary,
      eyebrow: getPageTypeLabel('tracks', locale),
      locale,
      metaLine: getTrackMetaLine(
        locale,
        roadmap.level,
        roadmap.stepCount,
        roadmap.estimatedReadingMinutes,
      ),
      title: roadmap.title,
    },
  }))
}

function createConceptOgPath(entry: ConceptEntry) {
  return {
    params: {
      id: entry.data.conceptId,
      locale: entry.data.locale,
      pageType: 'concepts',
    },
    props: {
      description: entry.data.description,
      eyebrow: getPageTypeLabel('concepts', entry.data.locale),
      locale: entry.data.locale,
      metaLine: joinMeta([
        getLocalizedConceptDomainLabel(entry.data.domainId, entry.data.locale),
        getLocalizedConceptGroupLabel(entry.data.domainId, entry.data.groupId, entry.data.locale),
      ]),
      title: entry.data.title,
    },
  }
}

function createGlossaryOgPath(entry: GlossaryEntry) {
  return {
    params: {
      id: entry.data.termId,
      locale: entry.data.locale,
      pageType: 'glossary',
    },
    props: {
      description: entry.data.description,
      eyebrow: getPageTypeLabel('glossary', entry.data.locale),
      locale: entry.data.locale,
      metaLine:
        joinMeta(entry.data.tags.slice(0, 3))
        || entry.data.aliases.slice(0, 2).join(' | ')
        || entry.data.termId,
      title: entry.data.title,
    },
  }
}

function createChallengeOgPath(entry: ChallengeEntry) {
  return {
    params: {
      id: entry.data.challengeId,
      locale: entry.data.locale,
      pageType: 'challenges',
    },
    props: {
      description: entry.data.description,
      eyebrow: getPageTypeLabel('challenges', entry.data.locale),
      locale: entry.data.locale,
      metaLine: joinMeta([
        entry.data.typeLabel,
        getChallengeLevelLabel(entry.data.level, entry.data.locale),
        `${entry.data.estimatedMinutes} min`,
      ]),
      title: entry.data.title,
    },
  }
}

export async function getStaticPaths() {
  const articles = (await getArticleCollection()).filter((entry) => entry.data.status === 'active')
  const concepts = (await getConceptCollection()).filter((entry) => entry.data.status === 'active')
  const glossaryTerms = (await getGlossaryCollection()).filter((entry) => entry.data.status === 'active')
  const challenges = (await getChallengeCollection()).filter((entry) => entry.data.status === 'active')

  return [
    ...articles.map((entry) => createArticleOgPath(entry)),
    ...getSupportedLocales().flatMap((locale) => createTrackOgPaths(locale, articles)),
    ...concepts.map((entry) => createConceptOgPath(entry)),
    ...glossaryTerms.map((entry) => createGlossaryOgPath(entry)),
    ...challenges.map((entry) => createChallengeOgPath(entry)),
  ]
}

export function GET(context: { props: OgImageProps; params: { pageType: OgImagePageType } }) {
  return createOgImageResponse(context.props)
}
