export type StorageAdapter = {
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
  setItem: (key: string, value: string) => void
}

export function getBrowserStorageAdapter(): StorageAdapter | null {
  const storage = globalThis.localStorage

  if (!storage) {
    return null
  }

  return {
    getItem: (key) => storage.getItem(key),
    removeItem: (key) => storage.removeItem(key),
    setItem: (key, value) => storage.setItem(key, value),
  }
}
