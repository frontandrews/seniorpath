import { describe, expect, it } from 'vitest'

import { createEmptyProgressStore, setCardNote, setCardStatus } from '@/lib/progress'
import {
  createEmptySessionHistoryStore,
  recordCompletedSession,
} from '@/lib/session-history'
import {
  createUserDataBackup,
  getUserDataBackupFilename,
  parseUserDataBackup,
  serializeUserDataBackup,
} from '@/lib/user-data-backup'

describe('user data backup helpers', () => {
  it('serializes and restores a valid backup payload', () => {
    let progressStore = createEmptyProgressStore()
    progressStore = setCardStatus(progressStore, 'react-rendering-core', 'derived-state', 'learned')
    progressStore = setCardNote(
      progressStore,
      'react-rendering-core',
      'derived-state',
      'Lead with sync risk',
    )
    let sessionHistoryStore = createEmptySessionHistoryStore()
    sessionHistoryStore = recordCompletedSession(
      sessionHistoryStore,
      {
        cardCount: 2,
        deckId: 'react-rendering-core',
        deckTitle: 'React Rendering Core',
        format: 'flashcards',
        kind: 'deck',
        learnedCount: 2,
        notLearnedCount: 0,
        partialCount: 0,
        scopeLabel: 'Full deck',
        sessionLabel: 'React Rendering Core',
      },
      '2026-03-17T12:00:00.000Z',
    )

    const serialized = serializeUserDataBackup(
      {
        progressStore,
        sessionHistoryStore,
      },
      '2026-03-17T12:00:00.000Z',
    )
    const restored = parseUserDataBackup(serialized)

    expect(restored).toEqual({
      progressStore,
      sessionHistoryStore,
    })
  })

  it('builds a predictable filename for exported backups', () => {
    expect(getUserDataBackupFilename(new Date('2026-03-17T12:00:00.000Z'))).toBe(
      'prepdeck-backup-2026-03-17.json',
    )
  })

  it('rejects files that are not prepdeck backups', () => {
    const payload = createUserDataBackup({
      progressStore: createEmptyProgressStore(),
      sessionHistoryStore: createEmptySessionHistoryStore(),
    })

    expect(() =>
      parseUserDataBackup(JSON.stringify({ ...payload, app: 'other-app' })),
    ).toThrow('This file is not a Prepdeck backup.')
  })

  it('accepts older backups that do not include session history yet', () => {
    const restored = parseUserDataBackup(
      JSON.stringify({
        app: 'prepdeck',
        exportedAt: '2026-03-17T12:00:00.000Z',
        userData: createEmptyProgressStore(),
        version: 1,
      }),
    )

    expect(restored.progressStore).toEqual(createEmptyProgressStore())
    expect(restored.sessionHistoryStore).toEqual(createEmptySessionHistoryStore())
  })
})
