import { readLocalStorageString, writeLocalStorageString } from '@/lib/local-storage'
import { siteEvents, siteStorageKeys } from '@/lib/site-config'

type ChallengeSolvedDetail = {
  challengeId: string
}

function getLegacyChallengeSolvedStorageKey(challengeId: string) {
  return challengeId ? `challenge-solved-${challengeId}` : ''
}

export function getChallengeSolvedStorageKey(challengeId: string) {
  return challengeId ? `${siteStorageKeys.challengeSolvedPrefix}.${challengeId}.v1` : ''
}

export function readChallengeSolvedState(challengeId: string) {
  const storageKey = getChallengeSolvedStorageKey(challengeId)
  const legacyStorageKey = getLegacyChallengeSolvedStorageKey(challengeId)

  if (!storageKey) {
    return false
  }

  return readLocalStorageString(storageKey) === '1' || readLocalStorageString(legacyStorageKey) === '1'
}

export function markChallengeSolved(challengeId: string) {
  const storageKey = getChallengeSolvedStorageKey(challengeId)

  if (!storageKey || typeof window === 'undefined') {
    return false
  }

  const didPersist = writeLocalStorageString(storageKey, '1')

  window.dispatchEvent(
    new CustomEvent<ChallengeSolvedDetail>(siteEvents.challengeSolved, {
      detail: { challengeId },
    }),
  )

  return didPersist
}
