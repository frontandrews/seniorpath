import { getDeckManifest } from '@prepdeck/content'

import {
  createEmptyProgressStore,
  getDeckCountsFromSummary,
  setCardNote,
  setCardStatus,
} from '@/lib/progress'
import { getMasteryPercent, getMasterySnapshot } from '@/lib/mastery'

function createDeckRecords(store = createEmptyProgressStore()) {
  const manifest = getDeckManifest()

  return manifest.decks.map((summary) => ({
    counts: getDeckCountsFromSummary(store, summary),
    summary,
  }))
}

describe('mastery helpers', () => {
  it('builds a snapshot with topic signals and local notes', () => {
    let store = createEmptyProgressStore()
    store = setCardStatus(store, 'react-rendering-core', 'react-derived-state-danger', 'learned')
    store = setCardStatus(store, 'react-rendering-core', 'react-context-performance', 'partial')
    store = setCardStatus(
      store,
      'javascript-runtime-core',
      'javascript-microtask-vs-macrotask',
      'not_learned',
    )
    store = setCardNote(store, 'react-rendering-core', 'react-derived-state-danger', 'Use sync risk example')

    const snapshot = getMasterySnapshot(createDeckRecords(store), store)

    expect(snapshot.strongestTopic?.topic).toBe('react')
    expect(snapshot.weakestTopic?.topic).toBe('javascript')
    expect(snapshot.savedNotes).toBe(1)
    expect(snapshot.reviewDebt).toBe(2)
    expect(snapshot.startedDecks).toBe(2)
  })

  it('returns 0 mastery percent for empty topics', () => {
    expect(getMasteryPercent({ learned: 0, total: 0 })).toBe(0)
  })
})
