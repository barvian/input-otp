import { test, expect } from '@playwright/test'

const modifier = process.platform === 'darwin' ? 'Meta' : 'Control'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3039/base')
})

test.describe('Base tests - Render', () => {
  test('should expose focus flags', async ({ page }) => {
    const input = page.getByTestId('otp-input-wrapper').getByRole('textbox')
    const renderer = page.getByTestId('otp-input-renderer')

    await input.focus()
    await expect(renderer).toHaveAttribute('data-test-render-is-focused', 'true')

    await input.blur()
    await page.waitForTimeout(100)
    await expect(renderer).not.toHaveAttribute('data-test-render-is-focused')
  })
  test('should expose hover flags', async ({ page }) => {
    const renderer = page.getByTestId('otp-input-renderer')

    await expect(renderer).not.toHaveAttribute('data-test-render-is-hovering')

    await renderer.hover()
    await expect(renderer).toHaveAttribute('data-test-render-is-hovering', 'true')
  })
})
