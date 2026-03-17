import type { DeckManifestEntry } from '@prepdeck/schemas'

import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { ProgressMeter } from '@/components/ui/progress-meter'
import { getTopicLabel } from '@/lib/topic-labels'

type DeckCardProps = {
  detailHref: string
  learnedCount: number
  noteCount?: number
  reviewDebt?: number
  summary: DeckManifestEntry
  totalCards: number
}

export function DeckCard({
  detailHref,
  learnedCount,
  noteCount = 0,
  reviewDebt = 0,
  summary,
  totalCards,
}: DeckCardProps) {
  return (
    <Panel className="flex h-full flex-col justify-between gap-5 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--retro-line)]">
        {getTopicLabel(summary.topic)}
      </p>
      <h2 className="text-xl font-black text-[var(--retro-ink)]">{summary.title}</h2>
      <div className="flex flex-wrap gap-2 text-sm">
        <Badge>{summary.estimatedMinutes} min</Badge>
        <Badge>{summary.difficulty}</Badge>
        <Badge tone="success">
          {learnedCount} / {totalCards} learned
        </Badge>
        {reviewDebt > 0 ? (
          <Badge tone="warning">
            {reviewDebt} {reviewDebt === 1 ? 'needs' : 'need'} review
          </Badge>
        ) : null}
        {noteCount > 0 ? <Badge tone="accent">{noteCount} note{noteCount === 1 ? '' : 's'}</Badge> : null}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--retro-ink-soft)]">
          <span>Deck progress</span>
          <span>{learnedCount} of {totalCards}</span>
        </div>
        <ProgressMeter current={learnedCount} total={totalCards} />
      </div>
      <div className="mt-auto">
        <LinkButton to={detailHref} variant="primary">
          Open deck
        </LinkButton>
      </div>
    </Panel>
  )
}
