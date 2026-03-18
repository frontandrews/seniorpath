import type { Deck, ProgressStore, ProgressStatus } from '@seniorpath/schemas'

import { getCardNote, getCardStatus } from '@/lib/progress'
import { createStudyEntries, type StudyCardEntry } from '@/lib/study-session'

const DEFAULT_QUEUE_SIZE = 7

type CandidateEntry = StudyCardEntry & {
  difficultyRank: number
  hasNote: boolean
  status: ProgressStatus
  urgencyScore: number
}

export function getDailyQueueEntries(
  store: ProgressStore,
  decks: Deck[],
  queueSize = DEFAULT_QUEUE_SIZE,
): StudyCardEntry[] {
  const groupedEntries = decks
    .map((deck) =>
      createStudyEntries(deck)
        .map((entry) => toCandidateEntry(store, entry))
        .sort(compareCandidateEntries),
    )
    .filter((entries) => entries.length > 0)
    .sort((a, b) => compareCandidateEntries(a[0]!, b[0]!))

  const selectedEntries: CandidateEntry[] = []
  let round = 0

  while (selectedEntries.length < queueSize) {
    let didPickEntry = false

    for (const entries of groupedEntries) {
      const candidate = entries[round]

      if (!candidate) {
        continue
      }

      selectedEntries.push(candidate)
      didPickEntry = true

      if (selectedEntries.length >= queueSize) {
        break
      }
    }

    if (!didPickEntry) {
      break
    }

    round += 1
  }

  return selectedEntries.map((entry) => ({
    card: entry.card,
    deckId: entry.deckId,
    deckTitle: entry.deckTitle,
    topic: entry.topic,
  }))
}

function toCandidateEntry(store: ProgressStore, entry: StudyCardEntry): CandidateEntry {
  const status = getCardStatus(store, entry.deckId, entry.card.id)
  const hasNote = Boolean(getCardNote(store, entry.deckId, entry.card.id))

  return {
    ...entry,
    difficultyRank: getDifficultyRank(entry.card.difficulty),
    hasNote,
    status,
    urgencyScore: getUrgencyScore(status, hasNote),
  }
}

function compareCandidateEntries(a: CandidateEntry, b: CandidateEntry) {
  const urgencyDelta = b.urgencyScore - a.urgencyScore
  if (urgencyDelta !== 0) {
    return urgencyDelta
  }

  const difficultyDelta = b.difficultyRank - a.difficultyRank
  if (difficultyDelta !== 0) {
    return difficultyDelta
  }

  return a.deckTitle.localeCompare(b.deckTitle)
}

function getUrgencyScore(status: ProgressStatus, hasNote: boolean) {
  const noteBonus = hasNote ? 3 : 0

  if (status === 'not_learned') return 6 + noteBonus
  if (status === 'partial') return 5 + noteBonus
  if (status === 'unseen') return 3 + noteBonus
  return 1 + noteBonus
}

function getDifficultyRank(difficulty: Deck['difficulty']) {
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  return 2
}
