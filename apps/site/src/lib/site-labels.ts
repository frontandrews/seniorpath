import { getSiteLocale, type SiteLocale } from './site-copy'

const PT_BR_LABELS: Record<string, string> = {
  'Thinking Like a Senior': 'Pensar com clareza',
  'Problem Breakdown': 'Como quebrar o problema',
  'Trade-offs and Constraints': 'Escolhas e limites',
  'Code for Humans': 'Codigo facil de entender',
  'Runtime & Execution': 'Como o codigo roda',
  'Event Loop and Execution Order': 'Event loop e ordem de execucao',
  'Concurrency and Parallelism': 'Concorrencia e paralelismo',
  'Memory Basics': 'Memoria sem misterio',
  'Problem Solving & Interview Thinking': 'Resolver problemas e entrevistas',
  'Approach and Framing': 'Por onde comecar',
  'Pattern Recognition': 'Reconhecer padroes',
  'Communicating Solutions': 'Como explicar sua solucao',
  'State & UI Thinking': 'Estado e interface',
  'State Ownership': 'De quem e esse estado?',
  'Effects and Side Effects': 'Effects sem bagunca',
  'Server and Client Thinking': 'O que roda no cliente e no servidor',
  'Data & Persistence': 'Dados e armazenamento',
  'Data Modeling': 'Modelagem de dados',
  'SQL vs NoSQL': 'SQL vs NoSQL',
  'Cache and Consistency': 'Cache e consistencia',
  'System Thinking': 'Sistemas na pratica',
  'Scalability and Bottlenecks': 'Escala e gargalos',
  'API and Service Design': 'APIs e servicos',
  'AI Systems and Retrieval': 'IA, busca e contexto',
  'Debugging & Production Thinking': 'Debug e producao',
  'Production Failures': 'Falhas em producao',
  'Logs and Observability': 'Logs e observabilidade',
  'Async and Race Bugs': 'Bugs assincronos e race conditions',
  'Patterns That Actually Matter': 'Padroes que ajudam de verdade',
  'Composition vs Abstraction': 'Composicao ou abstracao?',
  'Reuse vs Complexity': 'Reuso sem complicar',
  'Avoiding Overengineering': 'Sem overengineering',
  'Performance That Makes Sense': 'Performance sem achismo',
  'Bottleneck Detection': 'Onde esta o gargalo',
  'Rendering, Network, and CPU': 'Renderizacao, rede e CPU',
  'Measurement Before Optimization': 'Medir antes de otimizar',
  'Security Thinking': 'Seguranca na pratica',
  'Trust Boundaries': 'Limites de confianca',
  'Auth and Authorization': 'Autenticacao e permissao',
  'Input and API Safety': 'Entradas e APIs mais seguras',
  'Accessibility That Actually Matters': 'Acessibilidade que importa',
  'Semantics and Structure': 'Semantica e estrutura',
  'Keyboard and Focus': 'Teclado e foco',
  'Accessible React Components': 'Componentes React acessiveis',
  'Execution & Communication': 'Execucao e comunicacao',
  'Ticket and Task Thinking': 'Como pensar tickets e tarefas',
  'Estimation and Risk': 'Estimativa e risco',
  'Communication in Work and Interviews': 'Comunicacao no trabalho e em entrevistas',
  'Real-World Scenarios': 'Cenarios reais',
  'Scalable API Scenarios': 'Cenarios de API em escala',
  'Failure and Recovery Scenarios': 'Falha e recuperacao',
  'AI Feature Scenarios': 'Cenarios com IA',
  'AI Engineering': 'Engenharia de IA',
  'Coding Challenges': 'Desafios de Codigo',
  Delivery: 'Entrega',
  Leadership: 'Lideranca',
  'System Design': 'Design de Sistemas',
  'Tech English': 'Ingles para Tech',
  'Problem Solving': 'Resolucao de Problemas',
  React: 'React',
  JavaScript: 'JavaScript',
  Node: 'Node',
  javascript: 'JavaScript',
  react: 'React',
  node: 'Node',
  async: 'assincrono',
  'event loop': 'event loop',
  state: 'estado',
  rendering: 'renderizacao',
  'coding interview': 'entrevista de codigo',
  'senior-thinking': 'pensamento senior',
  'problem-solving': 'resolucao de problemas',
  interviews: 'entrevistas',
  rag: 'rag',
  retrieval: 'retrieval',
  llms: 'llms',
  delivery: 'entrega',
  communication: 'comunicacao',
  risk: 'risco',
}

export function translateSiteLabel(label: string, locale?: string | null) {
  if (getSiteLocale(locale) !== 'pt-br') {
    return label
  }

  return PT_BR_LABELS[label] ?? label
}

export function translateSiteLabels(labels: string[], locale?: string | null) {
  return labels.map((label) => translateSiteLabel(label, locale))
}

export function getTranslatedSiteLabel(label: string, locale: SiteLocale) {
  return translateSiteLabel(label, locale)
}
