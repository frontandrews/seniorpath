import { getDeckSummaryById } from '@seniorpath/content/manifest'
import type { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AppHeader } from '@/components/app-header'
import { Panel } from '@/components/ui/panel'
import { getGuideIndexHref } from '@/lib/article-links'
import { PwaStatusPanel } from '@/components/pwa-status-panel'
import { testIds } from '@/lib/test-ids'

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const isFocusShell = isFocusRoute(location.pathname)
  const shell = isFocusShell ? getFocusShellConfig(location.pathname) : null
  const showHomeShortcut = shell ? shell.backTo !== '/' : false
  const showProgressShortcut = !location.pathname.startsWith('/progress')
  const showSettingsShortcut = !location.pathname.startsWith('/settings')
  const showPremiumShortcut = !location.pathname.startsWith('/premium')
  const showBottomNavigation = !isFocusShell

  return (
    <div className="min-h-screen bg-transparent text-[var(--retro-ink)]">
      <div className="app-shell">
        {isFocusShell && shell ? (
          <AppHeader
            backLabel={shell.backLabel}
            backTo={shell.backTo}
            eyebrow={shell.eyebrow}
            mode="focus"
            showHomeShortcut={showHomeShortcut}
            showPremiumShortcut={showPremiumShortcut}
            showProgressShortcut={showProgressShortcut}
            showSettingsShortcut={showSettingsShortcut}
            title={shell.title}
          />
        ) : (
          <AppHeader mode="global" pathname={location.pathname} />
        )}

        <main className="flex-1">{children}</main>
      </div>

      {showBottomNavigation ? <BottomNavigation pathname={location.pathname} /> : null}
      <PwaStatusPanel hasBottomNavigation={showBottomNavigation} />
    </div>
  )
}

type ShellConfig = {
  backLabel: string | null
  backTo: string | null
  eyebrow: string
  title: string
}

function getFocusShellConfig(pathname: string): ShellConfig {
  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] === 'study' && segments[1]) {
    const deck = getDeckSummaryById(segments[1])

    return {
      backLabel: 'Back to deck',
      backTo: `/decks/${segments[1]}`,
      eyebrow: 'Study session',
      title: deck?.title ?? 'Deck study',
    }
  }

  if (segments[0] === 'mock-interview') {
    return {
      backLabel: 'Back home',
      backTo: '/',
      eyebrow: 'Mock interview',
      title: 'Mixed interview run',
    }
  }

  if (segments[0] === 'daily-queue') {
    return {
      backLabel: 'Back home',
      backTo: '/',
      eyebrow: 'Daily queue',
      title: 'Daily smart queue',
    }
  }

  return {
    backLabel: 'Back home',
    backTo: '/',
    eyebrow: 'Path to Senior',
    title: 'Deck library',
  }
}

function BottomNavigation({ pathname }: { pathname: string }) {
  const guideIndexHref = getGuideIndexHref(getPreferredGuideLocale())
  const items = [
    { href: guideIndexHref, label: 'Guides', match: () => false },
    { href: '/', label: 'Practice', match: (value: string) => value === '/' || value.startsWith('/decks/') },
    {
      href: '/progress',
      label: 'Progress',
      match: (value: string) => value.startsWith('/progress'),
    },
    {
      href: '/settings',
      label: 'Settings',
      match: (value: string) => value.startsWith('/settings'),
    },
    {
      href: '/premium',
      label: 'Premium',
      match: (value: string) => value.startsWith('/premium'),
    },
  ] as const

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
      <Panel className="pointer-events-auto border-[var(--retro-line-strong)] px-2 py-2" data-testid={testIds.appShell.bottomNav}>
        <nav
          aria-label="Primary"
          className="grid grid-cols-5 gap-2"
          data-testid={testIds.appShell.primaryNav}
        >
          {items.map((item) => {
            const isActive = item.match(pathname)
            const className = isActive
              ? 'app-mobile-nav-link app-mobile-nav-link--active'
              : 'app-mobile-nav-link'

            if (item.href.startsWith('/')) {
              return (
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={className}
                  key={item.href}
                  to={item.href}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <a className={className} href={item.href} key={item.href}>
                {item.label}
              </a>
            )
          })}
        </nav>
      </Panel>
    </div>
  )
}

function isFocusRoute(pathname: string) {
  return (
    pathname.startsWith('/study/') ||
    pathname.startsWith('/mock-interview') ||
    pathname.startsWith('/daily-queue')
  )
}

function getPreferredGuideLocale() {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en'
}
