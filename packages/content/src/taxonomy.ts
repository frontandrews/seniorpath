export type TaxonomyLocale = 'en' | 'pt-br'

export type TopicDefinition = {
  id: string
  labels: Record<TaxonomyLocale, string>
  routeSegment: string
  summaries: Record<TaxonomyLocale, string>
}

export const TRACK_LABELS: Record<string, string> = {
  'ai-engineering': 'AI Engineering',
  'english-for-tech': 'English for Tech',
  'leadership-and-delivery': 'Leadership and Delivery',
  programming: 'Programming',
  systems: 'Systems and Architecture',
}

export const TOPIC_DEFINITIONS: TopicDefinition[] = [
  {
    id: 'ai-engineering',
    routeSegment: 'ai-engineering',
    labels: {
      en: 'AI Engineering',
      'pt-br': 'Engenharia de IA',
    },
    summaries: {
      en: 'RAG, retrieval, evaluation, and product decisions around LLM-backed features.',
      'pt-br': 'RAG, retrieval, avaliacao e decisoes de produto em features com LLM.',
    },
  },
  {
    id: 'coding-interview',
    routeSegment: 'coding-interview',
    labels: {
      en: 'Coding Challenges',
      'pt-br': 'Desafios de Codigo',
    },
    summaries: {
      en: 'Problem framing, patterns, and communication for coding interviews.',
      'pt-br': 'Abordagem, padroes e comunicacao para entrevistas de codigo.',
    },
  },
  {
    id: 'delivery',
    routeSegment: 'delivery',
    labels: {
      en: 'Delivery',
      'pt-br': 'Entrega',
    },
    summaries: {
      en: 'Execution, scope, risk, and practical delivery trade-offs.',
      'pt-br': 'Execucao, escopo, risco e trade-offs de entrega no mundo real.',
    },
  },
  {
    id: 'javascript',
    routeSegment: 'javascript',
    labels: {
      en: 'JavaScript',
      'pt-br': 'JavaScript',
    },
    summaries: {
      en: 'How JavaScript actually runs: event loop, scheduling, and execution order.',
      'pt-br': 'Como JavaScript realmente executa: event loop, escalonamento e ordem de execucao.',
    },
  },
  {
    id: 'leadership',
    routeSegment: 'leadership',
    labels: {
      en: 'Leadership',
      'pt-br': 'Lideranca',
    },
    summaries: {
      en: 'Communication, alignment, and judgment when working with other people.',
      'pt-br': 'Comunicacao, alinhamento e criterio ao trabalhar com outras pessoas.',
    },
  },
  {
    id: 'node',
    routeSegment: 'node',
    labels: {
      en: 'Node',
      'pt-br': 'Node',
    },
    summaries: {
      en: 'Concurrency, runtime behavior, and mental models for Node systems.',
      'pt-br': 'Concorrencia, comportamento de runtime e modelos mentais para sistemas em Node.',
    },
  },
  {
    id: 'react',
    routeSegment: 'react',
    labels: {
      en: 'React',
      'pt-br': 'React',
    },
    summaries: {
      en: 'State, effects, rendering, and boundaries in modern React-style applications.',
      'pt-br': 'Estado, effects, renderizacao e limites em apps no estilo React moderno.',
    },
  },
  {
    id: 'system-design',
    routeSegment: 'system-design',
    labels: {
      en: 'System Design',
      'pt-br': 'Design de Sistemas',
    },
    summaries: {
      en: 'Scalability, boundaries, APIs, and failure modes without diagram theatre.',
      'pt-br': 'Escala, fronteiras, APIs e falhas sem teatro de diagramas.',
    },
  },
  {
    id: 'tech-english',
    routeSegment: 'tech-english',
    labels: {
      en: 'Tech English',
      'pt-br': 'Ingles para Tech',
    },
    summaries: {
      en: 'Clear communication for updates, interviews, and technical collaboration in English.',
      'pt-br': 'Comunicacao clara em ingles para updates, entrevistas e colaboracao tecnica.',
    },
  },
] as const

export const TOPIC_LABELS: Record<string, string> = Object.fromEntries(
  TOPIC_DEFINITIONS.map((topic) => [topic.id, topic.labels.en]),
)

function normalizeTaxonomyLocale(locale?: string): TaxonomyLocale {
  return locale === 'pt-br' ? 'pt-br' : 'en'
}

export function getTrackLabel(track: string): string {
  return TRACK_LABELS[track] ?? track
}

export function getTopicById(topicId: string) {
  return TOPIC_DEFINITIONS.find((topic) => topic.id === topicId)
}

export function getTopicLabel(topic: string, locale = 'en'): string {
  const normalizedLocale = normalizeTaxonomyLocale(locale)

  return getTopicById(topic)?.labels[normalizedLocale] ?? TOPIC_LABELS[topic] ?? topic
}

export function getTopicRouteSegment(topic: string): string {
  return getTopicById(topic)?.routeSegment ?? topic
}

export function getTopicSummary(topic: string, locale = 'en'): string {
  const normalizedLocale = normalizeTaxonomyLocale(locale)

  return getTopicById(topic)?.summaries[normalizedLocale] ?? getTopicLabel(topic, normalizedLocale)
}
