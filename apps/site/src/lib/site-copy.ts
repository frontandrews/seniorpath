export type SiteLocale = 'en' | 'pt-br'

type SiteCopy = {
  article: {
    completed: string
    confirmBody: string
    confirmCancel: string
    confirmConfirm: string
    confirmTitle: string
    markCompleted: string
    nextReads: string
    practice: string
    practiceChecklist: string
    practiceChecklistTitle: string
    practiceInApp: string
    practiceInAppTitle: string
    quickSummary: string
    quickSummaryTitle: string
    updatedPrefix: string
  }
  footer: {
    description: string
    home: string
    learn: string
    privacy: string
    practice: string
    rights: string
    terms: string
    title: string
  }
  guideIndex: {
    comingSoon: string
    copy: string
    filterLabel: string
    title: string
  }
  header: {
    brand: string
  }
  learn: string
  layout: {
    home: string
    practice: string
    themeToggle: string
  }
}

const siteCopy: Record<SiteLocale, SiteCopy> = {
  en: {
    article: {
      completed: 'Completed',
      confirmBody:
        'When you mark this as complete, it will stop showing up in suggestions. You can still practice the topic later. Do you want to continue?',
      confirmCancel: 'Cancel',
      confirmConfirm: 'Yes, continue',
      confirmTitle: 'Mark this guide as completed?',
      markCompleted: 'Mark as completed',
      nextReads: 'Next reads',
      practice: 'Practice',
      practiceChecklist: 'Practice checklist',
      practiceChecklistTitle: 'Use this when you answer',
      practiceInApp: 'Practice in the app',
      practiceInAppTitle: 'Turn this idea into reps',
      quickSummary: 'Quick summary',
      quickSummaryTitle: 'What to keep in your head',
      updatedPrefix: 'Updated',
    },
    footer: {
      description: 'Clear guides for people who want to understand better, not just decorate answers.',
      home: 'Home',
      learn: 'Path to Senior',
      privacy: 'Privacy policy',
      practice: 'Practice',
      rights: 'All rights reserved.',
      terms: 'Terms and conditions',
      title: 'SeniorPath',
    },
    header: {
      brand: 'SeniorPath',
    },
    guideIndex: {
      comingSoon: 'Coming soon',
      copy: 'Direct explanations so you can actually understand the idea, without extra jargon.',
      filterLabel: 'Pick a topic',
      title: 'Learn without the fluff',
    },
    learn: 'Learn',
    layout: {
      home: 'Home',
      practice: 'Practice',
      themeToggle: 'Toggle theme',
    },
  },
  'pt-br': {
    article: {
      completed: 'Concluido',
      confirmBody:
        'Quando voce marcar este guia como concluido, ele para de aparecer nas sugestoes. Ainda sera possivel praticar o tema depois. Quer continuar?',
      confirmCancel: 'Cancelar',
      confirmConfirm: 'Sim, continuar',
      confirmTitle: 'Marcar este guia como concluido?',
      markCompleted: 'Marcar como concluido',
      nextReads: 'Proximas leituras',
      practice: 'Praticar',
      practiceChecklist: 'Checklist de pratica',
      practiceChecklistTitle: 'Use isto ao responder',
      practiceInApp: 'Pratique no app',
      practiceInAppTitle: 'Transforme esta ideia em repeticoes',
      quickSummary: 'Resumo rapido',
      quickSummaryTitle: 'O que vale manter na cabeca',
      updatedPrefix: 'Atualizado',
    },
    footer: {
      description: 'Guias claros para pessoas que querem entender, não apenas decorar respostas.',
      home: 'Inicio',
      learn: 'Caminho para Senior',
      privacy: 'Politica de privacidade',
      practice: 'Praticar',
      rights: 'Todos os direitos reservados.',
      terms: 'Termos e condicoes',
      title: 'SeniorPath',
    },
    header: {
      brand: 'SeniorPath',
    },
    guideIndex: {
      comingSoon: 'Em breve',
      copy: 'Explicacoes diretas para entender de verdade, sem jargao desnecessario.',
      filterLabel: 'Escolha um tema',
      title: 'Aprenda sem enrolação',
    },
    learn: 'Aprender',
    layout: {
      home: 'Inicio',
      practice: 'Praticar',
      themeToggle: 'Alternar tema',
    },
  },
}

export function getSiteLocale(value?: string | null): SiteLocale {
  return value === 'pt-br' ? 'pt-br' : 'en'
}

export function getSiteCopy(value?: string | null) {
  return siteCopy[getSiteLocale(value)]
}
