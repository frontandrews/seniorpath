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
          `This policy should be interpreted under ${governingLaw}, alongside any mandatory privacy or consumer rules that apply to the visitor's location.`,
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
          'Information you choose to send, such as email messages or newsletter signup details when those forms are available',
          'Usage data such as visited pages, clicks, scroll depth, timestamps, and navigation paths',
          'Technical data such as IP address, browser, device type, language, and operating system',
          'Preference data stored in the browser, such as locale choice and reading progress markers',
          'Comment-related data if comments are enabled through Giscus and GitHub',
        ],
        title: 'What data may be collected',
      },
      contact: {
        bodyPrefix: 'If you have questions about this policy or how personal data is handled, contact',
        title: 'Contact',
      },
      cookies: {
        body: () =>
          'This site uses browser storage to remember language preference and reading progress. It may also use cookies or similar identifiers from Microsoft Clarity to understand navigation patterns, heatmaps, and session replay so the site can be improved.',
        title: 'Cookies, local storage, and analytics',
      },
      description: (siteName) => `How ${siteName} handles personal data, cookies, and site preferences.`,
      howDataIsUsed: {
        body: () => '',
        items: [
          'Operate, maintain, and improve the site and its editorial experience',
          'Remember preferences such as language choice and reading progress',
          'Measure traffic and understand how visitors use the site through analytics and session replay',
          'Respond to messages and process newsletter subscriptions when those flows are used',
          'Prevent abuse, investigate incidents, and comply with legal obligations',
        ],
        title: 'How data may be used',
      },
      intro: (siteName) =>
        `${siteName} is a content-focused site. This page explains, in plain language, what limited data may be collected when you browse the site, sign up for updates, or interact with optional features such as comments.`,
      publishChecklist: {
        items: [
          'Review contact information and governing-law details periodically.',
          'Keep this policy aligned with the real providers enabled in production.',
          'Update this page if newsletter, comments, or analytics flows materially change.',
          'Review consent and retention requirements when the site starts serving new regions or new data flows.',
        ],
        title: 'Publication checklist',
      },
      retention: {
        body: () =>
          'Personal data is kept only for as long as reasonably necessary for the related feature, legal duty, or operational need. The site operator applies reasonable technical safeguards, but no internet-connected service can guarantee absolute security.',
        title: 'Retention and security',
      },
      templateNoteLabel: 'Before publishing.',
      thirdPartyServices: {
        body: () =>
          'This site may rely on Cloudflare for hosting and delivery, Microsoft Clarity for analytics and session replay, and Giscus/GitHub for comments when comments are enabled. Those providers may receive technical and usage data necessary to deliver their services.',
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
          'You can request information about the personal data you have shared directly with the site, and you can ask for correction or deletion when applicable. For requests related to data you submitted directly, use the contact channel listed on this page.',
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
          `Esta politica deve ser interpretada conforme ${governingLaw}, junto com eventuais regras obrigatorias de privacidade e consumo aplicaveis ao local da pessoa visitante.`,
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
          'Informacoes que voce decidir enviar, como mensagens por email ou dados de inscricao em newsletter quando esse fluxo existir',
          'Dados de uso, como paginas visitadas, cliques, profundidade de rolagem, horarios e caminhos de navegacao',
          'Dados tecnicos, como IP, navegador, tipo de dispositivo, idioma e sistema operacional',
          'Dados de preferencia guardados no navegador, como escolha de idioma e marcadores de progresso de leitura',
          'Dados ligados a comentarios se os comentarios estiverem habilitados via Giscus e GitHub',
        ],
        title: 'Que dados podem ser coletados',
      },
      contact: {
        bodyPrefix: 'Se voce tiver duvidas sobre esta politica ou sobre o tratamento de dados pessoais, entre em contato por',
        title: 'Contato',
      },
      cookies: {
        body: () =>
          'Este site usa armazenamento no navegador para lembrar idioma e progresso de leitura. Tambem pode usar cookies ou identificadores parecidos do Microsoft Clarity para entender navegacao, mapas de calor e session replay com o objetivo de melhorar a experiencia do site.',
        title: 'Cookies, local storage e analytics',
      },
      description: (siteName) => `Como ${siteName} trata dados pessoais, cookies e preferencias do site.`,
      howDataIsUsed: {
        body: () => '',
        items: [
          'Operar, manter e melhorar o site e a experiencia editorial',
          'Memorizar preferencias como idioma e progresso de leitura',
          'Medir trafego e entender como visitantes usam o site por analytics e session replay',
          'Responder mensagens e processar inscricoes de newsletter quando esses fluxos forem usados',
          'Prevenir abuso, investigar incidentes e cumprir obrigacoes legais',
        ],
        title: 'Como os dados podem ser usados',
      },
      intro: (siteName) =>
        `${siteName} e um site focado em conteudo. Esta pagina explica de forma objetiva quais dados limitados podem ser coletados quando voce navega pelo site, se inscreve para receber atualizacoes ou usa recursos opcionais como comentarios.`,
      publishChecklist: {
        items: [
          'Revise periodicamente os dados de contato e a informacao sobre lei aplicavel.',
          'Mantenha esta pagina alinhada aos provedores realmente ativos em producao.',
          'Atualize a politica se newsletter, comentarios ou analytics mudarem de forma relevante.',
          'Revise consentimento e retencao quando o site passar a atender novas regioes ou novos fluxos de dados.',
        ],
        title: 'Checklist de publicacao',
      },
      retention: {
        body: () =>
          'Dados pessoais sao mantidos apenas pelo tempo razoavelmente necessario para o recurso relacionado, uma obrigacao legal ou uma necessidade operacional. O operador aplica salvaguardas tecnicas razoaveis, mas nenhum servico conectado a internet consegue garantir seguranca absoluta.',
        title: 'Retencao e seguranca',
      },
      templateNoteLabel: 'Antes de publicar.',
      thirdPartyServices: {
        body: () =>
          'Este site pode usar Cloudflare para hospedagem e entrega, Microsoft Clarity para analytics e session replay e Giscus/GitHub para comentarios quando comentarios estiverem habilitados. Esses provedores podem receber dados tecnicos e de uso necessarios para prestar seus servicos.',
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
          'Voce pode pedir informacoes sobre dados pessoais enviados diretamente ao site e solicitar correcao ou exclusao quando isso for aplicavel. Para pedidos ligados a dados enviados por voce, use o canal de contato informado nesta pagina.',
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
