export function getChallengeIndexHref(locale = 'en') {
  return locale === 'pt-br' ? '/pt-br/desafios' : '/challenges'
}
