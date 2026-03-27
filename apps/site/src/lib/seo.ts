import { getLocaleHtmlLang, type SiteLocale } from '@/lib/locale-config'
import { siteConfig, siteUrls } from '@/lib/site-config'

type StructuredData = Record<string, unknown>

type ArticleSchemaInput = {
  dateModified?: string | null
  datePublished: string
  description: string
  keywords?: string[]
  locale: SiteLocale
  title: string
  url: string
}

type BreadcrumbSchemaInput = {
  items: {
    name: string
    url: string
  }[]
}

type WebsiteSchemaInput = {
  description: string
  locale: SiteLocale
  url: string
}

type TrackSchemaInput = {
  description: string
  items: {
    description: string
    title: string
    url: string
  }[]
  level: 'beginner' | 'intermediate' | 'advanced'
  locale: SiteLocale
  title: string
  totalReadingMinutes: number
  totalSteps: number
  url: string
}

type DefinedTermSchemaInput = {
  aliases?: string[]
  description: string
  locale: SiteLocale
  tags?: string[]
  termCode: string
  termSetUrl?: string
  title: string
  url: string
}

type LearningResourceSchemaInput = {
  dateModified?: string | null
  datePublished: string
  description: string
  estimatedMinutes: number
  keywords?: string[]
  level: 'beginner' | 'intermediate' | 'advanced'
  locale: SiteLocale
  resourceType: string
  teaches?: string[]
  title: string
  url: string
}

function compactObject<T extends StructuredData>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => {
      if (entryValue === null || entryValue === undefined) {
        return false
      }

      if (Array.isArray(entryValue)) {
        return entryValue.length > 0
      }

      return true
    }),
  ) as T
}

function createSiteOrganizationSchema() {
  return {
    '@type': 'Organization',
    logo: {
      '@type': 'ImageObject',
      url: siteUrls.socialImage,
    },
    name: siteConfig.site.name,
    url: siteConfig.site.siteUrl,
  }
}

function toIsoDuration(totalMinutes?: number | null) {
  if (!totalMinutes || totalMinutes <= 0) {
    return undefined
  }

  const roundedMinutes = Math.max(1, Math.round(totalMinutes))
  const hours = Math.floor(roundedMinutes / 60)
  const minutes = roundedMinutes % 60

  if (hours > 0 && minutes > 0) {
    return `PT${hours}H${minutes}M`
  }

  if (hours > 0) {
    return `PT${hours}H`
  }

  return `PT${minutes}M`
}

export function normalizeStructuredData(
  value?: StructuredData | StructuredData[] | null,
) {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

export function serializeStructuredData(value: StructuredData) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function createWebsiteSchema({
  description,
  locale,
  url,
}: WebsiteSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    description,
    image: siteUrls.socialImage,
    inLanguage: getLocaleHtmlLang(locale),
    name: siteConfig.site.name,
    url,
  })
}

export function createArticleSchema({
  dateModified,
  datePublished,
  description,
  keywords = [],
  locale,
  title,
  url,
}: ArticleSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Organization',
      name: siteConfig.site.name,
    },
    dateModified: dateModified ?? datePublished,
    datePublished,
    description,
    headline: title,
    image: [siteUrls.socialImage],
    inLanguage: getLocaleHtmlLang(locale),
    keywords,
    mainEntityOfPage: url,
    publisher: {
      ...createSiteOrganizationSchema(),
    },
    url,
  })
}

export function createTrackSchema({
  description,
  items,
  level,
  locale,
  title,
  totalReadingMinutes,
  totalSteps,
  url,
}: TrackSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    description,
    educationalLevel: level,
    inLanguage: getLocaleHtmlLang(locale),
    mainEntity: compactObject({
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        item: compactObject({
          '@type': 'Article',
          description: item.description,
          headline: item.title,
          name: item.title,
          url: item.url,
        }),
        position: index + 1,
      })),
      numberOfItems: totalSteps,
    }),
    name: title,
    publisher: createSiteOrganizationSchema(),
    timeRequired: toIsoDuration(totalReadingMinutes),
    url,
  })
}

export function createDefinedTermSchema({
  aliases = [],
  description,
  locale,
  tags = [],
  termCode,
  termSetUrl,
  title,
  url,
}: DefinedTermSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    alternateName: aliases,
    description,
    inDefinedTermSet: termSetUrl,
    inLanguage: getLocaleHtmlLang(locale),
    keywords: tags,
    name: title,
    termCode,
    url,
  })
}

export function createLearningResourceSchema({
  dateModified,
  datePublished,
  description,
  estimatedMinutes,
  keywords = [],
  level,
  locale,
  resourceType,
  teaches = [],
  title,
  url,
}: LearningResourceSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    author: {
      '@type': 'Organization',
      name: siteConfig.site.name,
    },
    dateModified: dateModified ?? datePublished,
    datePublished,
    description,
    educationalLevel: level,
    inLanguage: getLocaleHtmlLang(locale),
    isAccessibleForFree: true,
    keywords,
    learningResourceType: resourceType,
    name: title,
    publisher: createSiteOrganizationSchema(),
    teaches,
    timeRequired: toIsoDuration(estimatedMinutes),
    url,
  })
}

export function createBreadcrumbSchema({ items }: BreadcrumbSchemaInput) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: item.url,
      name: item.name,
      position: index + 1,
    })),
  })
}
