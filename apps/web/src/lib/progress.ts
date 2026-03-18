import type {
  Deck,
  DeckManifestEntry,
  ProgressStatus,
  ProgressStore,
  ProgressV1Store,
} from '@seniorpath/schemas'
import { progressV1StoreSchema, userDataStoreSchema } from '@seniorpath/schemas'

import { getBrowserStorageAdapter, type StorageAdapter } from '@/lib/storage-adapter'

export const PREVIOUS_STORAGE_KEY = 'seniorpath.progress.v1'
export const STORAGE_KEY = 'seniorpath.user-data.v1'

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
  storage: StorageAdapter | null = getBrowserStorageAdapter(),
): ProgressStore {
  if (!storage) {
    return createEmptyProgressStore()
  }

  const raw = storage.getItem(STORAGE_KEY)

  if (!raw) {
    return readPreviousProgressStore(storage)
  }

  try {
    return userDataStoreSchema.parse(JSON.parse(raw))
  } catch {
    return readPreviousProgressStore(storage)
  }
}

export function writeProgressStore(
  store: ProgressStore,
  storage: StorageAdapter | null = getBrowserStorageAdapter(),
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

export function getCardNote(
  store: ProgressStore,
  deckId: string,
  cardId: string,
): string {
  return store.decks[deckId]?.notes[cardId] ?? ''
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
        notes: existing?.notes ?? {},
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
        notes: existing?.notes ?? {},
      },
    },
  }
}

export function setCardNote(
  store: ProgressStore,
  deckId: string,
  cardId: string,
  note: string,
): ProgressStore {
  const existing = store.decks[deckId]
  const trimmedNote = note.trim()
  const nextNotes = { ...(existing?.notes ?? {}) }

  if (trimmedNote) {
    nextNotes[cardId] = trimmedNote
  } else {
    delete nextNotes[cardId]
  }

  return {
    ...store,
    decks: {
      ...store.decks,
      [deckId]: {
        lastCardId: cardId,
        lastStudiedAt: new Date().toISOString(),
        cards: existing?.cards ?? {},
        notes: nextNotes,
      },
    },
  }
}

export function clearCardNote(
  store: ProgressStore,
  deckId: string,
  cardId: string,
): ProgressStore {
  return setCardNote(store, deckId, cardId, '')
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

export function getDeckCountsFromSummary(
  store: ProgressStore,
  summary: Pick<DeckManifestEntry, 'cardCount' | 'id'>,
): DeckCounts {
  const storedStatuses = Object.values(store.decks[summary.id]?.cards ?? {})
  const learned = storedStatuses.filter((status) => status === 'learned').length
  const partial = storedStatuses.filter((status) => status === 'partial').length
  const notLearned = storedStatuses.filter((status) => status === 'not_learned').length
  const seen = Math.min(summary.cardCount, learned + partial + notLearned)
  const unseen = Math.max(0, summary.cardCount - seen)

  return {
    allLearned: summary.cardCount > 0 && learned === summary.cardCount,
    allSeen: summary.cardCount > 0 && seen === summary.cardCount,
    learned,
    notLearned,
    partial,
    seen,
    total: summary.cardCount,
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

function migrateProgressV1Store(progressV1Store: ProgressV1Store): ProgressStore {
  return {
    version: 1,
    decks: Object.fromEntries(
      Object.entries(progressV1Store.decks).map(([deckId, deckProgress]) => [
        deckId,
        {
          lastCardId: deckProgress.lastCardId,
          lastStudiedAt: deckProgress.lastStudiedAt,
          cards: deckProgress.cards,
          notes: {},
        },
      ]),
    ),
  }
}

function readPreviousProgressStore(storage: StorageAdapter): ProgressStore {
  const progressV1Raw = storage.getItem(PREVIOUS_STORAGE_KEY)

  if (!progressV1Raw) {
    return createEmptyProgressStore()
  }

  try {
    const progressV1Store = progressV1StoreSchema.parse(JSON.parse(progressV1Raw))
    const migratedStore = migrateProgressV1Store(progressV1Store)

    storage.setItem(STORAGE_KEY, JSON.stringify(migratedStore))
    storage.removeItem(PREVIOUS_STORAGE_KEY)

    return migratedStore
  } catch {
    return createEmptyProgressStore()
  }
}
