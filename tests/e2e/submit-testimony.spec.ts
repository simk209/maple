import { test, expect } from "@playwright/test"
import { BillPage } from "./page_objects/billPage"
const testUserEmail = "testimonysubmit@gmail.com"
const testUserPassword = "maple123@"

// test.describe("When user is not signed in", ()=>{
//     test("should display login/signup button on a bill page", async({page})=>{

//     })
//     test("should redirect to login/signup when button is clicked", async({page})=>{

//     })
// })

test.describe("Submit Testimony Flow for logged in User", () => {
  test.beforeEach(async ({ page }) => {
    // Log in the user
    await page.goto("http://localhost:3000")
    await page.getByRole("button", { name: "Log in / Sign up" }).click()
    await page.getByRole("button", { name: "Sign In", exact: true }).click()
    await page.fill('input[name="email"]', testUserEmail) // Use test user credentials
    await page.fill('input[name="password"]', testUserPassword)
    await page
      .getByLabel("Sign In", { exact: true })
      .getByRole("button", { name: "Sign In" })
      .click()
    const profileIcon = page.getByAltText("profile icon")
    await expect(profileIcon).toBeVisible()
  })

  test("should navigate to a bill", async ({ page }) => {
    // click browse bills
    await page.getByRole("link", { name: "Browse Bills" }).first().click()

    // select the first bill in the list
    const firstBillLink = page.locator('a[href*="/bills"]').first()
    await firstBillLink.click()
  })

  test("should successfully submit testimony when starting from the bills page", async ({
    page
  }) => {
    // go to browse bills page
    await page.goto("http://localhost:3000/bills")
    await page.waitForSelector("li.ais-Hits-item a")

    // click the first bill
    const billpage = new BillPage(page)
    await billpage.clickFirstBill()
    console.log("Clicked first bill")

    // wait for URL change
    await page.waitForURL(/\/bills\/\d+/, { timeout: 10000 })
    console.log("URL changed to bill detail")
    const currentUrl = page.url()
    console.log("Current URL:", currentUrl)

    // Listen for failed requests
    page.on("requestfailed", request => {
      console.log(`Failed request: ${request.url()}`)
    })

    // take screenshot
    await page.screenshot({ path: "screenshot.png" })
    console.log("Screenshot taken")

    // Wait for create testimony bnutton to become visible
    const createTestimonyButton = page.getByRole("button", {
      name: "Create Testimony"
    })
    console.log("Waiting for Create Testimony button...")
    await page.waitForSelector(
      'button:has-text("Create") , button:has-text("Testimony")',
      { state: "visible", timeout: 30000 }
    )
    console.log("Create Testimony button is visible")
    await expect(createTestimonyButton).toBeVisible({ timeout: 30000 }) 
    // click the create testimony button
    await createTestimonyButton.click()

    // expect to see all stance options
    const endorseRadioButton = page.getByLabel("Endorse")
    const neutralRadioButton = page.getByLabel("Neutral")
    const opposeRadioButton = page.getByLabel("Oppose")

    // can click any stance option
    await endorseRadioButton.click({ force: true })
    await neutralRadioButton.click()
    await opposeRadioButton.click()

    // clicking next with oppose selected
    const nextButton = page.getByRole("button", { name: "Next >>" })
    await nextButton.click()
  })
})
