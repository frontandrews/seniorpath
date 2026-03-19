import {
  getPathBranchRouteSegment,
  getPathLocationByGuideId,
  getPathPillarRouteSegment,
} from './path-to-senior'

export type GuideRegistryEntry = {
  guideId: string
  locale: string
  routePath: string
}

export const GUIDE_SECTION_BY_LOCALE = {
  en: 'articles',
  'pt-br': 'artigos',
} as const

export type GuideLocale = keyof typeof GUIDE_SECTION_BY_LOCALE

export const SUPPORTED_GUIDE_LOCALES = Object.keys(GUIDE_SECTION_BY_LOCALE) as GuideLocale[]

function normalizeGuideLocale(locale?: string): GuideLocale {
  return locale === 'pt-br' ? 'pt-br' : 'en'
}

export function getGuideSectionSegment(locale = 'en') {
  return GUIDE_SECTION_BY_LOCALE[normalizeGuideLocale(locale)] ?? GUIDE_SECTION_BY_LOCALE.en
}

export function getGuideLegacyRoutePathFromEntryId(entryId: string) {
  const normalizedEntryId = entryId.replace(/^\/+|\/+$/g, '')
  const [locale = 'en', ...slugParts] = normalizedEntryId.split('/').filter(Boolean)
  const normalizedLocale = normalizeGuideLocale(locale)
  const section = getGuideSectionSegment(normalizedLocale)
  const slug = slugParts.join('/')

  return normalizedLocale === 'en' ? `${section}/${slug}` : `${normalizedLocale}/${section}/${slug}`
}

function getGuideSlugFromEntryId(entryId: string) {
  const parts = entryId.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)

  return parts.at(-1)
}

const GUIDE_ENTRY_IDS_BY_GUIDE_ID = {
  'accessible-react-components-without-hacks': {
    en: 'en/accessibility-that-actually-matters/accessible-react-components-without-hacks',
    'pt-br': 'pt-br/acessibilidade-que-importa/componentes-react-acessiveis-sem-gambiarra',
  },
  'ai-feature-scenarios-with-product-judgment': {
    en: 'en/real-world-scenarios/ai-feature-scenarios-with-product-judgment',
    'pt-br': 'pt-br/cenarios-reais/cenarios-com-ia-em-producao',
  },
  'api-and-service-design-with-clear-boundaries': {
    en: 'en/system-thinking/api-and-service-design-with-clear-boundaries',
    'pt-br': 'pt-br/sistemas-na-pratica/api-e-servicos-sem-fronteira-confusa',
  },
  'async-and-race-bugs-without-drama': {
    en: 'en/debugging-and-production-thinking/async-and-race-bugs-without-drama',
    'pt-br': 'pt-br/debug-e-producao/bugs-assincronos-e-race-conditions-sem-drama',
  },
  'auth-and-authorization-without-mixing-them-up': {
    en: 'en/security-thinking/auth-and-authorization-without-mixing-them-up',
    'pt-br': 'pt-br/seguranca-na-pratica/autenticacao-e-permissao-sem-confundir-as-duas',
  },
  'avoiding-overengineering-without-regret': {
    en: 'en/patterns-that-actually-matter/avoiding-overengineering-without-regret',
    'pt-br': 'pt-br/padroes-que-ajudam-de-verdade/sem-overengineering',
  },
  'bottleneck-detection-without-guessing': {
    en: 'en/performance-that-makes-sense/bottleneck-detection-without-guessing',
    'pt-br': 'pt-br/performance-sem-achismo/onde-esta-o-gargalo',
  },
  'breaking-down-problems-without-panic': {
    en: 'en/thinking-like-a-senior/breaking-down-problems-without-panic',
    'pt-br': 'pt-br/pensar-como-senior/como-quebrar-problemas-sem-entrar-em-panico',
  },
  'cache-and-consistency-without-self-deception': {
    en: 'en/data-and-persistence/cache-and-consistency-without-self-deception',
    'pt-br': 'pt-br/dados-e-armazenamento/cache-e-consistencia-sem-autoengano',
  },
  'communication-in-work-and-interviews-with-clarity': {
    en: 'en/execution-and-communication/communication-in-work-and-interviews-with-clarity',
    'pt-br': 'pt-br/execucao-e-comunicacao/comunicacao-no-trabalho-e-em-entrevistas',
  },
  'composition-vs-abstraction-without-theatre': {
    en: 'en/patterns-that-actually-matter/composition-vs-abstraction-without-theatre',
    'pt-br': 'pt-br/padroes-que-ajudam-de-verdade/composicao-ou-abstracao',
  },
  'data-modeling-without-overcomplicating': {
    en: 'en/data-and-persistence/data-modeling-without-overcomplicating',
    'pt-br': 'pt-br/dados-e-armazenamento/modelagem-de-dados-sem-complicar',
  },
  'effects-without-the-mess': {
    en: 'en/state-and-ui-thinking/effects-without-the-mess',
    'pt-br': 'pt-br/estado-e-interface/effects-sem-bagunca',
  },
  'estimation-and-risk-without-fake-certainty': {
    en: 'en/execution-and-communication/estimation-and-risk-without-fake-certainty',
    'pt-br': 'pt-br/execucao-e-comunicacao/estimativa-e-risco-sem-fingir-certeza',
  },
  'explaining-your-solution-without-losing-the-thread': {
    en: 'en/problem-solving-and-interview-thinking/explaining-your-solution-without-losing-the-thread',
    'pt-br': 'pt-br/pensamento-de-entrevista-e-resolucao-de-problemas/como-explicar-sua-solucao-sem-se-perder',
  },
  'failure-and-recovery-scenarios-with-clarity': {
    en: 'en/real-world-scenarios/failure-and-recovery-scenarios-with-clarity',
    'pt-br': 'pt-br/cenarios-reais/cenarios-de-falha-e-recuperacao',
  },
  'javascript-event-loop': {
    en: 'en/runtime-and-execution/javascript-event-loop-without-hand-waving',
    'pt-br': 'pt-br/como-o-codigo-roda/event-loop-sem-enrolacao',
  },
  'keyboard-and-focus-without-frustration': {
    en: 'en/accessibility-that-actually-matters/keyboard-and-focus-without-frustration',
    'pt-br': 'pt-br/acessibilidade-que-importa/teclado-e-foco-sem-frustracao',
  },
  'logs-and-observability-without-noise': {
    en: 'en/debugging-and-production-thinking/logs-and-observability-without-noise',
    'pt-br': 'pt-br/debug-e-producao/logs-e-observabilidade-sem-ruido',
  },
  'measure-before-you-optimize': {
    en: 'en/performance-that-makes-sense/measure-before-you-optimize',
    'pt-br': 'pt-br/performance-sem-achismo/medir-antes-de-otimizar',
  },
  'memory-basics-without-theatre': {
    en: 'en/runtime-and-execution/memory-basics-without-theatre',
    'pt-br': 'pt-br/como-o-codigo-roda/memoria-sem-misterio',
  },
  'node-single-thread': {
    en: 'en/runtime-and-execution/node-single-threaded-does-not-mean-what-people-think',
    'pt-br': 'pt-br/como-o-codigo-roda/node-nao-e-single-threaded-do-jeito-que-parece',
  },
  'production-failures-without-guessing': {
    en: 'en/debugging-and-production-thinking/production-failures-without-guessing',
    'pt-br': 'pt-br/debug-e-producao/falhas-em-producao-sem-chute',
  },
  'rag-vs-fine-tuning': {
    en: 'en/system-thinking/rag-vs-fine-tuning-without-false-binaries',
    'pt-br': 'pt-br/sistemas-na-pratica/rag-vs-fine-tuning-sem-falso-dilema',
  },
  'recognizing-patterns-without-memorizing-tricks': {
    en: 'en/problem-solving-and-interview-thinking/recognizing-patterns-without-memorizing-tricks',
    'pt-br': 'pt-br/pensamento-de-entrevista-e-resolucao-de-problemas/reconhecer-padroes-sem-decorar-respostas',
  },
  'rendering-network-and-cpu-without-mixing-them-up': {
    en: 'en/performance-that-makes-sense/rendering-network-and-cpu-without-mixing-them-up',
    'pt-br': 'pt-br/performance-sem-achismo/renderizacao-rede-e-cpu-sem-misturar-as-coisas',
  },
  'reuse-without-extra-complexity': {
    en: 'en/patterns-that-actually-matter/reuse-without-extra-complexity',
    'pt-br': 'pt-br/padroes-que-ajudam-de-verdade/reuso-sem-complicar',
  },
  'safer-input-and-api-design': {
    en: 'en/security-thinking/safer-input-and-api-design',
    'pt-br': 'pt-br/seguranca-na-pratica/entradas-e-apis-mais-seguras',
  },
  'scalability-and-bottlenecks-without-theatre': {
    en: 'en/system-thinking/scalability-and-bottlenecks-without-theatre',
    'pt-br': 'pt-br/sistemas-na-pratica/escala-e-gargalos-sem-teatro',
  },
  'scalable-api-scenarios-without-diagram-theatre': {
    en: 'en/real-world-scenarios/scalable-api-scenarios-without-diagram-theatre',
    'pt-br': 'pt-br/cenarios-reais/cenarios-de-api-em-escala',
  },
  'semantics-and-structure-that-actually-help': {
    en: 'en/accessibility-that-actually-matters/semantics-and-structure-that-actually-help',
    'pt-br': 'pt-br/acessibilidade-que-importa/semantica-e-estrutura',
  },
  'server-and-client-thinking-without-confusion': {
    en: 'en/state-and-ui-thinking/server-and-client-thinking-without-confusion',
    'pt-br': 'pt-br/estado-e-interface/o-que-roda-no-cliente-e-no-servidor',
  },
  'sql-vs-nosql-without-slogans': {
    en: 'en/data-and-persistence/sql-vs-nosql-without-slogans',
    'pt-br': 'pt-br/dados-e-armazenamento/sql-vs-nosql-sem-slogan',
  },
  'state-ownership-without-confusion': {
    en: 'en/state-and-ui-thinking/state-ownership-without-confusion',
    'pt-br': 'pt-br/estado-e-interface/de-quem-e-esse-estado',
  },
  'thinking-before-you-code-in-interviews': {
    en: 'en/problem-solving-and-interview-thinking/thinking-before-you-code-in-interviews',
    'pt-br': 'pt-br/pensamento-de-entrevista-e-resolucao-de-problemas/pensar-antes-de-codificar-em-entrevistas',
  },
  'ticket-and-task-thinking-with-clarity': {
    en: 'en/execution-and-communication/ticket-and-task-thinking-with-clarity',
    'pt-br': 'pt-br/execucao-e-comunicacao/como-pensar-tickets-e-tarefas',
  },
  'trade-offs-and-constraints-without-fake-certainty': {
    en: 'en/thinking-like-a-senior/trade-offs-and-constraints-without-fake-certainty',
    'pt-br': 'pt-br/pensar-como-senior/como-pensar-em-trade-offs-sem-fingir-certeza',
  },
  'trust-boundaries-without-hand-waving': {
    en: 'en/security-thinking/trust-boundaries-without-hand-waving',
    'pt-br': 'pt-br/seguranca-na-pratica/limites-de-confianca',
  },
  'writing-code-people-can-read': {
    en: 'en/thinking-like-a-senior/writing-code-people-can-read',
    'pt-br': 'pt-br/pensar-como-senior/escrever-codigo-que-gente-consegue-entender',
  },
} as const satisfies Record<string, Partial<Record<GuideLocale, string>>>

type CanonicalGuideId = keyof typeof GUIDE_ENTRY_IDS_BY_GUIDE_ID

const GUIDE_ENTRY_BY_ENTRY_ID = Object.entries(GUIDE_ENTRY_IDS_BY_GUIDE_ID).flatMap(([guideId, entryIds]) =>
  Object.entries(entryIds).map(
    ([locale, entryId]) =>
      [entryId, { guideId: guideId as CanonicalGuideId, locale: locale as GuideLocale }] as const,
  ),
)
const GUIDE_ENTRY_BY_ENTRY_ID_MAP = new Map<string, { guideId: CanonicalGuideId; locale: GuideLocale }>(
  GUIDE_ENTRY_BY_ENTRY_ID,
)

export function getGuidePillarRoutePath(pillarId: string, locale = 'en') {
  const normalizedLocale = normalizeGuideLocale(locale)
  const section = getGuideSectionSegment(normalizedLocale)
  const pillarSegment = getPathPillarRouteSegment(pillarId, normalizedLocale)

  if (!pillarSegment) {
    return undefined
  }

  return normalizedLocale === 'en'
    ? `${section}/${pillarSegment}`
    : `${normalizedLocale}/${section}/${pillarSegment}`
}

export function getGuideBranchRoutePath(pillarId: string, branchId: string, locale = 'en') {
  const pillarRoutePath = getGuidePillarRoutePath(pillarId, locale)
  const branchSegment = getPathBranchRouteSegment(pillarId, branchId, locale)

  if (!pillarRoutePath || !branchSegment) {
    return undefined
  }

  return `${pillarRoutePath}/${branchSegment}`
}

function getGuideCanonicalRoutePath(guideId: CanonicalGuideId, locale: GuideLocale) {
  const entryId = GUIDE_ENTRY_IDS_BY_GUIDE_ID[guideId]?.[locale]
  const guideLocation = getPathLocationByGuideId(guideId)

  if (!entryId || !guideLocation) {
    return undefined
  }

  const pillarRoutePath = getGuidePillarRoutePath(guideLocation.pillar.id, locale)
  const guideSlug = getGuideSlugFromEntryId(entryId)

  if (!pillarRoutePath || !guideSlug) {
    return undefined
  }

  return `${pillarRoutePath}/${guideSlug}`
}

const GUIDE_REGISTRY: GuideRegistryEntry[] = Object.entries(GUIDE_ENTRY_IDS_BY_GUIDE_ID).flatMap(
  ([guideId, entryIds]) =>
    Object.keys(entryIds).flatMap((locale) => {
      const routePath = getGuideCanonicalRoutePath(guideId as CanonicalGuideId, locale as GuideLocale)

      if (!routePath) {
        return []
      }

      return [
        {
          guideId,
          locale,
          routePath,
        },
      ]
    }),
)

export function getGuideRegistry() {
  return GUIDE_REGISTRY
}

export function getGuideEntry(guideId: string, locale = 'en') {
  return (
    GUIDE_REGISTRY.find((entry) => entry.guideId === guideId && entry.locale === normalizeGuideLocale(locale)) ??
    GUIDE_REGISTRY.find((entry) => entry.guideId === guideId)
  )
}

export function getGuideRoutePath(guideId: string, locale = 'en') {
  return getGuideEntry(guideId, locale)?.routePath
}

export function getGuideRoutePathFromEntryId(entryId: string) {
  const normalizedEntryId = entryId.replace(/^\/+|\/+$/g, '')
  const guideEntry = GUIDE_ENTRY_BY_ENTRY_ID_MAP.get(normalizedEntryId)

  if (!guideEntry) {
    return getGuideLegacyRoutePathFromEntryId(normalizedEntryId)
  }

  return getGuideRoutePath(guideEntry.guideId, guideEntry.locale) ?? getGuideLegacyRoutePathFromEntryId(normalizedEntryId)
}
