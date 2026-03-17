import { describe, expect, it } from 'vitest'

import { createEmptyProgressStore, setCardNote, setCardStatus } from '@/lib/progress'
import {
  createUserDataBackup,
  getUserDataBackupFilename,
  parseUserDataBackup,
  serializeUserDataBackup,
} from '@/lib/user-data-backup'

describe('user data backup helpers', () => {
  it('serializes and restores a valid backup payload', () => {
    let store = createEmptyProgressStore()
    store = setCardStatus(store, 'react-rendering-core', 'derived-state', 'learned')
    store = setCardNote(store, 'react-rendering-core', 'derived-state', 'Lead with sync risk')

    const serialized = serializeUserDataBackup(store, '2026-03-17T12:00:00.000Z')
    const restored = parseUserDataBackup(serialized)

    expect(restored).toEqual(store)
  })

  it('builds a predictable filename for exported backups', () => {
    expect(getUserDataBackupFilename(new Date('2026-03-17T12:00:00.000Z'))).toBe(
      'prepdeck-backup-2026-03-17.json',
    )
  })

  it('rejects files that are not prepdeck backups', () => {
    const payload = createUserDataBackup(createEmptyProgressStore())

    expect(() =>
      parseUserDataBackup(JSON.stringify({ ...payload, app: 'other-app' })),
    ).toThrow('This file is not a Prepdeck backup.')
  })
})
