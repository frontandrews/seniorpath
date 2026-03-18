import type { ProgressStatus } from '@seniorpath/schemas'
import { getDeckById } from '@seniorpath/content/decks'
import { useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { AdSlot } from '@/components/ad-slot'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ReviewCard } from '@/components/review-card'
import { StatusTabs } from '@/components/status-tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { PageIntro } from '@/components/ui/page-intro'
import { Panel } from '@/components/ui/panel'
import {
  filterReviewCardRecords,
  type ReviewFilterMode,
} from '@/lib/review-filters'
import { getCardStatus, getDeckCounts } from '@/lib/progress'
import { testIds } from '@/lib/test-ids'
import { useProgress } from '@/state/progress-context'

const EMPTY_COUNTS = {
  allLearned: false,
  allSeen: false,
  learned: 0,
  notLearned: 0,
  partial: 0,
  seen: 0,
  total: 0,
  unseen: 0,
}

function getInitialStatus(counts: typeof EMPTY_COUNTS): ProgressStatus {
  if (counts.notLearned > 0) return 'not_learned'
  if (counts.partial > 0) return 'partial'
  if (counts.learned > 0) return 'learned'
  return 'unseen'
}

export function ReviewPage() {
  const { deckId } = useParams()
  const {
    clearCardNote,
    getCardNote,
    progressStore,
    resetDeckProgress,
    setCardNote,
    setCardStatus,
    setLearnedToUnseen,
  } = useProgress()
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [filterMode, setFilterMode] = useState<ReviewFilterMode>('all')
  const [query, setQuery] = useState('')
  const deck = deckId ? getDeckById(deckId) : undefined
  const counts = deck ? getDeckCounts(progressStore, deck) : EMPTY_COUNTS
  const [activeStatus, setActiveStatus] = useState<ProgressStatus>(() =>
    getInitialStatus(counts),
  )

  const cardRecordsForActiveStatus = useMemo(
    () =>
      deck
        ? deck.cards.filter(
            (card) => getCardStatus(progressStore, deck.id, card.id) === activeStatus,
          ).map((card) => ({
            card,
            note: getCardNote(deck.id, card.id),
          }))
        : [],
    [activeStatus, deck, getCardNote, progressStore],
  )

  const visibleCardRecords = useMemo(
    () =>
      filterReviewCardRecords(cardRecordsForActiveStatus, {
        mode: filterMode,
        query,
      }),
    [cardRecordsForActiveStatus, filterMode, query],
  )

  if (!deckId || !deck) {
    return <Navigate replace to="/" />
  }

  return (
    <>
      <div className="space-y-4" data-testid={testIds.review.page}>
        <PageIntro
          actions={
            <>
              {counts.partial + counts.notLearned > 0 ? (
                <LinkButton
                  data-testid={testIds.review.studyWeakCardsLink}
                  to={`/study/${deck.id}?mode=start&scope=weak`}
                  variant="secondary"
                >
                  Study weak cards
                </LinkButton>
              ) : null}
              <LinkButton to={`/decks/${deck.id}`} variant="ghost">
                Back to deck
              </LinkButton>
              <Button data-testid={testIds.review.resetButton} onClick={() => setIsResetOpen(true)} type="button" variant="danger">
                Reset deck
              </Button>
            </>
          }
          description="Inspect what is learned, what still feels partial, and what needs a full revisit."
          eyebrow="Review mode"
          meta={
            <>
              <Badge tone="accent">{counts.learned} learned</Badge>
              <Badge>{counts.partial} partial</Badge>
              <Badge>{counts.notLearned} need review</Badge>
              <Badge>{counts.unseen} unseen</Badge>
            </>
          }
          title={deck.title}
        />

        <Panel className="p-5">
          <StatusTabs
            activeStatus={activeStatus}
            counts={{
              learned: counts.learned,
              not_learned: counts.notLearned,
              partial: counts.partial,
              unseen: counts.unseen,
            }}
            onSelect={setActiveStatus}
          />
        </Panel>

        <Panel className="p-4" inset>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <label
                className="app-field-label"
                htmlFor="review-search"
              >
                Search current bucket
              </label>
              <input
                className="app-input mt-3"
                data-testid={testIds.review.searchInput}
                id="review-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by question, answer, note, tag, or follow-up..."
                type="text"
                value={query}
              />
            </div>
            <div>
              <p className="app-field-label">
                Quick filters
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {([
                  ['all', 'All cards'],
                  ['notes', 'Has notes'],
                  ['follow_ups', 'Has follow-ups'],
                ] as const).map(([mode, label]) => (
                  <Button
                    data-testid={testIds.review.quickFilter(mode)}
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    size="sm"
                    type="button"
                    variant={filterMode === mode ? 'primary' : 'ghost'}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <p className="app-copy mt-4 text-sm">
            Showing {visibleCardRecords.length} of {cardRecordsForActiveStatus.length}{' '}
            {cardRecordsForActiveStatus.length === 1 ? 'card' : 'cards'} in this bucket.
          </p>
        </Panel>
      </div>

      <section className="space-y-3">
        {visibleCardRecords.length ? (
          visibleCardRecords.map(({ card, note }) => (
            <ReviewCard
              card={card}
              key={card.id}
              note={note}
              onClearNote={() => clearCardNote(deck.id, card.id)}
              onSaveNote={(note) => setCardNote(deck.id, card.id, note)}
              onSetStatus={(status) => setCardStatus(deck.id, card.id, status)}
              onUnmarkLearned={() => setLearnedToUnseen(deck.id, card.id)}
              status={getCardStatus(progressStore, deck.id, card.id)}
            />
          ))
        ) : (
          <Panel
            className="border-dashed bg-[var(--retro-surface-muted)] p-6 text-sm text-white/80"
            data-testid={testIds.review.emptyState}
          >
            {cardRecordsForActiveStatus.length
              ? 'No cards match the current review filters.'
              : 'There are no cards in this bucket yet.'}
          </Panel>
        )}
      </section>

      <AdSlot placement="review" />

      <ConfirmDialog
        confirmLabel="Reset deck"
        description={`This clears every saved card status and note for ${deck.title}.`}
        isOpen={isResetOpen}
        onCancel={() => setIsResetOpen(false)}
        onConfirm={() => {
          resetDeckProgress(deck.id)
          setIsResetOpen(false)
          setActiveStatus('unseen')
        }}
        title="Reset this deck?"
      />
    </>
  )
}
