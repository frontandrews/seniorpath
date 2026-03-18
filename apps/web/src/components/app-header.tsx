import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import { MoonStar, SunMedium } from 'lucide-react'

import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { Switch } from '@/components/retroui/Switch'
import { getGuideIndexHref } from '@/lib/article-links'
import { testIds } from '@/lib/test-ids'
import { useTheme } from '@/state/theme-context'

type FocusHeaderProps = {
  backLabel: string | null
  backTo: string | null
  eyebrow: string
  mode: 'focus'
  showHomeShortcut: boolean
  showPremiumShortcut: boolean
  showProgressShortcut: boolean
  showSettingsShortcut: boolean
  title: string
}

type GlobalHeaderProps = {
  mode: 'global'
  pathname: string
}

type AppHeaderProps = FocusHeaderProps | GlobalHeaderProps

export function AppHeader(props: AppHeaderProps) {
  const { isDark, toggleTheme } = useTheme()

  if (props.mode === 'global') {
    const guideIndexHref = getGuideIndexHref(getPreferredGuideLocale())
    const items = [
      {
        href: guideIndexHref,
        isActive: false,
        label: 'Guides',
        testId: testIds.appShell.homeGuidesLink,
      },
      {
        href: '/',
        isActive: isLibraryPath(props.pathname),
        label: 'Practice',
        testId: undefined,
      },
      {
        href: '/progress',
        isActive: props.pathname.startsWith('/progress'),
        label: 'Progress',
        testId: testIds.appShell.homeProgressLink,
      },
      {
        href: '/settings',
        isActive: props.pathname.startsWith('/settings'),
        label: 'Settings',
        testId: testIds.appShell.homeSettingsLink,
      },
      {
        href: '/premium',
        isActive: props.pathname.startsWith('/premium'),
        label: 'Premium',
        testId: testIds.appShell.homePremiumLink,
      },
    ] as const

    return (
      <Panel className="app-header-panel px-3 py-3" data-testid={testIds.appShell.globalHeader}>
        <div className="app-header-inner">
          <nav aria-label="Primary" className="app-header-nav">
            {items.map((item) => (
              <GlobalNavLink
                data-testid={item.testId}
                href={item.href}
                isActive={item.isActive}
                key={item.href}
              >
                {item.label}
              </GlobalNavLink>
            ))}
            <GlobalThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </nav>
        </div>
      </Panel>
    )
  }

  const {
    backLabel,
    backTo,
    eyebrow,
    showHomeShortcut,
    showPremiumShortcut,
    showProgressShortcut,
    showSettingsShortcut,
    title,
  } = props

  return (
    <Panel className="app-header-panel px-4 py-3" data-testid={testIds.appShell.focusHeader}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {backTo ? (
              <LinkButton data-testid={testIds.appShell.compactBackLink} size="sm" to={backTo} variant="ghost">
                {backLabel}
              </LinkButton>
            ) : null}
            {showHomeShortcut ? (
              <LinkButton size="sm" to="/" variant="secondary">
                Home
              </LinkButton>
            ) : null}
            {showProgressShortcut ? (
              <LinkButton data-testid={testIds.appShell.homeProgressLink} size="sm" to="/progress" variant="ghost">
                Progress
              </LinkButton>
            ) : null}
            {showSettingsShortcut ? (
              <LinkButton data-testid={testIds.appShell.homeSettingsLink} size="sm" to="/settings" variant="ghost">
                Settings
              </LinkButton>
            ) : null}
            {showPremiumShortcut ? (
              <LinkButton data-testid={testIds.appShell.homePremiumLink} size="sm" to="/premium" variant="ghost">
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

function GlobalNavLink({
  children,
  href,
  isActive,
  ...props
}: {
  children: string
  href: string
  isActive?: boolean
} & ComponentPropsWithoutRef<'a'>) {
  const className = isActive ? 'app-nav-link app-nav-link--active' : 'app-nav-link'

  if (href.startsWith('/')) {
    return (
      <Link aria-current={isActive ? 'page' : undefined} className={className} to={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a className={className} href={href} {...props}>
      {children}
    </a>
  )
}

function GlobalThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean
  onToggle: () => void
}) {
  return (
    <button
      aria-label="Toggle dark mode"
      className="app-theme-button"
      data-testid={testIds.appShell.themeToggle}
      onClick={onToggle}
      type="button"
    >
      {isDark ? (
        <SunMedium aria-hidden="true" className="app-theme-button__icon" />
      ) : (
        <MoonStar aria-hidden="true" className="app-theme-button__icon" />
      )}
    </button>
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
    <label className="app-theme-toggle">
      <SunMedium aria-hidden="true" className="size-3.5 text-[var(--retro-ink-soft)]" />
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        data-testid={testIds.appShell.themeToggle}
        onCheckedChange={onToggle}
      />
      <MoonStar aria-hidden="true" className="size-3.5 text-[var(--retro-ink-soft)]" />
    </label>
  )
}

function isLibraryPath(pathname: string) {
  return pathname === '/' || pathname.startsWith('/decks/')
}

function getPreferredGuideLocale() {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en'
}
