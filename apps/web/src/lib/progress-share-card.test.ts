import { getDeckManifest } from '@prepdeck/content'

import { createEmptyProgressStore, setCardNote, setCardStatus } from '@/lib/progress'
import {
  buildProgressShareSnapshot,
  createProgressShareCardSvg,
  getProgressShareCardFilename,
} from '@/lib/progress-share-card'

describe('progress share card', () => {
  it('builds snapshot values from local progress', () => {
    let store = createEmptyProgressStore()
    store = setCardStatus(store, 'react-rendering-core', 'react-derived-state-danger', 'learned')
    store = setCardStatus(store, 'react-rendering-core', 'react-context-performance', 'partial')
    store = setCardNote(
      store,
      'react-rendering-core',
      'react-derived-state-danger',
      'Lead with source of truth',
    )

    const snapshot = buildProgressShareSnapshot(
      store,
      getDeckManifest().decks,
      new Date('2026-03-17T10:00:00.000Z'),
    )

    expect(snapshot.generatedOn).toBe('2026-03-17')
    expect(snapshot.cardsLearned).toBe(1)
    expect(snapshot.reviewDebt).toBe(1)
    expect(snapshot.savedNotes).toBe(1)
    expect(snapshot.strongestTopic).toBe('React')
  })

  it('renders escaped text into the SVG card', () => {
    const svg = createProgressShareCardSvg({
      cardsLearned: 6,
      cardsSeen: 10,
      decksCompleted: 2,
      generatedOn: '2026-03-17',
      reviewDebt: 4,
      savedNotes: 3,
      startedDecks: 5,
      strongestTopic: 'React & State',
      totalCards: 16,
      totalDecks: 8,
      weakestTopic: 'Node <Runtime>',
    })

    expect(svg).toContain('React &amp; State')
    expect(svg).toContain('Node &lt;Runtime&gt;')
    expect(svg).toContain('Progress snapshot')
    expect(svg).toContain('cards seen so far')
  })

  it('creates a stable download filename', () => {
    expect(getProgressShareCardFilename(new Date('2026-03-17T10:00:00.000Z'))).toBe(
      'prepdeck-progress-card-2026-03-17.svg',
    )
  })
})
