const APP_PATH = '/app'

function getAppBase(appBaseUrl?: string): string {
  const normalizedBase = appBaseUrl?.trim().replace(/\/+$/, '') ?? ''

  if (!normalizedBase) {
    return APP_PATH
  }

  return normalizedBase
}

export function resolveAppHref(path: string, appBaseUrl?: string): string {
  const safePath = path.startsWith('/') ? path : `/${path}`
  return `${getAppBase(appBaseUrl)}${safePath}`
}

export function getAppHref(path: string): string {
  return resolveAppHref(path, import.meta.env.PUBLIC_APP_URL)
}
