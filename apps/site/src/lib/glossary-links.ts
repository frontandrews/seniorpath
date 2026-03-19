type GlossaryEntryLike = {
  id: string
  data: {
    locale?: string | null
  }
}

export function getGlossaryIndexHref(locale = 'en') {
  return locale === 'pt-br' ? '/pt-br/glossario' : '/glossary'
}

export function getGlossaryHrefFromEntry(entry: GlossaryEntryLike) {
  const locale = entry.data.locale === 'pt-br' ? 'pt-br' : 'en'
  const slug = entry.id.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).at(-1)

  return slug ? `${getGlossaryIndexHref(locale)}/${slug}` : getGlossaryIndexHref(locale)
}
