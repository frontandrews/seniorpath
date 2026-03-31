const PAGINATION_PATH_RE = /\/page\/\d+\/?$/u

export function shouldIncludeInSitemap(pageUrl) {
  try {
    return !PAGINATION_PATH_RE.test(new URL(pageUrl).pathname)
  } catch {
    return false
  }
}
