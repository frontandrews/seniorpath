import type { Deck } from '@prepdeck/schemas'

import type { DeckLibraryRecord } from '@/lib/deck-library'
import { filterDeckLibraryRecords } from '@/lib/deck-library'

function createRecord(overrides: Partial<DeckLibraryRecord> & Pick<DeckLibraryRecord, 'deck' | 'summary'>): DeckLibraryRecord {
  return {
    counts: {
      allLearned: false,
      allSeen: false,
      learned: 0,
      notLearned: 0,
      partial: 0,
      seen: 0,
      total: 1,
      unseen: 1,
    },
    noteCount: 0,
    reviewDebt: 0,
    ...overrides,
  }
}

function createDeck(id: string, title: string, tags: string[]): Deck {
  return {
    cards: [
      {
        commonTraps: [],
        difficulty: 'medium',
        expectedAnswer: `${title} answer`,
        followUps: [],
        id: `${id}-card`,
        keyPoints: ['point'],
        question: `${title} question`,
        shortAnswer: `${title} short answer`,
        sourceRefs: [],
        tags,
        type: 'concept',
      },
    ],
    description: `${title} description`,
    difficulty: 'medium',
    estimatedMinutes: 8,
    id,
    tags,
    title,
    topic: 'react',
  }
}

describe('deck library filters', () => {
  const reactDeck = createDeck('react-core', 'React Core', ['react', 'hooks'])
  const nodeDeck = createDeck('node-core', 'Node Core', ['node', 'runtime'])

  const records: DeckLibraryRecord[] = [
    createRecord({
      counts: { allLearned: false, allSeen: false, learned: 0, notLearned: 0, partial: 1, seen: 1, total: 1, unseen: 0 },
      deck: reactDeck,
      noteCount: 1,
      reviewDebt: 1,
      summary: {
        difficulty: 'medium',
        estimatedMinutes: 8,
        id: 'react-core',
        path: '',
        title: 'React Core',
        topic: 'react',
      },
    }),
    createRecord({
      counts: { allLearned: false, allSeen: false, learned: 0, notLearned: 0, partial: 0, seen: 0, total: 1, unseen: 1 },
      deck: nodeDeck,
      noteCount: 0,
      reviewDebt: 0,
      summary: {
        difficulty: 'hard',
        estimatedMinutes: 10,
        id: 'node-core',
        path: '',
        title: 'Node Core',
        topic: 'node',
      },
    }),
  ]

  it('filters by search query across titles and tags', () => {
    const result = filterDeckLibraryRecords(records, {
      difficulty: 'all',
      query: 'runtime',
      selectedTopic: 'all',
      status: 'all',
    })

    expect(result.map((record) => record.summary.id)).toEqual(['node-core'])
  })

  it('filters by review debt and local notes', () => {
    const needsReview = filterDeckLibraryRecords(records, {
      difficulty: 'all',
      query: '',
      selectedTopic: 'all',
      status: 'needs_review',
    })

    const hasNotes = filterDeckLibraryRecords(records, {
      difficulty: 'all',
      query: '',
      selectedTopic: 'all',
      status: 'has_notes',
    })

    expect(needsReview.map((record) => record.summary.id)).toEqual(['react-core'])
    expect(hasNotes.map((record) => record.summary.id)).toEqual(['react-core'])
  })
})
