import type { CollectionEntry } from 'astro:content'
import { getTopicRootGroupId } from '@seniorpath/content'

import { getSiteLocale, type SiteLocale } from '@/lib/site-copy'

type GuideEntry = CollectionEntry<'guides'>
type GuideLevel = GuideEntry['data']['level']

const WORDS_PER_MINUTE = 220

const LEVEL_LABELS: Record<SiteLocale, Record<GuideLevel, string>> = {
  en: {
    advanced: 'Advanced',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
  },
  'pt-br': {
    advanced: 'Avancado',
    beginner: 'Iniciante',
    intermediate: 'Intermediario',
  },
}

const CATEGORY_LABELS: Record<SiteLocale, Record<string, string>> = {
  en: {
    frontend: 'Frontend',
    systems: 'Systems',
    thinking: 'Thinking',
  },
  'pt-br': {
    frontend: 'Frontend',
    systems: 'Sistemas',
    thinking: 'Pensamento',
  },
}

export function getGuideReadingTimeMinutes(post: GuideEntry) {
  const normalized = (post.body ?? '')
    .replace(/`{3}[\s\S]*?`{3}/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
  const words = normalized.split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function getGuideLevelLabel(level: GuideLevel, locale?: string | null) {
  const normalizedLocale = getSiteLocale(locale)
  return LEVEL_LABELS[normalizedLocale][level]
}

export function getGuideCategoryLabel(post: GuideEntry) {
  const normalizedLocale = getSiteLocale(post.data.locale)
  const rootGroupId = getTopicRootGroupId(post.data.topicIds[0] ?? '')

  if (rootGroupId && CATEGORY_LABELS[normalizedLocale][rootGroupId]) {
    return CATEGORY_LABELS[normalizedLocale][rootGroupId]
  }

  return post.data.category
}

export function toHashtagLabel(value: string, locale?: string | null) {
  const normalizedLocale = getSiteLocale(locale) === 'pt-br' ? 'pt-BR' : 'en-US'
  const normalizedValue = value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase(normalizedLocale)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalizedValue ? `#${normalizedValue}` : null
}
