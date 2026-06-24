import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base'

export class LoginPage extends BasePage {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = this.page.getByTestId('email-input')
    this.passwordInput = this.page.getByTestId('password-input')
    this.loginButton = this.page.getByTestId('login-button')
    this.errorMessage = this.page.getByTestId('login-error')
  }

  async goto() {
    await this.navigate('/')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
