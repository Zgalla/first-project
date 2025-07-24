import { test, expect } from '../fixtures/auth-login-page-fixtures';

test('успешный вход стандартным пользователем', async ({ loginPageAuth }) => {
  await loginPageAuth.login('standard_user', 'secret_sauce');
  // Дополнительные проверки после успешного входа, например:
  await expect(loginPageAuth.page.locator('.inventory_list')).toBeVisible();
});
