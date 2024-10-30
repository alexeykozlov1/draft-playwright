import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax")
  await page.getByText("Button Triggering AJAX Request").click()
})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
})

test('auto waiting 3', async({page}) => {
  const successButton = await page.locator('.bg-success')
  
  // POTENTIAL ERROR: Will fail, because LocatorAssertions have 5 seconds DEFAULT timout, not enough in this case
  // await expect(successButton).toHaveText('Data loaded with AJAX get request.')

  // Let's specify custom timeout - 20 seconds
  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.describe('alternative waits', () => {
  test('alternative wait for selector', async({page}) => {
      const successButton = await page.locator('.bg-success')
      
      // wait for element
      await page.waitForSelector('.bg-success')
  
      const text2 = await successButton.allTextContents()
      expect.soft(text2).toContain('Data loaded with AJAX get request.') 
  }),
  test('alternative wait for response of API call', async({page}) => {
      const successButton = await page.locator('.bg-success')

      // wait for particular display
      await page.waitForResponse('http://uitestingplayground.com/ajaxdata', {timeout: 20000})
  
      const text2 = await successButton.allTextContents()
      expect.soft(text2).toContain('Data loaded with AJAX get request.') 
  }),
  test('alternative wait for load state', async({page}) => {
      const successButton = await page.locator('.bg-success')
  
      // wait for network calls to be completed ('NOT RECOMMENDED')
      await page.waitForLoadState('networkidle')
  
      const text2 = await successButton.allTextContents()
      expect.soft(text2).toContain('Data loaded with AJAX get request.') 
  })
})

test('Timeouts demo', async ({page}) => {
  test.slow()
  const successButton = page.locator('.bg-success')
  await successButton.click()
})