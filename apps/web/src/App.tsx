import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/routes/app-routes'
import { ProgressProvider } from '@/state/progress-context'

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProgressProvider>
  )
}

export default App
