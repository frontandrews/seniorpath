import { getDeckById } from '@prepdeck/content'

import {
  combineDeckCounts,
  createEmptyProgressStore,
  getCardStatus,
  getDeckCounts,
  getFirstUnseenCardIndex,
  readProgressStore,
  rememberDeckPosition,
  resetAllProgress,
  resetDeck,
  setCardStatus,
  setLearnedToUnseen,
  writeProgressStore,
} from '@/lib/progress'

function getReactDeck() {
  const deck = getDeckById('react-rendering-core')

  if (!deck) {
    throw new Error('react-rendering-core deck is required for tests')
  }

  return deck
}

describe('progress store', () => {
  it('tracks status transitions and deck counts', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'learned')
    store = setCardStatus(store, deck.id, deck.cards[1].id, 'partial')

    expect(getCardStatus(store, deck.id, deck.cards[0].id)).toBe('learned')
    expect(getCardStatus(store, deck.id, deck.cards[1].id)).toBe('partial')
    expect(getFirstUnseenCardIndex(store, deck)).toBeNull()
    expect(getDeckCounts(store, deck)).toMatchObject({
      learned: 1,
      partial: 1,
      notLearned: 0,
      unseen: 0,
      allSeen: true,
      allLearned: false,
    })
  })

  it('combines deck counts for topic or global summaries', () => {
    const combined = combineDeckCounts([
      {
        allLearned: false,
        allSeen: false,
        learned: 1,
        notLearned: 0,
        partial: 1,
        seen: 2,
        total: 3,
        unseen: 1,
      },
      {
        allLearned: false,
        allSeen: true,
        learned: 2,
        notLearned: 1,
        partial: 0,
        seen: 3,
        total: 3,
        unseen: 0,
      },
    ])

    expect(combined).toMatchObject({
      learned: 3,
      partial: 1,
      notLearned: 1,
      seen: 5,
      total: 6,
      unseen: 1,
      allSeen: false,
      allLearned: false,
    })
  })

  it('can unmark learned cards back to unseen', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'learned')
    store = setLearnedToUnseen(store, deck.id, deck.cards[0].id)

    expect(getCardStatus(store, deck.id, deck.cards[0].id)).toBe('unseen')
    expect(getFirstUnseenCardIndex(store, deck)).toBe(0)
  })

  it('persists and restores progress from storage', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'not_learned')
    store = rememberDeckPosition(store, deck.id, deck.cards[1].id)

    writeProgressStore(store, window.localStorage)

    expect(readProgressStore(window.localStorage)).toEqual(store)
  })

  it('resets one deck or the whole store', () => {
    const deck = getReactDeck()
    let store = createEmptyProgressStore()

    store = setCardStatus(store, deck.id, deck.cards[0].id, 'learned')

    const resetDeckStore = resetDeck(store, deck.id)
    expect(resetDeckStore.decks[deck.id]).toBeUndefined()

    const resetAllStore = resetAllProgress()
    expect(resetAllStore).toEqual(createEmptyProgressStore())
  })
})
