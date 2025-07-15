import { Page, expect } from '@playwright/test';
import { urls, selectors } from '../data/constants';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(urls.baseUrl);
  }

  async login(username: string, password: string) {
    await this.page.fill(selectors.usernameInput, username);
    await this.page.fill(selectors.passwordInput, password);
    await this.page.click(selectors.loginButton);
  }

  async expectProductsPage() {
    await expect(this.page.locator(selectors.productsTitle)).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.locator(selectors.errorMessage)).toHaveText(message);
  }
}
