import { getAllDecks } from '@seniorpath/content'

import { getDailyQueueEntries } from '@/lib/daily-queue'
import { createEmptyProgressStore, setCardNote, setCardStatus } from '@/lib/progress'

describe('daily queue helpers', () => {
  it('builds a mixed queue before repeating decks', () => {
    const entries = getDailyQueueEntries(createEmptyProgressStore(), getAllDecks(), 6)

    expect(entries).toHaveLength(6)
    expect(new Set(entries.map((entry) => entry.deckId)).size).toBe(6)
  })

  it('prioritizes noted weak cards ahead of unseen cards', () => {
    let store = createEmptyProgressStore()
    store = setCardStatus(store, 'react-rendering-core', 'react-context-performance', 'partial')
    store = setCardNote(
      store,
      'react-rendering-core',
      'react-context-performance',
      'Talk about rerender boundaries first',
    )

    const entries = getDailyQueueEntries(store, getAllDecks(), 3)

    expect(entries[0]?.deckId).toBe('react-rendering-core')
    expect(entries[0]?.card.id).toBe('react-context-performance')
  })
})
