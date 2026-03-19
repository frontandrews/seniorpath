import type { CollectionEntry } from 'astro:content'
import { getGuideRoutePath, getPathBranchById, getPathPillarById, type PathBranch, type PathPillar } from '@seniorpath/content'

import { getGuideIndexHref, getGuidePillarHref } from '@/lib/guide-links'
import { getSiteCopy, getSiteLocale, type SiteLocale } from '@/lib/site-copy'
import { translateSiteLabel } from '@/lib/site-labels'

export type GuideEntry = CollectionEntry<'guides'>

export type GuideBreadcrumbItem = {
  href: string | null
  label: string
}

export type GuideCanonicalParams = {
  pillar: string
  slug: string
}

export type GuideTaxonomy = {
  branch: PathBranch | null
  locale: SiteLocale
  pillar: PathPillar | null
}

export function getGuideSlugFromEntryId(entryId: string) {
  return entryId.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).at(-1) ?? entryId
}

export function getGuideCanonicalParams(post: GuideEntry): GuideCanonicalParams | null {
  const routePath = getGuideRoutePath(post.data.guideId, post.data.locale)

  if (!routePath) {
    return null
  }

  const parts = routePath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const segments = post.data.locale === 'pt-br' ? parts.slice(2) : parts.slice(1)

  if (segments.length !== 2) {
    return null
  }

  const [pillar, slug] = segments

  return {
    pillar,
    slug,
  }
}

export function getGuideTaxonomy(post: GuideEntry): GuideTaxonomy {
  const locale = getSiteLocale(post.data.locale)
  const pillar = post.data.pillarId ? getPathPillarById(post.data.pillarId) ?? null : null
  const branch =
    post.data.pillarId && post.data.branchId
      ? getPathBranchById(post.data.pillarId, post.data.branchId) ?? null
      : null

  return {
    branch,
    locale,
    pillar,
  }
}

export function getLocalizedPillarLabel(pillar: PathPillar, locale: SiteLocale) {
  return translateSiteLabel(pillar.title, locale)
}

export function getLocalizedBranchLabel(branch: PathBranch, locale: SiteLocale) {
  return translateSiteLabel(branch.title, locale)
}

export function getGuideBreadcrumb(post: GuideEntry): GuideBreadcrumbItem[] {
  const { locale, pillar } = getGuideTaxonomy(post)
  const copy = getSiteCopy(locale)
  const items: GuideBreadcrumbItem[] = [
    {
      href: getGuideIndexHref(locale),
      label: copy.learn,
    },
  ]

  if (pillar) {
    items.push({
      href: getGuidePillarHref(pillar.id, locale),
      label: getLocalizedPillarLabel(pillar, locale),
    })
  }

  items.push({
    href: null,
    label: post.data.title,
  })

  return items
}

export function getPillarBreadcrumb(pillar: PathPillar, locale: SiteLocale): GuideBreadcrumbItem[] {
  const copy = getSiteCopy(locale)

  return [
    {
      href: getGuideIndexHref(locale),
      label: copy.learn,
    },
    {
      href: null,
      label: getLocalizedPillarLabel(pillar, locale),
    },
  ]
}

export function getBranchBreadcrumb(
  pillar: PathPillar,
  branch: PathBranch,
  locale: SiteLocale,
): GuideBreadcrumbItem[] {
  const copy = getSiteCopy(locale)

  return [
    {
      href: getGuideIndexHref(locale),
      label: copy.learn,
    },
    {
      href: getGuidePillarHref(pillar.id, locale),
      label: getLocalizedPillarLabel(pillar, locale),
    },
    {
      href: null,
      label: getLocalizedBranchLabel(branch, locale),
    },
  ]
}
