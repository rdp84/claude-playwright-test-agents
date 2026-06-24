import type { TestFixture, Page } from '@playwright/test'
import { LoginPage } from '@model/pages/login'

export const loginPage: TestFixture<LoginPage, { page: Page }> = async ({ page }, use) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await use(loginPage)
}
