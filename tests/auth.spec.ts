import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/constants';

test.describe('Авторизация пользователей на SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  for (const user of users) {
    test(user.testName, async () => {
      await loginPage.login(user.username, user.password);

      if (user.expectSuccess) {
        await loginPage.expectSuccessfulLogin();
      } else {
        await loginPage.expectErrorMessage(user.errorMessage!);
      }
    });
  }
});
