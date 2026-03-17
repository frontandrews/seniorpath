import type { Deck } from '@prepdeck/schemas'
import { getDeckById } from '@prepdeck/content'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { StudySessionPlayer } from '@/components/study-session-player'
import { getDeckCounts } from '@/lib/progress'
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
  const restartHref = createStudyHref(deck.id, { format, mode: 'start', scope })

  return (
    <Panel className="bg-[var(--retro-surface)] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--retro-line)]">
        Session complete
      </p>
      <h2 className="mt-3 text-3xl font-black text-[var(--retro-ink)]">
        {format === 'interview'
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
            : 'You have seen every card in this deck.'}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
        {format === 'interview'
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
            : 'Review the cards marked partial or not learned to tighten the weak spots.'}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton to={`/decks/${deck.id}/review`} variant="primary">
          Review this deck
        </LinkButton>
        {scope === 'weak' ? (
          <LinkButton to={restartHref} variant="secondary">
            {format === 'interview' ? 'Run weak interview mode again' : 'Run weak cards again'}
          </LinkButton>
        ) : (
          <LinkButton to={restartHref} variant="secondary">
            {format === 'interview' ? 'Run interview mode again' : 'Restart deck'}
          </LinkButton>
        )}
        <LinkButton to={`/decks/${deck.id}`} variant="ghost">
          Back to deck
        </LinkButton>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full border-2 border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.04)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-ink)]">
          {getStudyScopeLabel(scope)}
        </span>
        <span className="inline-flex items-center rounded-full border-2 border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.04)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-ink)]">
          {getStudyFormatLabel(format)}
        </span>
        {format === 'interview' ? (
          <span className="inline-flex items-center rounded-full border-2 border-[var(--retro-warning)] bg-[color:rgba(101,121,153,0.22)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
            {deck.cards.length} prompts
          </span>
        ) : null}
      </div>
    </Panel>
  )
}
