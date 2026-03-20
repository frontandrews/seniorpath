export function getChallengeIndexHref(locale = 'en') {
  return locale === 'pt-br' ? '/pt-br/desafios' : '/challenges'
}

type ChallengeEntryLike = {
  id: string
  data: {
    locale?: string | null
  }
}

export function getChallengeSlugFromEntry(entry: ChallengeEntryLike) {
  return entry.id.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).at(-1) ?? ''
}

export function getChallengeHrefFromEntry(entry: ChallengeEntryLike) {
  const locale = entry.data.locale === 'pt-br' ? 'pt-br' : 'en'
  const slug = getChallengeSlugFromEntry(entry)

  return slug ? `${getChallengeIndexHref(locale)}/${slug}` : getChallengeIndexHref(locale)
}
