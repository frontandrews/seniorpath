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
  clearCardNote as clearCardNoteInStore,
  getCardNote as getCardNoteFromStore,
  readProgressStore,
  rememberDeckPosition as rememberDeckPositionInStore,
  resetAllProgress as resetAllProgressInStore,
  resetDeck as resetDeckInStore,
  setCardNote as setCardNoteInStore,
  setCardStatus as setCardStatusInStore,
  setLearnedToUnseen as setLearnedToUnseenInStore,
  writeProgressStore,
} from '@/lib/progress'

type ProgressContextValue = {
  clearCardNote: (deckId: string, cardId: string) => void
  getCardNote: (deckId: string, cardId: string) => string
  progressStore: ProgressStore
  rememberDeckPosition: (deckId: string, cardId: string | null) => void
  replaceProgressStore: (store: ProgressStore) => void
  resetAllProgress: () => void
  resetDeckProgress: (deckId: string) => void
  setCardNote: (deckId: string, cardId: string, note: string) => void
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

  const getCardNote = useCallback(
    (deckId: string, cardId: string) => getCardNoteFromStore(progressStore, deckId, cardId),
    [progressStore],
  )

  const setCardStatus = useCallback(
    (deckId: string, cardId: string, status: ProgressStatus) => {
      setProgressStore((currentStore) =>
        setCardStatusInStore(currentStore, deckId, cardId, status),
      )
    },
    [],
  )

  const setCardNote = useCallback((deckId: string, cardId: string, note: string) => {
    setProgressStore((currentStore) => setCardNoteInStore(currentStore, deckId, cardId, note))
  }, [])

  const resetDeckProgress = useCallback((deckId: string) => {
    setProgressStore((currentStore) => resetDeckInStore(currentStore, deckId))
  }, [])

  const resetAllProgress = useCallback(() => {
    setProgressStore(resetAllProgressInStore())
  }, [])

  const replaceProgressStore = useCallback((store: ProgressStore) => {
    setProgressStore(store)
  }, [])

  const setLearnedToUnseen = useCallback((deckId: string, cardId: string) => {
    setProgressStore((currentStore) => setLearnedToUnseenInStore(currentStore, deckId, cardId))
  }, [])

  const clearCardNote = useCallback((deckId: string, cardId: string) => {
    setProgressStore((currentStore) => clearCardNoteInStore(currentStore, deckId, cardId))
  }, [])

  const value = useMemo(
    () => ({
      clearCardNote,
      getCardNote,
      progressStore,
      rememberDeckPosition,
      replaceProgressStore,
      resetAllProgress,
      resetDeckProgress,
      setCardNote,
      setCardStatus,
      setLearnedToUnseen,
    }),
    [
      clearCardNote,
      getCardNote,
      progressStore,
      rememberDeckPosition,
      replaceProgressStore,
      resetAllProgress,
      resetDeckProgress,
      setCardNote,
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
