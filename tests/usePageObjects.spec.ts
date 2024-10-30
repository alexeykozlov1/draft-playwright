import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

// Before test (this is a Hook)
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard') // ('/') - means, that PW needs to look for baseURL env variable inside playwright.config.ts
})

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@s.com", "Welcome me", "Option 1")
})