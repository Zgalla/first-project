import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/constants';

test.describe('Авторизация пользователей на SauceDemo', () => {
  for (const user of users) {
    test(user.testName, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectSuccess) {
        await loginPage.expectSuccessfulLogin();
      } else {
        await loginPage.expectErrorMessage(user.errorMessage!);
      }
    });
  }
});
