import { Page, expect } from '@playwright/test';
import { selectors, baseUrl } from '../data/constants';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {
    await expect(this.page.locator(selectors.usernameInput)).toBeVisible();
    await expect(this.page.locator(selectors.passwordInput)).toBeVisible();

    await this.page.fill(selectors.usernameInput, username);
    await this.page.fill(selectors.passwordInput, password);

    await expect(this.page.locator(selectors.loginButton)).toBeVisible();
    await this.page.click(selectors.loginButton);
  }

  async expectSuccessfulLogin() {
    await expect(this.page.locator(selectors.productsTitle)).toHaveText('Products');
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.locator(selectors.errorMessage)).toHaveText(message);
  }
}
