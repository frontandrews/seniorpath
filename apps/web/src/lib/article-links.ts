const BLOG_PATH = '/blog'

function getBlogBase(siteBaseUrl?: string): string {
  const normalizedBase = siteBaseUrl?.trim().replace(/\/+$/, '') ?? ''

  if (!normalizedBase) {
    return BLOG_PATH
  }

  return normalizedBase.endsWith(BLOG_PATH) ? normalizedBase : `${normalizedBase}${BLOG_PATH}`
}

export function resolveArticleHref(slug: string, siteBaseUrl?: string): string {
  return `${getBlogBase(siteBaseUrl)}/${slug}`
}

export function getArticleHref(slug: string): string {
  return resolveArticleHref(slug, import.meta.env.VITE_PUBLIC_SITE_URL)
}
