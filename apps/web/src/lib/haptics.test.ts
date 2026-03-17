import { describe, expect, it, vi } from 'vitest'

import { triggerHapticFeedback } from '@/lib/haptics'

describe('haptics', () => {
  it('does nothing when haptics are disabled', () => {
    const vibrate = vi.fn()

    const result = triggerHapticFeedback('reveal', {
      enabled: false,
      navigatorRef: { vibrate } as Navigator & { vibrate: typeof vibrate },
    })

    expect(result).toBe(false)
    expect(vibrate).not.toHaveBeenCalled()
  })

  it('uses the right vibration pattern when supported', () => {
    const vibrate = vi.fn().mockReturnValue(true)

    const result = triggerHapticFeedback('rate_learned', {
      enabled: true,
      navigatorRef: { vibrate } as Navigator & { vibrate: typeof vibrate },
    })

    expect(result).toBe(true)
    expect(vibrate).toHaveBeenCalledWith([12, 28, 14])
  })

  it('returns false when the browser does not support vibration', () => {
    const result = triggerHapticFeedback('session_complete', {
      enabled: true,
      navigatorRef: {} as Navigator,
    })

    expect(result).toBe(false)
  })
})
