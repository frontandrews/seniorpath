import type { Deck, ProgressStatus, ProgressStore } from '@prepdeck/schemas'
import { progressStoreSchema } from '@prepdeck/schemas'

export const STORAGE_KEY = 'prepdeck.progress.v1'

export type DeckCounts = {
  allLearned: boolean
  allSeen: boolean
  learned: number
  notLearned: number
  partial: number
  seen: number
  total: number
  unseen: number
}

export function combineDeckCounts(countsList: DeckCounts[]): DeckCounts {
  const combined = countsList.reduce(
    (acc, counts) => ({
      learned: acc.learned + counts.learned,
      notLearned: acc.notLearned + counts.notLearned,
      partial: acc.partial + counts.partial,
      seen: acc.seen + counts.seen,
      total: acc.total + counts.total,
      unseen: acc.unseen + counts.unseen,
    }),
    {
      learned: 0,
      notLearned: 0,
      partial: 0,
      seen: 0,
      total: 0,
      unseen: 0,
    },
  )

  return {
    ...combined,
    allLearned: combined.total > 0 && combined.learned === combined.total,
    allSeen: combined.total > 0 && combined.seen === combined.total,
  }
}

const DEFAULT_STORE: ProgressStore = {
  version: 1,
  decks: {},
}

export function createEmptyProgressStore(): ProgressStore {
  return structuredClone(DEFAULT_STORE)
}

export function readProgressStore(
  storage: Pick<Storage, 'getItem'> | null = globalThis.localStorage ?? null,
): ProgressStore {
  if (!storage) {
    return createEmptyProgressStore()
  }

  const raw = storage.getItem(STORAGE_KEY)

  if (!raw) {
    return createEmptyProgressStore()
  }

  try {
    return progressStoreSchema.parse(JSON.parse(raw))
  } catch {
    return createEmptyProgressStore()
  }
}

export function writeProgressStore(
  store: ProgressStore,
  storage: Pick<Storage, 'setItem'> | null = globalThis.localStorage ?? null,
): void {
  if (!storage) {
    return
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getCardStatus(
  store: ProgressStore,
  deckId: string,
  cardId: string,
): ProgressStatus {
  return store.decks[deckId]?.cards[cardId] ?? 'unseen'
}

export function rememberDeckPosition(
  store: ProgressStore,
  deckId: string,
  cardId: string | null,
): ProgressStore {
  const existing = store.decks[deckId]

  return {
    ...store,
    decks: {
      ...store.decks,
      [deckId]: {
        lastCardId: cardId,
        lastStudiedAt: new Date().toISOString(),
        cards: existing?.cards ?? {},
      },
    },
  }
}

export function setCardStatus(
  store: ProgressStore,
  deckId: string,
  cardId: string,
  status: ProgressStatus,
): ProgressStore {
  const existing = store.decks[deckId]

  return {
    ...store,
    decks: {
      ...store.decks,
      [deckId]: {
        lastCardId: cardId,
        lastStudiedAt: new Date().toISOString(),
        cards: {
          ...(existing?.cards ?? {}),
          [cardId]: status,
        },
      },
    },
  }
}

export function resetDeck(store: ProgressStore, deckId: string): ProgressStore {
  const nextDecks = { ...store.decks }
  delete nextDecks[deckId]

  return {
    ...store,
    decks: nextDecks,
  }
}

export function resetAllProgress(): ProgressStore {
  return createEmptyProgressStore()
}

export function getDeckCounts(store: ProgressStore, deck: Deck): DeckCounts {
  let learned = 0
  let notLearned = 0
  let partial = 0
  let unseen = 0

  for (const card of deck.cards) {
    const status = getCardStatus(store, deck.id, card.id)

    if (status === 'learned') learned += 1
    if (status === 'partial') partial += 1
    if (status === 'not_learned') notLearned += 1
    if (status === 'unseen') unseen += 1
  }

  const total = deck.cards.length
  const seen = total - unseen

  return {
    allLearned: learned === total,
    allSeen: seen === total,
    learned,
    notLearned,
    partial,
    seen,
    total,
    unseen,
  }
}

export function getFirstUnseenCardIndex(store: ProgressStore, deck: Deck): number | null {
  const index = deck.cards.findIndex((card) => getCardStatus(store, deck.id, card.id) === 'unseen')
  return index === -1 ? null : index
}

export function getMostRecentlyStudiedDeckId(store: ProgressStore): string | null {
  const sortedDecks = Object.entries(store.decks)
    .filter(([, progress]) => Boolean(progress.lastStudiedAt))
    .sort(([, a], [, b]) => {
      const aTime = a.lastStudiedAt ? Date.parse(a.lastStudiedAt) : 0
      const bTime = b.lastStudiedAt ? Date.parse(b.lastStudiedAt) : 0
      return bTime - aTime
    })

  return sortedDecks[0]?.[0] ?? null
}

export function setLearnedToUnseen(
  store: ProgressStore,
  deckId: string,
  cardId: string,
): ProgressStore {
  if (getCardStatus(store, deckId, cardId) !== 'learned') {
    return store
  }

  return setCardStatus(store, deckId, cardId, 'unseen')
}
