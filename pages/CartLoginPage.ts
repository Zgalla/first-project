import { Page, expect } from '@playwright/test';
import { BASE_URL, SELECTORS } from '../data/CartConstants';

export class CartLoginPage {
  private readonly page: Page;

  private usernameInput = SELECTORS.USERNAME_INPUT;
  private passwordInput = SELECTORS.PASSWORD_INPUT;
  private loginButton = SELECTORS.LOGIN_BUTTON;
  private errorMessageSelector = SELECTORS.ERROR_MESSAGE;

  constructor(page: Page) {
    this.page = page;
  }

  async openAndLogin(username?: string, password?: string) {
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      throw new Error(`Некорректные параметры логина! username: ${username}, password: ${password}`);
    }

    const maxRetries = 3;
    for (let i = 1; i <= maxRetries; i++) {
      try {
        await this.page.goto(BASE_URL, { waitUntil: 'load', timeout: 60000 });
        break;
      } catch (e) {
        if (i === maxRetries) throw e;
        await this.page.waitForTimeout(2000);
      }
    }

    await expect(this.page.locator(this.usernameInput)).toBeVisible({ timeout: 15000 });
    await expect(this.page.locator(this.passwordInput)).toBeVisible({ timeout: 15000 });
    await expect(this.page.locator(this.loginButton)).toBeVisible({ timeout: 15000 });

    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async expectLoginError(expectedMessage: string) {
    const error = this.page.locator(this.errorMessageSelector);
    await expect(error).toBeVisible({ timeout: 15000 });
    await expect(error).toHaveText(expectedMessage, { timeout: 15000 });
  }
}
