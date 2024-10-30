import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // await page.goto("http://localhost:4200/pages/iot-dashboard")
  await page.goto("/")
  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
})

test('Locator syntax rules @smoke', async ({ page }) => {
  //by tag name
  page.locator('input')
  //by id
  await page.locator('#inputEmail1').click()
  //by class
  page.locator('.shape-rectangle')
  //by attribute
  page.locator('[placeholder="Email"]')
  //full class value
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  //combination
  page.locator('input[placeholder="Email"][nbinput]')
  //by xpath
  page.locator('//*[@id="inputEmail1')
  //partial text
  page.locator(':text("Using")')
  //exact text
  page.locator(':text-is("Using the Grid")')
  
})

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: "Email" }).first().click()
  await page.getByRole('button', { name: "Sign in" }).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTitle('IoT Dashboard').click()

})

test('locating child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async({page})=>{
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: "Email" }).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', { name: "Email" }).click()
  
})

test('assertions', async({page})=>{
//general
const value = 5
expect(value).toEqual(5)

await page.pause()
})


