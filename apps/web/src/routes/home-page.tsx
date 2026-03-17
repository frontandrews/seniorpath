import { getDeckById, getDecksByTopic } from '@prepdeck/content'
import { useState } from 'react'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { DeckCard } from '@/components/deck-card'
import { Button } from '@/components/ui/button'
import { ProgressMeter } from '@/components/ui/progress-meter'
import { Panel } from '@/components/ui/panel'
import { combineDeckCounts, getDeckCounts } from '@/lib/progress'
import { getTopicLabel } from '@/lib/topic-labels'
import { useProgress } from '@/state/progress-context'

export function HomePage() {
  const { progressStore, resetAllProgress } = useProgress()
  const [isResetAllOpen, setIsResetAllOpen] = useState(false)
  const decksByTopic = getDecksByTopic()
  const allDeckCounts = Object.values(decksByTopic)
    .flat()
    .map((summary) => {
      const deck = getDeckById(summary.id)
      return deck ? getDeckCounts(progressStore, deck) : null
    })
    .filter((counts): counts is NonNullable<typeof counts> => Boolean(counts))
  const overallCounts = combineDeckCounts(allDeckCounts)

  return (
    <>
      <Panel className="mb-5 flex flex-col gap-3 bg-[var(--retro-surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm leading-6 text-white/80">
          Track what you truly know, keep momentum on a phone-sized screen, and come
          back later without losing your place.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryStat label="Learned" value={`${overallCounts.learned}`} />
            <SummaryStat label="Seen" value={`${overallCounts.seen}/${overallCounts.total}`} />
            <SummaryStat label="Need review" value={`${overallCounts.partial + overallCounts.notLearned}`} />
          </div>
        </div>
        <Button onClick={() => setIsResetAllOpen(true)} type="button" variant="danger">
          Reset all progress
        </Button>
      </Panel>

      <div className="space-y-8">
        {Object.entries(decksByTopic).map(([topic, summaries]) => (
          <section key={topic}>
            <TopicSummary
              progressStore={progressStore}
              summaries={summaries}
              title={getTopicLabel(topic)}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {summaries.map((summary) => {
                const deck = getDeckById(summary.id)

                if (!deck) {
                  return null
                }

                const counts = getDeckCounts(progressStore, deck)

                return (
                  <DeckCard
                    detailHref={`/decks/${summary.id}`}
                    key={summary.id}
                    learnedCount={counts.learned}
                    summary={summary}
                    totalCards={counts.total}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <ConfirmDialog
        confirmLabel="Reset all"
        description="This clears every learned, partial, and not-learned status across all decks."
        isOpen={isResetAllOpen}
        onCancel={() => setIsResetAllOpen(false)}
        onConfirm={() => {
          resetAllProgress()
          setIsResetAllOpen(false)
        }}
        title="Reset all progress?"
      />
    </>
  )
}

function TopicSummary({
  progressStore,
  summaries,
  title,
}: {
  progressStore: ReturnType<typeof useProgress>['progressStore']
  summaries: ReturnType<typeof getDecksByTopic>[string]
  title: string
}) {
  const counts = combineDeckCounts(
    summaries
      .map((summary) => {
        const deck = getDeckById(summary.id)
        return deck ? getDeckCounts(progressStore, deck) : null
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
  )

  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[var(--retro-ink)]">{title}</h2>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--retro-ink-soft)]">
            {counts.learned} learned · {counts.partial + counts.notLearned} need review
          </p>
        </div>
        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--retro-line)]">
          {summaries.length} decks
        </span>
      </div>
      <ProgressMeter current={counts.learned} total={counts.total} />
    </div>
  )
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <Panel className="bg-[var(--retro-surface-muted)] p-3" inset>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-ink-soft)]">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-[var(--retro-ink)]">{value}</p>
    </Panel>
  )
}
