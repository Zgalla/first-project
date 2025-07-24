import { test } from '../fixtures/auth-login-page-fixtures';
import { users } from '../data/auth-users';

test.describe('Авторизация пользователей на SauceDemo', () => {
  for (const user of users) {
    test(user.testName, async ({ loginPageAuth }) => {
      await loginPageAuth.login(user.username, user.password);

      if (user.expectSuccess) {
        await loginPageAuth.expectProductsPage();
      } else if (user.errorMessage) {
        await loginPageAuth.expectErrorMessage(user.errorMessage);
      }
    });
  }
});
