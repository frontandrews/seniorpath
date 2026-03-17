import type { ProgressStore, SessionHistoryStore } from '@prepdeck/schemas'
import { sessionHistoryStoreSchema, userDataStoreSchema } from '@prepdeck/schemas'

import { normalizeSessionHistoryStore } from '@/lib/session-history'

export const USER_DATA_BACKUP_APP = 'prepdeck'
export const USER_DATA_BACKUP_VERSION = 2

export type LocalDataSnapshot = {
  progressStore: ProgressStore
  sessionHistoryStore: SessionHistoryStore
}

export type UserDataBackup = {
  app: typeof USER_DATA_BACKUP_APP
  exportedAt: string
  sessionHistory: SessionHistoryStore
  userData: ProgressStore
  version: typeof USER_DATA_BACKUP_VERSION
}

export function createUserDataBackup(
  snapshot: LocalDataSnapshot,
  exportedAt: string = new Date().toISOString(),
): UserDataBackup {
  return {
    app: USER_DATA_BACKUP_APP,
    exportedAt,
    sessionHistory: snapshot.sessionHistoryStore,
    userData: snapshot.progressStore,
    version: USER_DATA_BACKUP_VERSION,
  }
}

export function getUserDataBackupFilename(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `prepdeck-backup-${year}-${month}-${day}.json`
}

export function serializeUserDataBackup(
  snapshot: LocalDataSnapshot,
  exportedAt?: string,
): string {
  return JSON.stringify(createUserDataBackup(snapshot, exportedAt), null, 2)
}

export function parseUserDataBackup(raw: string): LocalDataSnapshot {
  const parsed = JSON.parse(raw) as {
    app?: string
    sessionHistory?: unknown
    userData?: unknown
    version?: number
  }

  if (parsed.app === USER_DATA_BACKUP_APP && parsed.version === USER_DATA_BACKUP_VERSION) {
    return {
      progressStore: userDataStoreSchema.parse(parsed.userData),
      sessionHistoryStore: normalizeSessionHistoryStore(
        sessionHistoryStoreSchema.parse(parsed.sessionHistory),
      ),
    }
  }

  if (parsed.app === USER_DATA_BACKUP_APP && parsed.version === 1) {
    return {
      progressStore: userDataStoreSchema.parse(parsed.userData),
      sessionHistoryStore: sessionHistoryStoreSchema.parse({
        version: 1,
      }),
    }
  }

  throw new Error('This file is not a Prepdeck backup.')
}
