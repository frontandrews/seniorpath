import { MoonStar, SunMedium } from 'lucide-react'

import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { Switch } from '@/components/retroui/Switch'
import { useTheme } from '@/state/theme-context'

type AppHeaderProps = {
  backLabel: string | null
  backTo: string | null
  eyebrow: string
  isPremium: boolean
  mode: 'compact' | 'home'
  showHomeShortcut: boolean
  showPremiumShortcut: boolean
  showProgressShortcut: boolean
  showSettingsShortcut: boolean
  title: string
}

export function AppHeader({
  backLabel,
  backTo,
  eyebrow,
  isPremium,
  mode,
  showHomeShortcut,
  showPremiumShortcut,
  showProgressShortcut,
  showSettingsShortcut,
  title,
}: AppHeaderProps) {
  const { isDark, toggleTheme } = useTheme()

  if (mode === 'home') {
    return (
      <Panel className="mb-4 px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <LinkButton size="sm" to="/progress" variant="ghost">
              Progress
            </LinkButton>
            <LinkButton size="sm" to="/settings" variant="ghost">
              Settings
            </LinkButton>
            <LinkButton size="sm" to="/premium" variant={isPremium ? 'ghost' : 'secondary'}>
              {isPremium ? 'Premium' : 'Go premium'}
            </LinkButton>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="sticky top-[calc(0.75rem+env(safe-area-inset-top))] z-20 mb-4 px-4 py-3 sm:top-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {backTo ? (
              <LinkButton size="sm" to={backTo} variant="ghost">
                {backLabel}
              </LinkButton>
            ) : null}
            {showHomeShortcut ? (
              <LinkButton size="sm" to="/" variant="secondary">
                Home
              </LinkButton>
            ) : null}
            {showProgressShortcut ? (
              <LinkButton size="sm" to="/progress" variant="ghost">
                Progress
              </LinkButton>
            ) : null}
            {showSettingsShortcut ? (
              <LinkButton size="sm" to="/settings" variant="ghost">
                Settings
              </LinkButton>
            ) : null}
            {showPremiumShortcut ? (
              <LinkButton size="sm" to="/premium" variant="ghost">
                Premium
              </LinkButton>
            ) : null}
          </div>
          <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--retro-line)]">
            {eyebrow}
          </p>
          <p className="mt-1 truncate font-head text-lg text-[var(--retro-ink)]">{title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </div>
    </Panel>
  )
}

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean
  onToggle: () => void
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded border-2 border-border bg-background px-2 py-1 shadow-sm">
      <SunMedium aria-hidden="true" className="size-3.5 text-[var(--retro-ink-soft)]" />
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        onCheckedChange={onToggle}
      />
      <MoonStar aria-hidden="true" className="size-3.5 text-[var(--retro-ink-soft)]" />
    </label>
  )
}
