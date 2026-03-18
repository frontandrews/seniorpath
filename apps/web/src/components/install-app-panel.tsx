import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/panel'
import { testIds } from '@/lib/test-ids'

const INSTALL_PROMPT_STORAGE_KEY = 'seniorpath.install-prompt.v1'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

function isStandaloneMode() {
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches
  ) {
    return true
  }

  return Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
}

export function InstallAppPanel() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(() => {
    return window.localStorage.getItem(INSTALL_PROMPT_STORAGE_KEY) === 'dismissed'
  })
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode())

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent
      installEvent.preventDefault()
      setDeferredPrompt(installEvent)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const canInstall = useMemo(() => {
    return Boolean(deferredPrompt) && !dismissed && !isInstalled
  }, [deferredPrompt, dismissed, isInstalled])

  if (!canInstall) {
    return null
  }

  const handleDismiss = () => {
    window.localStorage.setItem(INSTALL_PROMPT_STORAGE_KEY, 'dismissed')
    setDismissed(true)
  }

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice

    setDeferredPrompt(null)

    if (choice.outcome === 'accepted') {
      setIsInstalled(true)
      window.localStorage.removeItem(INSTALL_PROMPT_STORAGE_KEY)
      return
    }

    handleDismiss()
  }

  return (
    <Panel
      className="p-5"
      data-testid={testIds.install.panel}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="app-eyebrow">Install app</p>
          <h3 className="text-xl font-black text-[var(--retro-ink)]">
            Reopen SeniorPath faster on mobile.
          </h3>
          <p className="app-copy mt-3 text-sm">
            Installing the PWA cuts browser friction and makes short study reps easier to repeat.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button data-testid={testIds.install.installButton} onClick={handleInstall} type="button" variant="primary">
            Install app
          </Button>
          <Button data-testid={testIds.install.dismissButton} onClick={handleDismiss} type="button" variant="ghost">
            Not now
          </Button>
        </div>
      </div>
    </Panel>
  )
}
