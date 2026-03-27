function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function hasLocalStorageAccess() {
  return getLocalStorage() !== null
}

export function readLocalStorageString(key: string) {
  try {
    return getLocalStorage()?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function writeLocalStorageString(key: string, value: string) {
  try {
    const storage = getLocalStorage()

    if (!storage) {
      return false
    }

    storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeLocalStorageString(key: string) {
  try {
    const storage = getLocalStorage()

    if (!storage) {
      return false
    }

    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function readLocalStorageJson<T>(key: string, fallback: T) {
  const value = readLocalStorageString(key)

  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}
