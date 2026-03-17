import type { ProgressStore } from '@prepdeck/schemas'
import type { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { STORAGE_KEY } from '@/lib/progress'
import { AppRoutes } from '@/routes/app-routes'
import { ProgressProvider } from '@/state/progress-context'

function Providers({
  children,
  initialEntries = ['/'],
}: PropsWithChildren<{ initialEntries?: string[] }>) {
  return (
    <ProgressProvider>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ProgressProvider>
  )
}

export function seedProgress(store: ProgressStore) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function renderApp(initialEntries: string[] = ['/']) {
  return render(<AppRoutes />, {
    wrapper: ({ children }) => (
      <Providers initialEntries={initialEntries}>{children}</Providers>
    ),
  })
}
