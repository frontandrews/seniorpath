import type { ProgressStore } from '@prepdeck/schemas'
import { userDataStoreSchema } from '@prepdeck/schemas'

export const USER_DATA_BACKUP_APP = 'prepdeck'
export const USER_DATA_BACKUP_VERSION = 1

export type UserDataBackup = {
  app: typeof USER_DATA_BACKUP_APP
  exportedAt: string
  userData: ProgressStore
  version: typeof USER_DATA_BACKUP_VERSION
}

export function createUserDataBackup(
  store: ProgressStore,
  exportedAt: string = new Date().toISOString(),
): UserDataBackup {
  return {
    app: USER_DATA_BACKUP_APP,
    exportedAt,
    userData: store,
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
  store: ProgressStore,
  exportedAt?: string,
): string {
  return JSON.stringify(createUserDataBackup(store, exportedAt), null, 2)
}

export function parseUserDataBackup(raw: string): ProgressStore {
  const parsed = JSON.parse(raw) as Partial<UserDataBackup>

  if (parsed.app !== USER_DATA_BACKUP_APP || parsed.version !== USER_DATA_BACKUP_VERSION) {
    throw new Error('This file is not a Prepdeck backup.')
  }

  return userDataStoreSchema.parse(parsed.userData)
}
