import type { DeckManifestEntry } from '@seniorpath/schemas'

import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { getTrackLabel } from '@/lib/track-labels'
import { testIds } from '@/lib/test-ids'
import { createStudyHref } from '@/lib/study-session'
import { getTopicLabel } from '@/lib/topic-labels'

type FirstRunPanelProps = {
  starterDecks: DeckManifestEntry[]
}

export function FirstRunPanel({ starterDecks }: FirstRunPanelProps) {
  return (
    <Panel
      className="p-5"
      data-testid={testIds.firstRun.page}
    >
      <p className="app-eyebrow">Start here</p>
      <h3 className="text-2xl font-black text-[var(--retro-ink)]">
        Pick one short deck and get a clean first rep in.
      </h3>
      <p className="app-copy mt-3 max-w-2xl text-sm">
        Start with one focused deck, answer before you flip, and save notes only where the idea still feels weak.
      </p>

      <div className="mt-5 grid gap-3">
        {starterDecks.map((deck) => (
          <Panel className="p-4" inset key={deck.id}>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{getTrackLabel(deck.track)}</Badge>
              <Badge>{getTopicLabel(deck.topic)}</Badge>
              <Badge>{deck.estimatedMinutes} min</Badge>
            </div>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h4 className="text-lg font-black text-[var(--retro-ink)]">{deck.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/75">{deck.description}</p>
              </div>
              <LinkButton
                data-testid={testIds.firstRun.startDeckLink(deck.id)}
                to={createStudyHref(deck.id, { mode: 'start' })}
                variant="primary"
              >
                Start deck
              </LinkButton>
            </div>
          </Panel>
        ))}
      </div>
    </Panel>
  )
}
