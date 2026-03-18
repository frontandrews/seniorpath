import type { DeckManifestEntry, SessionHistoryEntry } from '@seniorpath/schemas'
import { getDecksByTopic } from '@seniorpath/content/manifest'
import { m } from 'motion/react'
import { useMemo, useState } from 'react'

import { AdSlot } from '@/components/ad-slot'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataControlsPanel } from '@/components/data-controls-panel'
import { ProgressSharePanel } from '@/components/progress-share-panel'
import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/link-button'
import { PageIntro } from '@/components/ui/page-intro'
import { Panel } from '@/components/ui/panel'
import { ProgressMeter } from '@/components/ui/progress-meter'
import { SectionHeader } from '@/components/ui/section-header'
import { cardRevealVariants, hoverLiftMotionProps } from '@/lib/motion'
import {
  combineDeckCounts,
  getDeckCountsFromSummary,
} from '@/lib/progress'
import { getMasteryPercent, getMasterySnapshot } from '@/lib/mastery'
import {
  getSessionFormatLabel,
  getSessionHistorySnapshot,
  getSessionKindLabel,
} from '@/lib/session-history'
import { getStudyGoalsSnapshot } from '@/lib/study-goals'
import { testIds } from '@/lib/test-ids'
import { getTopicLabel } from '@/lib/topic-labels'
import { usePreferences } from '@/state/preferences-context'
import { useProgress } from '@/state/progress-context'

type DeckRecordLike = {
  counts: {
    allLearned: boolean
    allSeen: boolean
    learned: number
    notLearned: number
    partial: number
    seen: number
    total: number
    unseen: number
  }
  noteCount: number
  reviewDebt: number
  summary: DeckManifestEntry
}

export function ProgressPage() {
  const { progressStore, resetAllProgress, sessionHistoryStore } = useProgress()
  const { preferences } = usePreferences()
  const [isResetAllOpen, setIsResetAllOpen] = useState(false)
  const decksByTopic = getDecksByTopic()
  const topicEntries = Object.entries(decksByTopic)

  const deckRecords = useMemo(
    () =>
      topicEntries.flatMap(([, summaries]) =>
        summaries.map((summary) => {
          const counts = getDeckCountsFromSummary(progressStore, summary)

          return {
            counts,
            noteCount: Object.keys(progressStore.decks[summary.id]?.notes ?? {}).length,
            reviewDebt: counts.partial + counts.notLearned,
            summary,
          }
        }),
      ) satisfies DeckRecordLike[],
    [progressStore, topicEntries],
  )

  const overallCounts = combineDeckCounts(deckRecords.map((record) => record.counts))
  const masterySnapshot = getMasterySnapshot(deckRecords, progressStore)
  const sessionHistorySnapshot = getSessionHistorySnapshot(sessionHistoryStore)
  const goalsSnapshot = getStudyGoalsSnapshot(sessionHistorySnapshot, {
    daily: preferences.dailyGoalTarget,
    weekly: preferences.weeklyGoalTarget,
  })

  return (
    <>
      <section className="space-y-4" data-testid={testIds.progress.page}>
        <PageIntro
          actions={
            <>
              <LinkButton to="/daily-queue" variant="primary">
                Start daily queue
              </LinkButton>
              <LinkButton to="/" variant="ghost">
                Back to decks
              </LinkButton>
            </>
          }
          description="History, goals, backups, and local progress in one clear place."
          title="Progress"
        />

        <Panel className="p-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <p className="app-eyebrow">Overview</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryStat label="Cards learned" value={`${overallCounts.learned}`} />
                <SummaryStat label="Review debt" value={`${masterySnapshot.reviewDebt}`} />
                <SummaryStat label="Decks completed" value={`${masterySnapshot.decksCompleted}`} />
                <SummaryStat label="Saved notes" value={`${masterySnapshot.savedNotes}`} />
              </div>
            </div>

            <Panel className="p-4" inset>
              <p className="app-eyebrow">Coverage</p>
              <div className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--retro-ink-soft)]">
                <span>Cards seen</span>
                <span>
                  {overallCounts.seen} of {overallCounts.total}
                </span>
              </div>
              <div className="mt-3">
                <ProgressMeter current={overallCounts.seen} total={overallCounts.total} />
              </div>
            </Panel>
          </div>
        </Panel>
      </section>

      <section
        aria-labelledby="momentum-heading"
        className="space-y-4"
        data-testid={testIds.progress.momentum}
      >
        <SectionHeader
          description="Local session history that shows whether the habit is alive and what the latest reps looked like."
          id="momentum-heading"
          title="Momentum"
        />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="grid gap-4 sm:grid-cols-3">
            <MomentumStatCard
              detail={
                sessionHistorySnapshot.currentStreak > 0
                  ? `${sessionHistorySnapshot.currentStreak} consecutive ${pluralize('day', sessionHistorySnapshot.currentStreak)} with at least one completed session.`
                  : 'No live streak yet. One short session starts the chain again.'
              }
              label="Current streak"
              value={
                sessionHistorySnapshot.currentStreak > 0
                  ? `${sessionHistorySnapshot.currentStreak} ${sessionHistorySnapshot.currentStreak === 1 ? 'day' : 'days'}`
                  : 'Start one'
              }
            />
            <MomentumStatCard
              detail={`${sessionHistorySnapshot.sessionsThisWeek} ${pluralize('session', sessionHistorySnapshot.sessionsThisWeek)} completed in the last 7 days.`}
              label="This week"
              value={`${sessionHistorySnapshot.sessionsThisWeek}`}
            />
            <MomentumStatCard
              detail={`${sessionHistorySnapshot.totalSessions} total ${pluralize('session', sessionHistorySnapshot.totalSessions)} stored on this device.`}
              label="Total sessions"
              value={`${sessionHistorySnapshot.totalSessions}`}
            />
          </div>

          <m.div
            className="[transform-style:preserve-3d]"
            initial="initial"
            variants={cardRevealVariants}
            viewport={{ amount: 0.2, once: true }}
            whileInView="animate"
            {...hoverLiftMotionProps}
          >
            <Panel className="h-full p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
                    Recent activity
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-[var(--retro-ink)]">
                    {sessionHistorySnapshot.recentSessions.length > 0
                      ? 'Latest completed reps'
                      : 'Your session recap will land here.'}
                  </h3>
                </div>
                {sessionHistorySnapshot.lastCompletedAt ? (
                  <Badge tone="accent">
                    Last rep {formatSessionRelativeTime(sessionHistorySnapshot.lastCompletedAt)}
                  </Badge>
                ) : null}
              </div>

              {sessionHistorySnapshot.recentSessions.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {sessionHistorySnapshot.recentSessions.map((session) => (
                    <RecentSessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <Panel className="mt-5 bg-[var(--retro-surface-muted)] p-4" inset>
                  <p className="text-sm leading-6 text-white/80">
                    Finish any deck, daily queue, or mock interview and SeniorPath will keep a
                    local recap here so the product feels like a living study app, not just
                    a deck browser.
                  </p>
                </Panel>
              )}
            </Panel>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="goal-tracker-heading"
        className="space-y-4"
        data-testid={testIds.progress.goalTracker}
      >
        <SectionHeader
          description="Simple local targets that keep the app feeling like a habit loop instead of a static shelf."
          id="goal-tracker-heading"
          title="Goal tracker"
        />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
          <GoalCard
            description={
              goalsSnapshot.daily.isComplete
                ? 'Today is already covered. Anything else now is bonus practice.'
                : `${goalsSnapshot.daily.remaining} short ${pluralize('session', goalsSnapshot.daily.remaining)} left to close today.`
            }
            goal={goalsSnapshot.daily}
          />
          <GoalCard
            description={
              goalsSnapshot.weekly.isComplete
                ? 'Weekly pace is clear. Keep going only if you want extra reps.'
                : `${goalsSnapshot.weekly.remaining} more ${pluralize('session', goalsSnapshot.weekly.remaining)} to hit this week’s pace.`
            }
            goal={goalsSnapshot.weekly}
          />
          <m.div
            className="[transform-style:preserve-3d]"
            initial="initial"
            variants={cardRevealVariants}
            viewport={{ amount: 0.2, once: true }}
            whileInView="animate"
            {...hoverLiftMotionProps}
          >
            <Panel className="flex h-full flex-col justify-between gap-4 p-5">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
                  Next move
                </p>
                <h3 className="mt-3 text-2xl font-black text-[var(--retro-ink)]">
                  Keep the pace deliberate.
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  {goalsSnapshot.nextAction.detail}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton to={goalsSnapshot.nextAction.href} variant="secondary">
                  {goalsSnapshot.nextAction.label}
                </LinkButton>
                <LinkButton to="/mock-interview" variant="ghost">
                  Mock interview
                </LinkButton>
              </div>
            </Panel>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="mastery-snapshot-heading"
        className="space-y-4"
        data-testid={testIds.progress.masterySnapshot}
      >
        <SectionHeader
          description="Local signals that show where you are strongest, where the review debt lives, and how much groundwork is already done."
          id="mastery-snapshot-heading"
          title="Mastery snapshot"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MasterySignalCard
            detail={
              masterySnapshot.strongestTopic
                ? `${getMasteryPercent(masterySnapshot.strongestTopic)}% learned across ${masterySnapshot.strongestTopic.deckCount} deck${masterySnapshot.strongestTopic.deckCount === 1 ? '' : 's'}.`
                : 'No topic has enough progress yet to rank as strongest.'
            }
            label="Strongest topic"
            value={
              masterySnapshot.strongestTopic
                ? getTopicLabel(masterySnapshot.strongestTopic.topic)
                : 'Not enough reps yet'
            }
          />
          <MasterySignalCard
            detail={
              masterySnapshot.weakestTopic
                ? `${masterySnapshot.weakestTopic.reviewDebt} ${pluralize('card', masterySnapshot.weakestTopic.reviewDebt)} still ${masterySnapshot.weakestTopic.reviewDebt === 1 ? 'needs' : 'need'} work here.`
                : 'No weak topic is standing out right now.'
            }
            label="Weakest topic"
            value={
              masterySnapshot.weakestTopic
                ? getTopicLabel(masterySnapshot.weakestTopic.topic)
                : 'No weak topic yet'
            }
          />
          <MasterySignalCard
            detail={`${masterySnapshot.startedDecks} started ${pluralize('deck', masterySnapshot.startedDecks)} across the library.`}
            label="Decks completed"
            value={`${masterySnapshot.decksCompleted}`}
          />
          <MasterySignalCard
            detail={`${masterySnapshot.reviewDebt} ${pluralize('card', masterySnapshot.reviewDebt)} currently ${masterySnapshot.reviewDebt === 1 ? 'sits' : 'sit'} in the review debt queue.`}
            label="Saved notes"
            value={`${masterySnapshot.savedNotes}`}
          />
        </div>
      </section>

      <section
        aria-labelledby="local-tools-heading"
        className="space-y-4"
        data-testid={testIds.progress.localTools}
      >
        <SectionHeader
          description="Backup, restore, reset, and share from the same place without touching a backend."
          id="local-tools-heading"
          title="Local tools"
        />
        <div className="space-y-6">
          <ProgressSharePanel />
          <DataControlsPanel onResetAll={() => setIsResetAllOpen(true)} />
        </div>
      </section>

      <AdSlot placement="home-primary" />

      <ConfirmDialog
        confirmLabel="Reset all"
        description="This clears every saved status, personal note, and session recap across all decks."
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

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <m.div
      initial="initial"
      variants={cardRevealVariants}
      viewport={{ amount: 0.3, once: true }}
      whileInView="animate"
    >
      <Panel className="bg-[var(--retro-surface-muted)] p-3" inset>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-ink-soft)]">
          {label}
        </p>
        <p className="mt-1 text-lg font-black text-[var(--retro-ink)]">{value}</p>
      </Panel>
    </m.div>
  )
}

function MomentumStatCard({
  detail,
  label,
  value,
}: {
  detail: string
  label: string
  value: string
}) {
  return (
    <m.div
      className="[transform-style:preserve-3d]"
      initial="initial"
      variants={cardRevealVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="animate"
      {...hoverLiftMotionProps}
    >
      <Panel className="h-full p-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
          {label}
        </p>
        <p className="mt-3 text-2xl font-black text-[var(--retro-ink)]">{value}</p>
        <p className="mt-3 text-sm leading-6 text-white/80">{detail}</p>
      </Panel>
    </m.div>
  )
}

function RecentSessionCard({ session }: { session: SessionHistoryEntry }) {
  const reviewDebt = session.partialCount + session.notLearnedCount

  return (
    <Panel className="bg-[var(--retro-surface-muted)] p-4" inset>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">{getSessionKindLabel(session.kind)}</Badge>
            <Badge>{getSessionFormatLabel(session.format)}</Badge>
            {session.deckTitle ? <Badge>{session.deckTitle}</Badge> : null}
          </div>
          <h4 className="mt-3 text-lg font-black text-[var(--retro-ink)]">
            {session.sessionLabel}
          </h4>
          <p className="mt-1 text-sm leading-6 text-white/75">
            {session.scopeLabel} · {session.cardCount} {pluralize('card', session.cardCount)} ·{' '}
            {formatSessionRelativeTime(session.completedAt)}
          </p>
        </div>
        <Badge>{session.learnedCount} learned</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/80">
        {session.learnedCount} learned · {session.partialCount} partial ·{' '}
        {session.notLearnedCount} needs work
        {reviewDebt > 0
          ? '. Keep this lane in the queue before the weak pile grows.'
          : '. Clean rep.'}
      </p>
    </Panel>
  )
}

function GoalCard({
  description,
  goal,
}: {
  description: string
  goal: {
    current: number
    isComplete: boolean
    label: string
    remaining: number
    target: number
  }
}) {
  return (
    <m.div
      className="[transform-style:preserve-3d]"
      initial="initial"
      variants={cardRevealVariants}
      viewport={{ amount: 0.2, once: true }}
      whileInView="animate"
      {...hoverLiftMotionProps}
    >
      <Panel className="h-full p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
              {goal.label}
            </p>
            <h3 className="mt-3 text-2xl font-black text-[var(--retro-ink)]">
              {goal.current} / {goal.target}
            </h3>
          </div>
          <Badge tone={goal.isComplete ? 'success' : 'accent'}>
            {goal.isComplete ? 'On track' : `${goal.remaining} left`}
          </Badge>
        </div>
        <div className="mt-4">
          <ProgressMeter current={Math.min(goal.current, goal.target)} total={goal.target} />
        </div>
        <p className="mt-4 text-sm leading-6 text-white/80">{description}</p>
      </Panel>
    </m.div>
  )
}

function MasterySignalCard({
  detail,
  label,
  value,
}: {
  detail: string
  label: string
  value: string
}) {
  return (
    <m.div
      initial="initial"
      variants={cardRevealVariants}
      viewport={{ amount: 0.3, once: true }}
      whileInView="animate"
      {...hoverLiftMotionProps}
    >
      <Panel className="p-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
          {label}
        </p>
        <p className="mt-3 text-2xl font-black text-[var(--retro-ink)]">{value}</p>
        <p className="mt-3 text-sm leading-6 text-white/80">{detail}</p>
      </Panel>
    </m.div>
  )
}

function pluralize(word: string, count: number) {
  return count === 1 ? word : `${word}s`
}

function formatSessionRelativeTime(value: string, now: Date = new Date()) {
  const date = new Date(value)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  const targetDay = new Date(date)
  targetDay.setHours(0, 0, 0, 0)
  const dayDelta = Math.round((today.getTime() - targetDay.getTime()) / 86_400_000)
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  if (dayDelta === 0) {
    return `today at ${timeLabel}`
  }

  if (dayDelta === 1) {
    return `yesterday at ${timeLabel}`
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}
