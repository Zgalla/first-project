import { Page, expect } from '@playwright/test';

export class LoginPageAuth {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.page.goto('https://www.saucedemo.com/', {
          timeout: 60000,
          waitUntil: 'networkidle',
        });
        return;
      } catch (error) {
        if (attempt === retries) throw error;
        console.warn(`Попытка ${attempt} не удалась: ${error}. Повтор через 2 секунды...`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');

    // Ждём загрузки страницы: чтобы убеждаться, что переход завершился
    await this.page.waitForLoadState('networkidle');

    // Для дополнительной диагностики (можно закомментировать)
    // console.log('URL после логина:', this.page.url());
    // console.log(await this.page.content());
  }

  async expectProductsPage() {
    // Увеличенный таймаут ожидания компонента
    await expect(this.page.locator('.title')).toBeVisible({ timeout: 10000 });
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message, { timeout: 10000 });
  }
}
