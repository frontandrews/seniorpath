import type { DeckManifestEntry } from '@prepdeck/schemas'
import { getDecksByTrack } from '@prepdeck/content/manifest'
import { useMemo, useState } from 'react'

import { AdSlot } from '@/components/ad-slot'
import { DeckCard } from '@/components/deck-card'
import { FirstRunPanel } from '@/components/first-run-panel'
import { InstallAppPanel } from '@/components/install-app-panel'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import {
  filterDeckLibraryRecords,
  type DeckLibraryFilters,
  type DeckLibraryRecord,
} from '@/lib/deck-library'
import { getMasterySnapshot } from '@/lib/mastery'
import {
  getDeckCountsFromSummary,
} from '@/lib/progress'
import { getSessionHistorySnapshot } from '@/lib/session-history'
import { getSessionPresets, type SessionPreset } from '@/lib/session-presets'
import { getStudyGoalsSnapshot } from '@/lib/study-goals'
import { getTrackLabel } from '@/lib/track-labels'
import { usePreferences } from '@/state/preferences-context'
import { useProgress } from '@/state/progress-context'

export function HomePage() {
  const { progressStore, sessionHistoryStore } = useProgress()
  const { preferences } = usePreferences()
  const [libraryDifficulty, setLibraryDifficulty] =
    useState<DeckLibraryFilters['difficulty']>('all')
  const [libraryQuery, setLibraryQuery] = useState('')
  const [libraryStatus, setLibraryStatus] = useState<DeckLibraryFilters['status']>('all')
  const [selectedTrack, setSelectedTrack] = useState<'all' | string>('all')
  const decksByTrack = getDecksByTrack()
  const trackEntries = Object.entries(decksByTrack)

  const deckRecords = useMemo(
    () =>
      trackEntries
        .flatMap(([, summaries]) =>
          summaries.map((summary) => {
            const counts = getDeckCountsFromSummary(progressStore, summary)

            return {
              counts,
              noteCount: Object.keys(progressStore.decks[summary.id]?.notes ?? {}).length,
              reviewDebt: counts.partial + counts.notLearned,
              summary,
            }
          }),
        )
        .filter((record): record is DeckLibraryRecord => record !== null),
    [progressStore, trackEntries],
  )

  const visibleDeckRecords = filterDeckLibraryRecords(deckRecords, {
    difficulty: libraryDifficulty,
    query: libraryQuery,
    selectedTrack,
    status: libraryStatus,
  })
  const sessionPresets = getSessionPresets(deckRecords)
  const masterySnapshot = getMasterySnapshot(deckRecords, progressStore)
  const sessionHistorySnapshot = getSessionHistorySnapshot(sessionHistoryStore)
  const goalsSnapshot = getStudyGoalsSnapshot(sessionHistorySnapshot, {
    daily: preferences.dailyGoalTarget,
    weekly: preferences.weeklyGoalTarget,
  })
  const isFirstRun =
    deckRecords.every((record) => record.counts.seen === 0) &&
    sessionHistorySnapshot.totalSessions === 0 &&
    masterySnapshot.savedNotes === 0
  const starterDecks = getStarterDeckRecords(deckRecords, 3).map((record) => record.summary)

  return (
    <>
      <section aria-labelledby="deck-library-region-heading" className="mb-6">
        <Panel className="mb-4 p-4 sm:p-5">
          <p
            className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]"
            id="deck-library-region-heading"
          >
            Deck library
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--retro-ink)] sm:text-4xl">
            Path to Senior
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
            Learn the intuition first. Practice when you want to prove it.
          </p>
        </Panel>

        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-[var(--retro-ink)]">
              Deck library
            </h2>
            <p className="mt-1 text-sm leading-6 text-white/75">
              {selectedTrack === 'all'
                ? `Showing all ${visibleDeckRecords.length} decks.`
                : `Showing ${visibleDeckRecords.length} deck${visibleDeckRecords.length === 1 ? '' : 's'} in ${getTrackLabel(selectedTrack)}.`}
            </p>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <Button
              onClick={() => setSelectedTrack('all')}
              size="sm"
              type="button"
              variant={selectedTrack === 'all' ? 'primary' : 'ghost'}
            >
              All areas
            </Button>
            {trackEntries.map(([track, summaries]) => (
              <Button
                key={track}
                onClick={() => setSelectedTrack(track)}
                size="sm"
                type="button"
                variant={selectedTrack === track ? 'primary' : 'ghost'}
              >
                {getTrackLabel(track)} ({summaries.length})
              </Button>
            ))}
          </div>
        </div>

        <Panel className="mb-4 p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <label
                className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]"
                htmlFor="deck-library-search"
              >
                Search decks
              </label>
              <input
                className="mt-3 min-h-12 w-full rounded-[0.95rem] border-2 border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.04)] px-4 text-sm text-[var(--retro-ink)] outline-none transition placeholder:text-white/40 focus:border-[var(--retro-line-strong)]"
                id="deck-library-search"
                onChange={(event) => setLibraryQuery(event.target.value)}
                placeholder="React, RAG, standups, delivery, ownership..."
                type="text"
                value={libraryQuery}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
                  Difficulty
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => setLibraryDifficulty(difficulty)}
                      size="sm"
                      type="button"
                      variant={libraryDifficulty === difficulty ? 'primary' : 'ghost'}
                    >
                      {difficulty === 'all' ? 'All' : difficulty}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
                  Status
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    ['all', 'All'],
                    ['needs_review', 'Needs review'],
                    ['has_notes', 'Has notes'],
                    ['started', 'Started'],
                  ].map(([status, label]) => (
                    <Button
                      key={status}
                      onClick={() => setLibraryStatus(status as DeckLibraryFilters['status'])}
                      size="sm"
                      type="button"
                      variant={libraryStatus === status ? 'primary' : 'ghost'}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {isFirstRun ? <FirstRunPanel starterDecks={starterDecks} /> : null}
        <InstallAppPanel />
        <AdSlot placement="home-primary" />

        {visibleDeckRecords.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleDeckRecords.map((record) => (
              <DeckCard
                detailHref={`/decks/${record.summary.id}`}
                key={record.summary.id}
                learnedCount={record.counts.learned}
                noteCount={record.noteCount}
                reviewDebt={record.reviewDebt}
                summary={record.summary}
                totalCards={record.counts.total}
              />
            ))}
          </div>
        ) : (
          <Panel className="p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
              No match
            </p>
            <h3 className="mt-3 text-2xl font-black text-[var(--retro-ink)]">
              No decks match the current library filters.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Clear the search or filter chips to reopen the full deck library.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setLibraryDifficulty('all')
                  setLibraryQuery('')
                  setLibraryStatus('all')
                  setSelectedTrack('all')
                }}
                type="button"
                variant="secondary"
              >
                Clear library filters
              </Button>
            </div>
          </Panel>
        )}
      </section>

      <section aria-labelledby="session-presets-heading" className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-[var(--retro-ink)]" id="session-presets-heading">
            Practice presets
          </h2>
          <LinkButton to="/progress" variant="ghost">
            Progress
          </LinkButton>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sessionPresets.map((preset) => (
            <SessionPresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      </section>

      <section aria-labelledby="progress-hub-heading" className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-[var(--retro-ink)]" id="progress-hub-heading">
            Progress
          </h2>
          <LinkButton to={goalsSnapshot.nextAction.href} variant="ghost">
            {goalsSnapshot.nextAction.label}
          </LinkButton>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <HubSignalCard label="Current streak" value={getStreakLabel(sessionHistorySnapshot.currentStreak)} />
          <HubSignalCard label="This week" value={`${sessionHistorySnapshot.sessionsThisWeek} sessions`} />
          <HubSignalCard label="Review debt" value={`${masterySnapshot.reviewDebt} cards`} />
        </div>
      </section>

    </>
  )
}

function SessionPresetCard({ preset }: { preset: SessionPreset }) {
  return (
    <Panel className="flex h-full flex-col justify-between gap-4 p-4">
      <div>
        <h3 className="text-xl font-black text-[var(--retro-ink)]">{preset.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{preset.detail}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--retro-ink-soft)]">
          {preset.meta.join(' · ')}
        </p>
        <LinkButton to={preset.href} variant="secondary">
          {preset.label}
        </LinkButton>
      </div>
    </Panel>
  )
}

function HubSignalCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Panel className="h-full p-4">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-[var(--retro-ink)]">{value}</p>
    </Panel>
  )
}

function getStarterDeckRecords(
  records: DeckLibraryRecord[],
  limit: number,
  excludeDeckId?: string | null,
) {
  const sortedRecords = [...records]
    .filter((record) => record.counts.seen === 0 && record.summary.id !== excludeDeckId)
    .sort((a, b) => {
      const difficultyRank = getDifficultyRank(a.summary.difficulty) - getDifficultyRank(b.summary.difficulty)

      if (difficultyRank !== 0) {
        return difficultyRank
      }

      if (a.summary.estimatedMinutes !== b.summary.estimatedMinutes) {
        return a.summary.estimatedMinutes - b.summary.estimatedMinutes
      }

      return a.summary.title.localeCompare(b.summary.title)
    })

  const picked = new Set<string>()
  const seenTracks = new Set<string>()
  const results: DeckLibraryRecord[] = []

  for (const record of sortedRecords) {
    if (results.length >= limit) {
      break
    }

    if (seenTracks.has(record.summary.track)) {
      continue
    }

    results.push(record)
    picked.add(record.summary.id)
    seenTracks.add(record.summary.track)
  }

  for (const record of sortedRecords) {
    if (results.length >= limit) {
      break
    }

    if (picked.has(record.summary.id)) {
      continue
    }

    results.push(record)
  }

  return results
}

function getDifficultyRank(difficulty: DeckManifestEntry['difficulty']) {
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  return 2
}

function getStreakLabel(streak: number) {
  if (streak <= 0) {
    return 'Start one'
  }

  return `${streak} ${streak === 1 ? 'day' : 'days'}`
}
