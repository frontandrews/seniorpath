import { getSiteLocale, type SiteLocale } from '@/lib/site-copy'

type PrivacyContext = {
  governingLaw: string
  operatorLocation: string
  operatorName: string
  siteName: string
}

type TermsContext = PrivacyContext & {
  venue: string
}

type LegalSection<TContext> = {
  body: (context: TContext) => string
  items?: string[]
  title: string
}

type PrivacyCopy = {
  applicableLaw: LegalSection<PrivacyContext>
  changes: LegalSection<PrivacyContext>
  collectedData: LegalSection<PrivacyContext>
  contact: {
    bodyPrefix: string
    title: string
  }
  cookies: LegalSection<PrivacyContext>
  description: (siteName: string) => string
  howDataIsUsed: LegalSection<PrivacyContext>
  intro: (siteName: string) => string
  publishChecklist: {
    items: string[]
    title: string
  }
  retention: LegalSection<PrivacyContext>
  templateNoteLabel: string
  thirdPartyServices: LegalSection<PrivacyContext>
  title: string
  whoControls: LegalSection<PrivacyContext> & {
    contactPrefix: string
  }
  yourRights: LegalSection<PrivacyContext>
}

type TermsCopy = {
  acceptableUse: LegalSection<TermsContext>
  accounts: LegalSection<TermsContext>
  availability: LegalSection<TermsContext>
  contact: {
    intro: string
    lastSeparator: string
    middleSeparator: string
    title: string
  }
  contentOwnership: LegalSection<TermsContext>
  description: (siteName: string) => string
  disclaimer: LegalSection<TermsContext>
  governingLawVenue: LegalSection<TermsContext>
  intro: (siteName: string) => string
  noProfessionalAdvice: LegalSection<TermsContext>
  publishChecklist: {
    items: string[]
    title: string
  }
  templateNoteLabel: string
  thirdPartyServices: LegalSection<TermsContext>
  title: string
  whoOperates: LegalSection<TermsContext>
}

type LegalPageCopy = {
  privacy: PrivacyCopy
  terms: TermsCopy
}

const legalPageCopy: Record<string, LegalPageCopy> = {
  en: {
    privacy: {
      applicableLaw: {
        body: ({ governingLaw }) =>
          `Document the real privacy regime that applies to the site, including ${governingLaw} when relevant, plus any lawful-basis, notice, transfer, or consumer-rights requirements that actually govern your operation.`,
        title: 'Applicable law',
      },
      changes: {
        body: () =>
          'The operator may update this policy as the product, vendors, or legal requirements change. The current version should always be published on this page with an effective date if your jurisdiction requires it.',
        title: 'Changes to this policy',
      },
      collectedData: {
        body: () => '',
        items: [
          'Contact details you choose to send, such as name, email, or support messages',
          'Account or authentication data if login features are enabled',
          'Usage data such as visited pages, clicks, timestamps, and navigation paths',
          'Technical data such as IP address, browser, device type, and operating system',
          'Preference data stored in the browser, such as locale, progress markers, or UI state',
          'Data received from third-party providers you actively use, such as auth, payments, or comments',
        ],
        title: 'What data may be collected',
      },
      contact: {
        bodyPrefix: 'If you have questions about this policy or how personal data is handled, contact',
        title: 'Contact',
      },
      cookies: {
        body: () =>
          'State which cookies, local storage keys, analytics scripts, or similar technologies actually run in production, why they exist, how long they persist, and whether consent is required in your jurisdiction.',
        title: 'Cookies, local storage, and analytics',
      },
      description: (siteName) => `How ${siteName} handles personal data, cookies, and site preferences.`,
      howDataIsUsed: {
        body: () => '',
        items: [
          'Run, maintain, and improve the site and any related features',
          'Remember preferences and keep optional account or progress flows working',
          'Measure traffic, understand usage, and improve navigation or content quality',
          'Send newsletters, updates, transactional messages, or launch communications when enabled',
          'Prevent abuse, investigate incidents, and comply with legal obligations',
        ],
        title: 'How data may be used',
      },
      intro: (siteName) =>
        `Use this page as the public explanation of how ${siteName} handles personal data. Before launch, replace placeholders, remove flows you do not offer, and name the real providers and legal duties that apply to your operation.`,
      publishChecklist: {
        items: [
          'Replace operator name, location, legal contact, and governing law with real production values.',
          'Remove references to features you do not offer and add the providers you actually use for hosting, analytics, email, auth, comments, or payments.',
          'Confirm retention, consent, and data-subject rights against the jurisdictions and processors that apply to the live site.',
          'Add an effective date and internal review owner if your legal workflow requires it.',
        ],
        title: 'Publication checklist',
      },
      retention: {
        body: () =>
          'Personal data should be kept only for as long as needed for the feature, legal obligation, or operational purpose involved. Operators should also apply reasonable technical and organizational safeguards, while recognizing that no system is perfectly secure.',
        title: 'Retention and security',
      },
      templateNoteLabel: 'Before publishing.',
      thirdPartyServices: {
        body: () =>
          'List the real third-party processors and infrastructure providers that receive personal data, telemetry, or support requests for this site, and link their privacy terms when appropriate.',
        title: 'Third-party services',
      },
      title: 'Privacy Policy',
      whoControls: {
        body: ({ operatorLocation, operatorName, siteName }) =>
          `${operatorName} operates ${siteName}. The operator is based in ${operatorLocation}.`,
        contactPrefix: 'For privacy requests or questions about your data, contact',
        title: 'Who controls your data',
      },
      yourRights: {
        body: () =>
          'Describe the real privacy rights that apply to your audience and explain how requests should be made, verified, and answered in practice.',
        title: 'Your rights',
      },
    },
    terms: {
      acceptableUse: {
        body: () =>
          'You may use the site only for lawful purposes and in a way that does not harm the platform or other users.',
        items: [
          'Do not interfere with the site, its infrastructure, or its security controls',
          'Do not scrape or reuse the content in abusive or unauthorized ways',
          'Do not upload spam, malware, unlawful material, or deceptive content',
          'Do not misrepresent your identity or your relationship with a company or brand',
        ],
        title: 'Acceptable use',
      },
      accounts: {
        body: () =>
          'Some deployments may add accounts, comments, subscriptions, payments, downloads, or other gated features. When those features exist, users must provide accurate information and keep their credentials secure.',
        title: 'Accounts and optional features',
      },
      availability: {
        body: () =>
          'The operator may update, pause, rename, limit, or discontinue parts of the site at any time. These terms may also change as the product or legal requirements change.',
        title: 'Availability and changes',
      },
      contact: {
        intro: 'For legal notices or support questions related to these terms, contact',
        lastSeparator: ' or ',
        middleSeparator: ', ',
        title: 'Contact',
      },
      contentOwnership: {
        body: () =>
          'Unless stated otherwise, the site structure, design, and original content belong to the operator or its licensors. Users may share links and quote limited excerpts with attribution, but broader reuse depends on the license or permissions published for that deployment.',
        title: 'Content and intellectual property',
      },
      description: (siteName) => `Starter terms for using ${siteName} and related features.`,
      disclaimer: {
        body: () =>
          'Adjust liability, warranty, refund, and consumer-rights language to match the real jurisdiction, business model, and risk profile of the published site.',
        title: 'Disclaimer and limitation of liability',
      },
      governingLawVenue: {
        body: ({ governingLaw, venue }) =>
          `Replace this placeholder with the actual governing law, forum, venue, arbitration, or mandatory consumer rules that apply to disputes involving the site, including ${governingLaw} and ${venue} only when they are correct.`,
        title: 'Governing law and venue',
      },
      intro: (siteName) =>
        `Use these Terms of Service as the public rules for accessing ${siteName}. Before launch, remove product flows you do not offer and adapt the clauses to the real operator, jurisdiction, support model, and commercial setup.`,
      noProfessionalAdvice: {
        body: () =>
          'If the site publishes editorial or educational content, say that clearly. If it provides professional services, regulated advice, or paid deliverables, replace this clause with the real service terms.',
        title: 'No professional advice',
      },
      publishChecklist: {
        items: [
          'Confirm operator identity, support/legal contact, and governing law or venue before publishing.',
          'Describe only the features you actually offer, such as accounts, comments, downloads, newsletters, subscriptions, or payments.',
          'Review acceptable-use, intellectual-property, and licensing clauses against the actual content and business model of the site.',
          'Check refund, consumer-rights, and liability wording if the site sells anything or serves regulated audiences.',
        ],
        title: 'Publication checklist',
      },
      templateNoteLabel: 'Before publishing.',
      thirdPartyServices: {
        body: () =>
          'Name the real providers that power hosting, analytics, auth, comments, email, payments, or moderation for the published site, and make sure those dependencies match this page.',
        title: 'Third-party services',
      },
      title: 'Terms of Service',
      whoOperates: {
        body: ({ operatorLocation, operatorName, siteName }) =>
          `${operatorName} operates ${siteName} from ${operatorLocation}. In these terms, "we" refers to that operator and the project built on this template.`,
        title: 'Who operates the site',
      },
    },
  },
  'pt-br': {
    privacy: {
      applicableLaw: {
        body: ({ governingLaw }) =>
          `Documente aqui o regime real de privacidade que se aplica ao site, incluindo ${governingLaw} quando fizer sentido, junto com base legal, obrigacoes de aviso, transferencia internacional e regras de consumo que realmente governam a operacao.`,
        title: 'Lei aplicavel',
      },
      changes: {
        body: () =>
          'O operador pode atualizar esta politica quando produto, fornecedores ou exigencias legais mudarem. A versao atual deve ficar publicada nesta pagina com data de vigencia quando isso for exigido pela jurisdicao aplicavel.',
        title: 'Mudancas nesta politica',
      },
      collectedData: {
        body: () => '',
        items: [
          'Dados de contato que a pessoa decidir enviar, como nome, email ou mensagens de suporte',
          'Dados de conta ou autenticacao, se recursos de login estiverem habilitados',
          'Dados de uso, como paginas visitadas, cliques, horarios e caminhos de navegacao',
          'Dados tecnicos, como IP, navegador, tipo de dispositivo e sistema operacional',
          'Dados de preferencia guardados no navegador, como locale, progresso ou estado da interface',
          'Dados recebidos de provedores terceiros usados de forma ativa, como auth, pagamentos ou comentarios',
        ],
        title: 'Que dados podem ser coletados',
      },
      contact: {
        bodyPrefix: 'Se voce tiver duvidas sobre esta politica ou sobre o tratamento de dados pessoais, entre em contato por',
        title: 'Contato',
      },
      cookies: {
        body: () =>
          'Explique quais cookies, chaves de local storage, scripts de analytics ou tecnologias parecidas realmente rodam em producao, por que existem, por quanto tempo persistem e se exigem consentimento na sua jurisdicao.',
        title: 'Cookies, local storage e analytics',
      },
      description: (siteName) => `Como ${siteName} trata dados pessoais, cookies e preferencias do site.`,
      howDataIsUsed: {
        body: () => '',
        items: [
          'Operar, manter e melhorar o site e os recursos relacionados',
          'Memorizar preferencias e manter funcionando fluxos opcionais de conta ou progresso',
          'Medir trafego, entender uso e melhorar navegacao ou qualidade do conteudo',
          'Enviar newsletter, atualizacoes, mensagens transacionais ou comunicacoes de lancamento quando existir',
          'Prevenir abuso, investigar incidentes e cumprir obrigacoes legais',
        ],
        title: 'Como os dados podem ser usados',
      },
      intro: (siteName) =>
        `Use esta pagina como explicacao publica de como ${siteName} trata dados pessoais. Antes do lancamento, troque placeholders, remova fluxos que nao existem e nomeie os provedores e obrigacoes legais reais da sua operacao.`,
      publishChecklist: {
        items: [
          'Troque nome do operador, localizacao, contato juridico e lei aplicavel pelos valores reais de producao.',
          'Remova referencias a recursos que nao existem e adicione os provedores reais usados para hospedagem, analytics, email, auth, comentarios ou pagamentos.',
          'Confirme retencao, consentimento e direitos dos titulares com base nas jurisdicoes e nos processadores que valem para o site ao vivo.',
          'Adicione data de vigencia e responsavel interno pela revisao se isso fizer parte do seu fluxo juridico.',
        ],
        title: 'Checklist de publicacao',
      },
      retention: {
        body: () =>
          'Dados pessoais devem ser mantidos apenas pelo tempo necessario para o recurso, a obrigacao legal ou a necessidade operacional envolvida. O operador tambem deve aplicar salvaguardas tecnicas e organizacionais razoaveis, sabendo que nenhum sistema e totalmente seguro.',
        title: 'Retencao e seguranca',
      },
      templateNoteLabel: 'Antes de publicar.',
      thirdPartyServices: {
        body: () =>
          'Liste os processadores e provedores de infraestrutura que realmente recebem dados pessoais, telemetria ou pedidos de suporte deste site e aponte para suas politicas quando fizer sentido.',
        title: 'Servicos de terceiros',
      },
      title: 'Politica de Privacidade',
      whoControls: {
        body: ({ operatorLocation, operatorName, siteName }) =>
          `${operatorName} opera ${siteName}. O operador esta baseado em ${operatorLocation}.`,
        contactPrefix: 'Para pedidos de privacidade ou duvidas sobre seus dados, entre em contato por',
        title: 'Quem controla seus dados',
      },
      yourRights: {
        body: () =>
          'Descreva os direitos de privacidade que realmente se aplicam ao seu publico e explique como pedidos devem ser feitos, verificados e respondidos na pratica.',
        title: 'Seus direitos',
      },
    },
    terms: {
      acceptableUse: {
        body: () =>
          'Voce so pode usar o site para fins licitos e sem prejudicar a plataforma ou outras pessoas.',
        items: [
          'Nao interfira no site, na infraestrutura ou nos controles de seguranca',
          'Nao faca scraping nem reutilize o conteudo de forma abusiva ou sem autorizacao',
          'Nao envie spam, malware, material ilegal ou conteudo enganoso',
          'Nao deturpe sua identidade nem sua relacao com empresa, marca ou organizacao',
        ],
        title: 'Uso aceitavel',
      },
      accounts: {
        body: () =>
          'Algumas implementacoes podem adicionar contas, comentarios, assinaturas, pagamentos, downloads ou outros recursos restritos. Quando esses recursos existirem, usuarios devem fornecer dados corretos e manter suas credenciais seguras.',
        title: 'Contas e recursos opcionais',
      },
      availability: {
        body: () =>
          'O operador pode atualizar, pausar, renomear, limitar ou encerrar partes do site a qualquer momento. Estes termos tambem podem mudar conforme o produto ou as exigencias legais mudarem.',
        title: 'Disponibilidade e mudancas',
      },
      contact: {
        intro: 'Para notificacoes juridicas ou duvidas de suporte relacionadas a estes termos, entre em contato por',
        lastSeparator: ' ou ',
        middleSeparator: ', ',
        title: 'Contato',
      },
      contentOwnership: {
        body: () =>
          'Salvo indicacao em contrario, estrutura do site, design e conteudo original pertencem ao operador ou aos seus licenciadores. Usuarios podem compartilhar links e citar trechos curtos com atribuicao, mas reutilizacao maior depende da licenca ou das permissoes publicadas naquela instalacao.',
        title: 'Conteudo e propriedade intelectual',
      },
      description: (siteName) => `Termos-base para uso de ${siteName} e dos recursos relacionados.`,
      disclaimer: {
        body: () =>
          'Ajuste linguagem de responsabilidade, garantia, reembolso e direitos do consumidor para a jurisdicao, o modelo de negocio e o risco real do site publicado.',
        title: 'Isencao e limitacao de responsabilidade',
      },
      governingLawVenue: {
        body: ({ governingLaw, venue }) =>
          `Troque este placeholder pela lei, pelo foro, pela arbitragem e pelas regras obrigatorias de consumo que realmente se aplicam a disputas envolvendo o site, incluindo ${governingLaw} e ${venue} apenas quando estiverem corretos.`,
        title: 'Lei aplicavel e foro',
      },
      intro: (siteName) =>
        `Use estes Termos de Uso como regras publicas de acesso a ${siteName}. Antes do lancamento, remova fluxos que nao existem e adapte as clausulas ao operador, a jurisdicao, ao suporte e ao modelo comercial reais.`,
      noProfessionalAdvice: {
        body: () =>
          'Se o site publica conteudo editorial ou educacional, deixe isso explicito. Se ele oferece servicos profissionais, aconselhamento regulado ou entregas pagas, substitua esta clausula pelos termos reais do servico.',
        title: 'Sem aconselhamento profissional',
      },
      publishChecklist: {
        items: [
          'Confirme identidade do operador, contato de suporte/juridico e lei aplicavel ou foro antes da publicacao.',
          'Descreva apenas os recursos que realmente existem, como contas, comentarios, downloads, newsletters, assinaturas ou pagamentos.',
          'Revise uso aceitavel, propriedade intelectual e licenciamento com base no conteudo e no modelo de negocio reais do site.',
          'Cheque linguagem de reembolso, direitos do consumidor e limitacao de responsabilidade se o site vender algo ou atender publico regulado.',
        ],
        title: 'Checklist de publicacao',
      },
      templateNoteLabel: 'Antes de publicar.',
      thirdPartyServices: {
        body: () =>
          'Nomeie os provedores reais que sustentam hospedagem, analytics, auth, comentarios, email, pagamentos ou moderacao do site publicado e confirme que essas dependencias batem com esta pagina.',
        title: 'Servicos de terceiros',
      },
      title: 'Termos de Uso',
      whoOperates: {
        body: ({ operatorLocation, operatorName, siteName }) =>
          `${operatorName} opera ${siteName} a partir de ${operatorLocation}. Nestes termos, "nos" se refere a esse operador e ao projeto construido sobre este template.`,
        title: 'Quem opera o site',
      },
    },
  },
}

export function getLegalPageCopy(locale?: SiteLocale): LegalPageCopy {
  return legalPageCopy[getSiteLocale(locale)] ?? legalPageCopy.en
}
