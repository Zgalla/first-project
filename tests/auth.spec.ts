import { test } from '../fixtures/auth-fixtures';
import { users } from '../data/constants';

test.describe.parallel('Авторизация пользователей на SauceDemo', () => {
  for (const user of users) {
    test(user.testName, async ({ loginAndVerify }) => {
      await loginAndVerify(user);
    });
  }
});

test('Тест с уже залогиненным стандартным пользователем', async ({ loggedInPage }) => {
  // Можно сразу проверять нужные элементы
  const shoppingCartBadge = loggedInPage.locator('.shopping_cart_badge');
  await shoppingCartBadge.waitFor({ state: 'detached' }); // Убедиться что корзина пустая
});
