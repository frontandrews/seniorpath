import type { ProgressStatus, ProgressStore } from '@prepdeck/schemas'
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  readProgressStore,
  rememberDeckPosition as rememberDeckPositionInStore,
  resetAllProgress as resetAllProgressInStore,
  resetDeck as resetDeckInStore,
  setCardStatus as setCardStatusInStore,
  setLearnedToUnseen as setLearnedToUnseenInStore,
  writeProgressStore,
} from '@/lib/progress'

type ProgressContextValue = {
  progressStore: ProgressStore
  rememberDeckPosition: (deckId: string, cardId: string | null) => void
  resetAllProgress: () => void
  resetDeckProgress: (deckId: string) => void
  setCardStatus: (deckId: string, cardId: string, status: ProgressStatus) => void
  setLearnedToUnseen: (deckId: string, cardId: string) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progressStore, setProgressStore] = useState<ProgressStore>(() => readProgressStore())

  useEffect(() => {
    writeProgressStore(progressStore)
  }, [progressStore])

  const rememberDeckPosition = useCallback((deckId: string, cardId: string | null) => {
    setProgressStore((currentStore) =>
      rememberDeckPositionInStore(currentStore, deckId, cardId),
    )
  }, [])

  const setCardStatus = useCallback(
    (deckId: string, cardId: string, status: ProgressStatus) => {
      setProgressStore((currentStore) =>
        setCardStatusInStore(currentStore, deckId, cardId, status),
      )
    },
    [],
  )

  const resetDeckProgress = useCallback((deckId: string) => {
    setProgressStore((currentStore) => resetDeckInStore(currentStore, deckId))
  }, [])

  const resetAllProgress = useCallback(() => {
    setProgressStore(resetAllProgressInStore())
  }, [])

  const setLearnedToUnseen = useCallback((deckId: string, cardId: string) => {
    setProgressStore((currentStore) => setLearnedToUnseenInStore(currentStore, deckId, cardId))
  }, [])

  const value = useMemo(
    () => ({
      progressStore,
      rememberDeckPosition,
      resetAllProgress,
      resetDeckProgress,
      setCardStatus,
      setLearnedToUnseen,
    }),
    [
      progressStore,
      rememberDeckPosition,
      resetAllProgress,
      resetDeckProgress,
      setCardStatus,
      setLearnedToUnseen,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)

  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }

  return context
}
