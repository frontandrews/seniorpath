import type {
  ProgressStatus,
  ProgressStore,
  SessionHistoryStore,
} from '@prepdeck/schemas'
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
import {
  normalizeSessionHistoryStore,
  readSessionHistoryStore,
  recordCompletedSession as recordCompletedSessionInStore,
  resetSessionHistory as resetSessionHistoryInStore,
  type SessionHistoryInput,
  writeSessionHistoryStore,
} from '@/lib/session-history'

type LocalDataSnapshot = {
  progressStore: ProgressStore
  sessionHistoryStore: SessionHistoryStore
}

type ProgressContextValue = {
  clearCardNote: (deckId: string, cardId: string) => void
  getCardNote: (deckId: string, cardId: string) => string
  progressStore: ProgressStore
  recordCompletedSession: (session: SessionHistoryInput) => void
  rememberDeckPosition: (deckId: string, cardId: string | null) => void
  replaceLocalData: (snapshot: LocalDataSnapshot) => void
  resetAllProgress: () => void
  resetDeckProgress: (deckId: string) => void
  setCardNote: (deckId: string, cardId: string, note: string) => void
  setCardStatus: (deckId: string, cardId: string, status: ProgressStatus) => void
  setLearnedToUnseen: (deckId: string, cardId: string) => void
  sessionHistoryStore: SessionHistoryStore
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progressStore, setProgressStore] = useState<ProgressStore>(() => readProgressStore())
  const [sessionHistoryStore, setSessionHistoryStore] = useState<SessionHistoryStore>(() =>
    readSessionHistoryStore(),
  )

  useEffect(() => {
    writeProgressStore(progressStore)
  }, [progressStore])

  useEffect(() => {
    writeSessionHistoryStore(sessionHistoryStore)
  }, [sessionHistoryStore])

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
    setSessionHistoryStore(resetSessionHistoryInStore())
  }, [])

  const replaceLocalData = useCallback((snapshot: LocalDataSnapshot) => {
    setProgressStore(snapshot.progressStore)
    setSessionHistoryStore(normalizeSessionHistoryStore(snapshot.sessionHistoryStore))
  }, [])

  const setLearnedToUnseen = useCallback((deckId: string, cardId: string) => {
    setProgressStore((currentStore) => setLearnedToUnseenInStore(currentStore, deckId, cardId))
  }, [])

  const clearCardNote = useCallback((deckId: string, cardId: string) => {
    setProgressStore((currentStore) => clearCardNoteInStore(currentStore, deckId, cardId))
  }, [])

  const recordCompletedSession = useCallback((session: SessionHistoryInput) => {
    setSessionHistoryStore((currentStore) =>
      recordCompletedSessionInStore(currentStore, session),
    )
  }, [])

  const value = useMemo(
    () => ({
      clearCardNote,
      getCardNote,
      progressStore,
      recordCompletedSession,
      rememberDeckPosition,
      replaceLocalData,
      resetAllProgress,
      resetDeckProgress,
      setCardNote,
      setCardStatus,
      setLearnedToUnseen,
      sessionHistoryStore,
    }),
    [
      clearCardNote,
      getCardNote,
      progressStore,
      recordCompletedSession,
      rememberDeckPosition,
      replaceLocalData,
      resetAllProgress,
      resetDeckProgress,
      setCardNote,
      setCardStatus,
      setLearnedToUnseen,
      sessionHistoryStore,
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
