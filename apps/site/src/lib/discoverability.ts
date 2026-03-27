import {
  getDefaultLocale,
  getLocaleFeedHref,
  getLocalePath,
  getSupportedLocaleDefinitions,
  normalizeSiteLocale,
} from '@/lib/locale-config'
import {
  getSiteDescription,
  getSiteName,
} from '@/lib/site-config'
import {
  getEnabledSections,
  getSectionDescription,
  getSectionHref,
  getSectionLabel,
  isPageTypeEnabled,
} from '@/lib/section-manifest'
import type { SiteLocale } from '@/lib/site-copy'

type DiscoverabilityCard = {
  description: string
  href: string
  meta?: string
  title: string
}

type DiscoverabilityCopy = {
  coreDescription: string
  coreTitle: string
  description: string
  eyebrow: string
  feedDescription: string
  homeTitle: string
  homeDescription: string
  llmsDescription: string
  localeCardDescription: string
  localeDescription: string
  localeTitle: string
  robotsDescription: string
  sectionsDescription: string
  sectionsTitle: string
  sitemapDescription: string
  title: string
}

const discoverabilityCopyByLocale: Record<string, DiscoverabilityCopy> = {
  en: {
    coreDescription:
      'Start with llms.txt, feeds, sitemap, and robots before traversing detail pages.',
    coreTitle: 'Core files',
    description:
      'Machine-oriented entry points for crawlers, search systems, and automation clients.',
    eyebrow: 'Discoverability',
    feedDescription:
      'Locale-specific RSS feed sorted by editorial recency for article updates and new posts.',
    homeTitle: 'Home',
    homeDescription:
      'Localized homepage entry point with the latest recirculation blocks and section previews.',
    llmsDescription:
      'Plain-text overview of the site, locales, and stable section indexes for machine readers.',
    localeCardDescription:
      'Localized agent index with the matching home route and feed for this language.',
    localeDescription:
      'Each locale exposes its own agent index, homepage, and article feed when articles are enabled.',
    localeTitle: 'Locale entry points',
    robotsDescription:
      'Crawl policy plus the canonical sitemap pointer for search engines and automated clients.',
    sectionsDescription:
      'Localized section indexes for articles, tracks, topics, concepts, glossary pages, and challenges.',
    sectionsTitle: 'Section indexes',
    sitemapDescription:
      'Canonical URL inventory for the generated pages in this build.',
    title: 'For agents',
  },
  'pt-br': {
    coreDescription:
      'Comece por llms.txt, feeds, sitemap e robots antes de percorrer paginas de detalhe.',
    coreTitle: 'Arquivos centrais',
    description:
      'Pontos de entrada orientados a maquina para crawlers, sistemas de busca e automacao.',
    eyebrow: 'Discoverability',
    feedDescription:
      'Feed RSS por locale, ordenado pela recencia editorial de artigos novos e atualizados.',
    homeTitle: 'Inicio',
    homeDescription:
      'Ponto de entrada da home localizada com blocos recentes e previews das secoes.',
    llmsDescription:
      'Visao geral em texto simples do site, dos locales e dos indices de secao estaveis.',
    localeCardDescription:
      'Indice localizado para agentes, com home e feed correspondentes desse idioma.',
    localeDescription:
      'Cada locale expoe seu proprio indice para agentes, homepage e feed de artigos quando a secao esta ativa.',
    localeTitle: 'Entradas por locale',
    robotsDescription:
      'Politica de crawl com o ponteiro canonico do sitemap para mecanismos e clientes automatizados.',
    sectionsDescription:
      'Indices localizados de artigos, trilhas, topicos, conceitos, glossario e desafios.',
    sectionsTitle: 'Indices de secao',
    sitemapDescription:
      'Inventario canonico das URLs geradas neste build.',
    title: 'Para agentes',
  },
}

function getDiscoverabilityCopy(locale: SiteLocale): DiscoverabilityCopy {
  const normalizedLocale = normalizeSiteLocale(locale)
  return discoverabilityCopyByLocale[normalizedLocale] ?? discoverabilityCopyByLocale[getDefaultLocale()]
}

function resolveAbsoluteUrl(href: string, siteUrl: string | URL) {
  const resolvedSiteUrl = siteUrl instanceof URL ? siteUrl : new URL(siteUrl)
  return new URL(href, resolvedSiteUrl).toString()
}

export function getAgentsIndexHref(locale?: string | null) {
  return getLocalePath(locale, 'agents')
}

export function getDiscoverabilityCoreCards(locale: SiteLocale): DiscoverabilityCard[] {
  const copy = getDiscoverabilityCopy(locale)
  const cards: DiscoverabilityCard[] = [
    {
      description: copy.llmsDescription,
      href: '/llms.txt',
      title: 'llms.txt',
    },
    {
      description: copy.homeDescription,
      href: getLocalePath(locale),
      title: copy.homeTitle,
    },
    {
      description: copy.sitemapDescription,
      href: '/sitemap-index.xml',
      title: 'sitemap-index.xml',
    },
    {
      description: copy.robotsDescription,
      href: '/robots.txt',
      title: 'robots.txt',
    },
  ]

  if (isPageTypeEnabled('articles')) {
    cards.splice(2, 0, {
      description: copy.feedDescription,
      href: getLocaleFeedHref(locale),
      title: 'RSS feed',
    })
  }

  return cards
}

export function getDiscoverabilityLocaleCards(locale: SiteLocale): DiscoverabilityCard[] {
  const copy = getDiscoverabilityCopy(locale)

  return getSupportedLocaleDefinitions().map((localeDefinition) => {
    const metaParts = [`Home ${getLocalePath(localeDefinition.code)}`]

    if (isPageTypeEnabled('articles')) {
      metaParts.push(`Feed ${getLocaleFeedHref(localeDefinition.code)}`)
    }

    return {
      description: copy.localeCardDescription,
      href: getAgentsIndexHref(localeDefinition.code),
      meta: metaParts.join(' • '),
      title: localeDefinition.label,
    }
  })
}

export function getDiscoverabilitySectionCards(locale: SiteLocale): DiscoverabilityCard[] {
  return getEnabledSections().flatMap((section) => {
    const href = getSectionHref(section.id, locale)

    if (!href) {
      return []
    }

    return [{
      description: getSectionDescription(section.id, locale),
      href,
      title: getSectionLabel(section.id, locale),
    }]
  })
}

export function getDiscoverabilityPageData(locale: SiteLocale) {
  const copy = getDiscoverabilityCopy(locale)

  return {
    coreCards: getDiscoverabilityCoreCards(locale),
    copy,
    localeCards: getDiscoverabilityLocaleCards(locale),
    sectionCards: getDiscoverabilitySectionCards(locale),
  }
}

export function renderLlmsTxt(siteUrl: string | URL = 'https://example.com') {
  const localeLines = getSupportedLocaleDefinitions().flatMap((localeDefinition) => {
    const lines = [
      `- ${localeDefinition.label} home: ${resolveAbsoluteUrl(getLocalePath(localeDefinition.code), siteUrl)}`,
      `- ${localeDefinition.label} agent index: ${resolveAbsoluteUrl(getAgentsIndexHref(localeDefinition.code), siteUrl)}`,
    ]

    if (isPageTypeEnabled('articles')) {
      lines.push(
        `- ${localeDefinition.label} feed: ${resolveAbsoluteUrl(getLocaleFeedHref(localeDefinition.code), siteUrl)}`,
      )
    }

    return lines
  })
  const sectionLines = getSupportedLocaleDefinitions().flatMap((localeDefinition) =>
    getEnabledSections().flatMap((section) => {
      const href = getSectionHref(section.id, localeDefinition.code)

      if (!href) {
        return []
      }

      const description = getSectionDescription(section.id, localeDefinition.code)
      const baseLine = `- ${localeDefinition.label} ${getSectionLabel(section.id, localeDefinition.code)}: ${resolveAbsoluteUrl(href, siteUrl)}`

      return [description ? `${baseLine} - ${description}` : baseLine]
    }),
  )

  return [
    `# ${getSiteName()}`,
    `> ${getSiteDescription()}`,
    '',
    'Use this file as a stable crawl entry point for the site.',
    'Prefer localized section indexes and canonical detail pages.',
    '',
    '## Core files',
    `- llms.txt: ${resolveAbsoluteUrl('/llms.txt', siteUrl)}`,
    `- sitemap: ${resolveAbsoluteUrl('/sitemap-index.xml', siteUrl)}`,
    `- robots: ${resolveAbsoluteUrl('/robots.txt', siteUrl)}`,
    '',
    '## Locales',
    ...localeLines,
    '',
    '## Sections',
    ...sectionLines,
    '',
    '## Content model',
    '- Articles: long-form editorial explanations.',
    '- Tracks: curated reading sequences.',
    '- Concepts: short reference pages for key ideas.',
    '- Glossary: concise term definitions.',
    '- Challenges: hands-on practice exercises.',
    '',
  ].join('\n')
}
