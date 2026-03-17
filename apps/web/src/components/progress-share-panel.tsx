import { getDeckManifest } from '@prepdeck/content'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/panel'
import {
  buildProgressShareSnapshot,
  createProgressShareCardDataUrl,
  createProgressShareCardSvg,
  getProgressShareCardFilename,
} from '@/lib/progress-share-card'
import { testIds } from '@/lib/test-ids'
import { useProgress } from '@/state/progress-context'

type FeedbackState = {
  text: string
  tone: 'success'
}

export function ProgressSharePanel() {
  const { progressStore } = useProgress()
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const summaries = getDeckManifest().decks
  const snapshot = useMemo(
    () => buildProgressShareSnapshot(progressStore, summaries),
    [progressStore, summaries],
  )
  const previewUrl = useMemo(
    () => createProgressShareCardDataUrl(snapshot),
    [snapshot],
  )

  const handleDownload = () => {
    const blob = new Blob([createProgressShareCardSvg(snapshot)], {
      type: 'image/svg+xml',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = getProgressShareCardFilename()
    link.click()
    window.URL.revokeObjectURL(url)

    setFeedback({
      text: 'Progress card downloaded as an SVG snapshot.',
      tone: 'success',
    })
  }

  return (
    <Panel className="p-5" data-testid={testIds.progress.shareCardPanel}>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Shareable</Badge>
            <Badge>SVG card</Badge>
            <Badge>Local-first</Badge>
          </div>
          <h2 className="mt-4 text-2xl font-black text-[var(--retro-ink)]">
            Download a portfolio-ready progress card.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
            Generate a clean snapshot of your progress with no backend and no account.
            It is useful for portfolio screenshots, posting updates, or keeping a visual
            checkpoint of your prep.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              data-testid={testIds.progress.shareCardDownloadButton}
              onClick={handleDownload}
              type="button"
              variant="secondary"
            >
              Download share card
            </Button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MetricPill label="Strongest topic" value={snapshot.strongestTopic} />
            <MetricPill label="Need review" value={`${snapshot.reviewDebt}`} />
            <MetricPill label="Saved notes" value={`${snapshot.savedNotes}`} />
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.4rem] border-2 border-[var(--retro-line-strong)] bg-[var(--retro-bg-strong)] shadow-[6px_6px_0_var(--retro-shadow-soft)]">
          <img
            alt="Progress share card preview"
            className="block h-auto w-full"
            decoding="async"
            loading="lazy"
            src={previewUrl}
          />
        </div>
      </div>

      {feedback ? (
        <Panel className="mt-4 border-[var(--retro-line-strong)] bg-[var(--retro-surface-strong)] p-4" inset>
          <p className="text-sm leading-6 text-[var(--retro-ink)]">{feedback.text}</p>
        </Panel>
      ) : null}
    </Panel>
  )
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <Panel className="bg-[var(--retro-surface-muted)] p-3" inset>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--retro-ink-soft)]">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-[var(--retro-ink)]">{value}</p>
    </Panel>
  )
}
