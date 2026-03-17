export type HapticKind = 'reveal' | 'rate_learned' | 'rate_not_learned' | 'rate_partial' | 'session_complete'

const HAPTIC_PATTERNS: Record<HapticKind, number | number[]> = {
  reveal: 12,
  rate_learned: [12, 28, 14],
  rate_not_learned: [18, 44, 18],
  rate_partial: [14, 30, 10],
  session_complete: [18, 36, 18, 42, 28],
}

type VibrateNavigator = Navigator & {
  vibrate?: (pattern: number | number[]) => boolean
}

export function triggerHapticFeedback(
  kind: HapticKind,
  options: {
    enabled: boolean
    navigatorRef?: VibrateNavigator
  },
) {
  if (!options.enabled) {
    return false
  }

  const navigatorRef = options.navigatorRef ?? ((typeof navigator === 'undefined' ? undefined : navigator) as VibrateNavigator | undefined)

  if (!navigatorRef?.vibrate) {
    return false
  }

  return navigatorRef.vibrate(HAPTIC_PATTERNS[kind])
}
