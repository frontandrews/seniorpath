import { getDeckById } from '@seniorpath/content'

import { createEmptyProgressStore, setCardStatus } from '@/lib/progress'
import {
  createDailyQueueHref,
  createMockInterviewHref,
  createStudyEntries,
  createStudyHref,
  getInterviewDurationSeconds,
  getStudyCards,
  getStudyEntries,
  getStudyFormat,
  getStudyFormatLabel,
  getStudyInitialIndex,
  getStudyScope,
  getStudyScopeLabel,
} from '@/lib/study-session'

function getReactDeck() {
  const deck = getDeckById('react-rendering-core')

  if (!deck) {
    throw new Error('react-rendering-core deck is required for tests')
  }

  return deck
}

describe('study session helpers', () => {
  it('defaults unknown query values to the full deck scope', () => {
    expect(getStudyScope(null)).toBe('all')
    expect(getStudyScope('random')).toBe('all')
    expect(getStudyScope('weak')).toBe('weak')
    expect(getStudyScopeLabel('weak')).toBe('Weak cards only')
    expect(getStudyFormat(null)).toBe('flashcards')
    expect(getStudyFormat('random')).toBe('flashcards')
    expect(getStudyFormat('interview')).toBe('interview')
    expect(getStudyFormatLabel('interview')).toBe('Interview mode')
  })

  it('filters weak study cards to partial and not learned only', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'learned')
    store = setCardStatus(store, deck.id, deck.cards[1].id, 'partial')

    const weakCards = getStudyCards(store, deck, 'weak')
    const weakEntries = getStudyEntries(store, deck, 'weak')

    expect(weakCards.map((card) => card.id)).toEqual([deck.cards[1].id])
    expect(weakEntries.map((entry) => entry.card.id)).toEqual([deck.cards[1].id])
  })

  it('uses first unseen for continue mode on full deck sessions', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'learned')

    expect(getStudyInitialIndex(store, deck, 'all', 'continue')).toBe(1)
    expect(getStudyInitialIndex(store, deck, 'weak', 'continue')).toBe(0)
  })

  it('builds interview study hrefs and per-card durations', () => {
    const deck = getReactDeck()
    const entries = createStudyEntries(deck)

    expect(createStudyHref(deck.id, { format: 'interview', mode: 'start' })).toBe(
      `/study/${deck.id}?mode=start&format=interview`,
    )
    expect(createDailyQueueHref()).toBe('/daily-queue')
    expect(createMockInterviewHref()).toBe('/mock-interview')
    expect(getInterviewDurationSeconds(deck.cards[0])).toBe(90)
    expect(entries[0]?.deckTitle).toBe(deck.title)
  })
})
