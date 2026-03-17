import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { Panel } from '@/components/ui/panel'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--retro-ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-24 pt-5 sm:px-6">
        <Panel className="mb-6 bg-[var(--retro-surface)] px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                to="/"
                className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--retro-line)]"
              >
                Prepdeck
              </Link>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--retro-ink)]">
                Technical interview prep that feels manageable.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
                Mobile-first flashcards for React, JavaScript, Node, system design,
                leadership, and coding challenges.
              </p>
            </div>
            <div className="rounded-[1rem] border-2 border-[var(--retro-line-strong)] bg-[var(--retro-bg-strong)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--retro-ink)] shadow-[4px_4px_0_var(--retro-shadow-soft)]">
              Pick a deck. Flip cards. Track progress.
            </div>
          </div>
        </Panel>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
