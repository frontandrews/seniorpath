import { expect, test } from '@playwright/test'
import { e2eHookSelectors } from './support/hooks'

function readCompletedIds() {
  const storageKey = Object.keys(window.localStorage).find((key) => key.endsWith('.completed-articles.v1'))

  if (!storageKey) {
    return []
  }

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
  } catch {
    return []
  }
}

test('persists concept completion and allows resetting it', async ({ page }) => {
  const markUnreadButton = page.locator(e2eHookSelectors.markUnreadButton).first()
  const completionId = 'concept:content-contract'

  await page.goto('/concepts/content-contract')

  await page.evaluate(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' })
  })

  await expect
    .poll(() => page.evaluate(readCompletedIds))
    .toContain(completionId)

  await expect(markUnreadButton).toBeVisible()

  await page.reload()
  await expect(markUnreadButton).toBeVisible()

  await markUnreadButton.click()

  await expect
    .poll(() => page.evaluate(readCompletedIds))
    .not.toContain(completionId)
})
