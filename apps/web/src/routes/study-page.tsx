import type { Deck } from '@seniorpath/schemas'
import { getDeckById } from '@seniorpath/content/decks'
import { m } from 'motion/react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { StudySessionPlayer } from '@/components/study-session-player'
import { getDeckCounts } from '@/lib/progress'
import { cardRevealVariants, staggerContainerVariants } from '@/lib/motion'
import {
  createStudyHref,
  getStudyEntries,
  getStudyFormat,
  getStudyInitialIndex,
  getStudyScope,
  getStudyScopeLabel,
  getStudyFormatLabel,
  type StudyFormat,
  type StudyScope,
} from '@/lib/study-session'
import { testIds } from '@/lib/test-ids'
import { useProgress } from '@/state/progress-context'

export function StudyPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { progressStore } = useProgress()
  const deck = deckId ? getDeckById(deckId) : undefined
  const successState = searchParams.get('state') === 'success'
  const mode = searchParams.get('mode') ?? 'start'
  const format = getStudyFormat(searchParams.get('format'))
  const scope = getStudyScope(searchParams.get('scope'))

  if (!deckId || !deck) {
    return <Navigate replace to="/" />
  }

  const studyEntries = getStudyEntries(progressStore, deck, scope)

  if (successState) {
    return <StudySuccess deck={deck} format={format} scope={scope} />
  }

  const initialIndex = getStudyInitialIndex(progressStore, deck, scope, mode)

  if (initialIndex === null || studyEntries.length === 0) {
    return <Navigate replace to={createStudyHref(deck.id, { format, scope, state: 'success' })} />
  }

  return (
    <StudySessionPlayer
      entries={studyEntries}
      exitHref={`/decks/${deck.id}`}
      format={format}
      initialIndex={initialIndex}
      key={`${deck.id}:${mode}:${scope}:${format}`}
      onComplete={() => navigate(createStudyHref(deck.id, { format, scope, state: 'success' }))}
      sessionKind="deck"
      scopeLabel={getStudyScopeLabel(scope)}
      sessionLabel={deck.title}
    />
  )
}

function StudySuccess({
  deck,
  format,
  scope,
}: {
  deck: Deck
  format: StudyFormat
  scope: StudyScope
}) {
  const { progressStore } = useProgress()
  const counts = getDeckCounts(progressStore, deck)
  const hasRemainingWeakCards = counts.partial + counts.notLearned > 0
  const savedNotes = Object.keys(progressStore.decks[deck.id]?.notes ?? {}).length
  const restartHref = createStudyHref(deck.id, { format, mode: 'start', scope })
  const weakCardsHref = createStudyHref(deck.id, { mode: 'start', scope: 'weak' })
  const successHeading =
    format === 'interview'
      ? scope === 'weak'
        ? hasRemainingWeakCards
          ? 'You finished this weak-card interview run.'
          : 'You cleared the weak interview queue for this deck.'
        : 'You completed this interview-style run.'
      : scope === 'weak'
        ? hasRemainingWeakCards
          ? 'You finished this weak-card session.'
          : 'You cleared every weak card in this deck.'
        : counts.allLearned
          ? 'Everything in this deck is marked learned.'
          : 'You have seen every card in this deck.'
  const successBody =
    format === 'interview'
      ? scope === 'weak'
        ? hasRemainingWeakCards
          ? 'The weak queue still has open cards. Run another interview-style pass or inspect them in review mode.'
          : 'Nice. There are no weak cards left in this deck right now.'
        : 'Use review to inspect the weaker answers or run the deck again when you want another timed pass.'
      : scope === 'weak'
        ? hasRemainingWeakCards
          ? 'Some cards still need work. Run the weak-card session again or inspect them in review mode.'
          : 'Nice. The weak-card queue for this deck is empty right now.'
        : counts.allLearned
          ? 'Great. Use review to sanity-check what you learned or restart the deck later.'
          : 'Review the cards marked partial or not learned to tighten the weak spots.'
  const nextMove = getSuccessNextMove({
    counts,
    deckId: deck.id,
    format,
    hasRemainingWeakCards,
    scope,
  })

  return (
    <m.section
      animate="animate"
      className="space-y-5"
      data-success-state={getSuccessStateKey({ counts, format, hasRemainingWeakCards, scope })}
      data-testid={testIds.study.successPage}
      initial="initial"
      variants={staggerContainerVariants}
    >
      <m.div variants={cardRevealVariants}>
        <Panel className="overflow-hidden bg-[linear-gradient(145deg,rgba(32,52,87,0.98),rgba(14,24,40,0.96))] p-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Session complete</Badge>
            <Badge>{getStudyScopeLabel(scope)}</Badge>
            <Badge>{getStudyFormatLabel(format)}</Badge>
            {format === 'interview' ? <Badge tone="warning">{deck.cards.length} prompts</Badge> : null}
          </div>
          <h2 className="mt-4 text-3xl font-black text-[var(--retro-ink)]">{successHeading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{successBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to={`/decks/${deck.id}/review`} variant="primary">
              Review this deck
            </LinkButton>
            {scope !== 'weak' && counts.partial + counts.notLearned > 0 ? (
              <LinkButton to={weakCardsHref} variant="secondary">
                Study weak cards
              </LinkButton>
            ) : null}
            <LinkButton to={restartHref} variant={scope !== 'weak' && counts.partial + counts.notLearned > 0 ? 'ghost' : 'secondary'}>
              {scope === 'weak'
                ? format === 'interview'
                  ? 'Run weak interview mode again'
                  : 'Run weak cards again'
                : format === 'interview'
                  ? 'Run interview mode again'
                  : 'Restart deck'}
            </LinkButton>
            <LinkButton to={`/decks/${deck.id}`} variant="ghost">
              Back to deck
            </LinkButton>
          </div>
        </Panel>
      </m.div>

      <m.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainerVariants}
      >
        <SuccessStat
          description="Cards currently marked learned in this deck."
          label="Learned"
          value={`${counts.learned} / ${counts.total}`}
        />
        <SuccessStat
          description="Cards that still need another pass."
          label="Needs review"
          value={`${counts.partial + counts.notLearned}`}
        />
        <SuccessStat
          description="Cards you have at least seen once in this deck."
          label="Seen"
          value={`${counts.seen} / ${counts.total}`}
        />
        <SuccessStat
          description="Personal notes saved on this device for this deck."
          label="Notes"
          value={`${savedNotes}`}
        />
      </m.div>

      <m.div variants={cardRevealVariants}>
        <Panel className="bg-[var(--retro-surface)] p-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-line)]">
            Next best move
          </p>
          <h3 className="mt-3 text-2xl font-black text-[var(--retro-ink)]">{nextMove.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/80">{nextMove.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton data-testid={testIds.study.successPrimaryAction} to={nextMove.href} variant="secondary">
              {nextMove.label}
            </LinkButton>
            <LinkButton to="/" variant="ghost">
              Back home
            </LinkButton>
          </div>
        </Panel>
      </m.div>
    </m.section>
  )
}

function getSuccessStateKey({
  counts,
  format,
  hasRemainingWeakCards,
  scope,
}: {
  counts: ReturnType<typeof getDeckCounts>
  format: StudyFormat
  hasRemainingWeakCards: boolean
  scope: StudyScope
}) {
  if (scope === 'weak') {
    if (format === 'interview') {
      return hasRemainingWeakCards ? 'weak_interview_pending' : 'weak_interview_cleared'
    }

    return hasRemainingWeakCards ? 'weak_pending' : 'weak_cleared'
  }

  if (format === 'interview') {
    return 'interview_complete'
  }

  return counts.allLearned ? 'deck_mastered' : 'deck_seen'
}

function SuccessStat({
  description,
  label,
  value,
}: {
  description: string
  label: string
  value: string
}) {
  return (
    <m.div variants={cardRevealVariants}>
      <Panel className="bg-[var(--retro-surface)] p-4">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-line)]">
          {label}
        </p>
        <p className="mt-3 text-2xl font-black text-[var(--retro-ink)]">{value}</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{description}</p>
      </Panel>
    </m.div>
  )
}

function getSuccessNextMove({
  counts,
  deckId,
  format,
  hasRemainingWeakCards,
  scope,
}: {
  counts: ReturnType<typeof getDeckCounts>
  deckId: string
  format: StudyFormat
  hasRemainingWeakCards: boolean
  scope: StudyScope
}) {
  if (scope === 'weak' && hasRemainingWeakCards) {
    return {
      description:
        'Go straight into review mode and tighten the cards that still feel shaky before another run.',
      href: `/decks/${deckId}/review`,
      label: 'Open review',
      title: 'Use review mode to clean up the remaining weak cards.',
    }
  }

  if (counts.partial + counts.notLearned > 0) {
    return {
      description:
        'A focused weak-card pass is the fastest way to turn this session into better recall next time.',
      href: createStudyHref(deckId, { mode: 'start', scope: 'weak' }),
      label: 'Run weak-card mode',
      title: 'There is still review debt in this deck.',
    }
  }

  if (format !== 'interview') {
    return {
      description:
        'You have already seen the whole deck. A timed interview rep is the next step up in pressure.',
      href: createStudyHref(deckId, { format: 'interview', mode: 'start', scope }),
      label: 'Switch to interview mode',
      title: 'Raise the pressure with a timed run.',
    }
  }

  return {
    description:
      'This deck is in a good place. Jump back to the library and widen the surface area with another topic.',
    href: '/',
    label: 'Browse another deck',
    title: 'You are ready for another lane.',
  }
}
