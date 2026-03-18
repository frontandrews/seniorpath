import type { ProgressStore } from '@seniorpath/schemas'

type DeckCountsLike = {
  allLearned: boolean
  learned: number
  notLearned: number
  partial: number
  seen: number
  total: number
}

type DeckRecordLike = {
  counts: DeckCountsLike
  summary: {
    topic: string
  }
}

type TopicMastery = {
  deckCount: number
  learned: number
  reviewDebt: number
  seen: number
  topic: string
  total: number
}

export type MasterySnapshot = {
  decksCompleted: number
  reviewDebt: number
  savedNotes: number
  startedDecks: number
  strongestTopic: TopicMastery | null
  weakestTopic: TopicMastery | null
}

export function getMasterySnapshot(
  records: DeckRecordLike[],
  store: ProgressStore,
): MasterySnapshot {
  const topicMap = new Map<string, TopicMastery>()

  for (const record of records) {
    const existing = topicMap.get(record.summary.topic)

    if (existing) {
      existing.deckCount += 1
      existing.learned += record.counts.learned
      existing.reviewDebt += record.counts.partial + record.counts.notLearned
      existing.seen += record.counts.seen
      existing.total += record.counts.total
      continue
    }

    topicMap.set(record.summary.topic, {
      deckCount: 1,
      learned: record.counts.learned,
      reviewDebt: record.counts.partial + record.counts.notLearned,
      seen: record.counts.seen,
      topic: record.summary.topic,
      total: record.counts.total,
    })
  }

  const topicMastery = [...topicMap.values()]
  const strongestTopic = getStrongestTopic(topicMastery)
  const weakestTopic = getWeakestTopic(topicMastery)

  return {
    decksCompleted: records.filter((record) => record.counts.allLearned).length,
    reviewDebt: records.reduce(
      (total, record) => total + record.counts.partial + record.counts.notLearned,
      0,
    ),
    savedNotes: Object.values(store.decks).reduce(
      (total, deckData) => total + Object.keys(deckData.notes).length,
      0,
    ),
    startedDecks: records.filter((record) => record.counts.seen > 0).length,
    strongestTopic,
    weakestTopic,
  }
}

export function getMasteryPercent(topic: Pick<TopicMastery, 'learned' | 'total'>): number {
  if (topic.total === 0) {
    return 0
  }

  return Math.round((topic.learned / topic.total) * 100)
}

function getStrongestTopic(topics: TopicMastery[]): TopicMastery | null {
  return (
    [...topics]
      .filter((topic) => topic.learned > 0)
      .sort((a, b) => {
        const masteryDelta = getMasteryPercent(b) - getMasteryPercent(a)
        if (masteryDelta !== 0) {
          return masteryDelta
        }

        if (a.learned !== b.learned) {
          return b.learned - a.learned
        }

        return b.seen - a.seen
      })[0] ?? null
  )
}

function getWeakestTopic(topics: TopicMastery[]): TopicMastery | null {
  return (
    [...topics]
      .filter((topic) => topic.reviewDebt > 0)
      .sort((a, b) => {
        if (a.reviewDebt !== b.reviewDebt) {
          return b.reviewDebt - a.reviewDebt
        }

        return getMasteryPercent(a) - getMasteryPercent(b)
      })[0] ?? null
  )
}
