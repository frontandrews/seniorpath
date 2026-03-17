import {
  deckManifestSchema,
  deckSchema,
  type Deck,
  type DeckManifest,
  type DeckManifestEntry,
} from '@prepdeck/schemas'

import manifestRaw from './data/decks/index.json'
import codingArraysHashmapsBasicsRaw from './data/decks/coding-interview/coding-arrays-hashmaps-basics.json'
import codingStacksQueuesBinarySearchRaw from './data/decks/coding-interview/coding-stacks-queues-binary-search.json'
import codingTwoPointersSlidingWindowRaw from './data/decks/coding-interview/coding-two-pointers-sliding-window.json'
import javascriptRuntimeCoreRaw from './data/decks/javascript/javascript-runtime-core.json'
import leadershipOwnershipCoreRaw from './data/decks/leadership/leadership-ownership-core.json'
import nodeRuntimeCoreRaw from './data/decks/node/node-runtime-core.json'
import reactRenderingCoreRaw from './data/decks/react/react-rendering-core.json'
import systemDesignCoreTradeoffsRaw from './data/decks/system-design/system-design-core-tradeoffs.json'

const manifest = deckManifestSchema.parse(manifestRaw)

const rawDecks = {
  'coding-arrays-hashmaps-basics': codingArraysHashmapsBasicsRaw,
  'coding-stacks-queues-binary-search': codingStacksQueuesBinarySearchRaw,
  'coding-two-pointers-sliding-window': codingTwoPointersSlidingWindowRaw,
  'javascript-runtime-core': javascriptRuntimeCoreRaw,
  'leadership-ownership-core': leadershipOwnershipCoreRaw,
  'node-runtime-core': nodeRuntimeCoreRaw,
  'react-rendering-core': reactRenderingCoreRaw,
  'system-design-core-tradeoffs': systemDesignCoreTradeoffsRaw,
} as const

const parsedDeckEntries = Object.entries(rawDecks).map(([deckId, rawDeck]) => {
  const deck = deckSchema.parse(rawDeck)

  if (deck.id !== deckId) {
    throw new Error(`Deck id mismatch for ${deckId}`)
  }

  return [deckId, deck] as const
})

const decksById = Object.fromEntries(parsedDeckEntries) as Record<string, Deck>

for (const summary of manifest.decks) {
  if (!decksById[summary.id]) {
    throw new Error(`Deck ${summary.id} is listed in manifest but missing from registry`)
  }
}

for (const deckId of Object.keys(decksById)) {
  if (!manifest.decks.some((summary) => summary.id === deckId)) {
    throw new Error(`Deck ${deckId} exists in registry but is missing from manifest`)
  }
}

export function getDeckManifest(): DeckManifest {
  return manifest
}

export function getDeckSummaries(): DeckManifestEntry[] {
  return manifest.decks
}

export function getDeckById(deckId: string): Deck | undefined {
  return decksById[deckId]
}

export function getAllDecks(): Deck[] {
  return manifest.decks
    .map((summary) => decksById[summary.id])
    .filter((deck): deck is Deck => Boolean(deck))
}

export function getDecksByTopic(): Record<string, DeckManifestEntry[]> {
  return manifest.decks.reduce<Record<string, DeckManifestEntry[]>>((acc, summary) => {
    if (!acc[summary.topic]) {
      acc[summary.topic] = []
    }

    acc[summary.topic].push(summary)
    return acc
  }, {})
}
