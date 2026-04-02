import { test, expect } from '@playwright/test'

test('webapp must be online', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // Expect the title to contain the text "Velô by Papito"
  await expect(page).toHaveTitle(/Velô by Papito/)
})