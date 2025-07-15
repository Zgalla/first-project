import { test, expect, Page } from '@playwright/test';

// Локаторы — вынесены в переменные для удобства поддержки
const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  productsTitle: '.title',
};

// Тестовые данные пользователей
const users = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход стандартного пользователя',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectSuccess: false,
    errorMessage: 'Epic sadface: Sorry, this user has been locked out.',
    testName: 'Ошибка входа заблокированного пользователя',
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя с проблемами',
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя с задержками',
  },
  {
    username: 'error_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя, вызывающего ошибки',
  },
  {
    username: 'visual_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход визуального пользователя',
  },
];
// Функция для выполнения логина
async function login(page: Page, username: string, password: string) {
  await expect(page.locator(selectors.usernameInput)).toBeVisible();
  await expect(page.locator(selectors.passwordInput)).toBeVisible();

  await page.fill(selectors.usernameInput, username);
  await page.fill(selectors.passwordInput, password);

  await expect(page.locator(selectors.loginButton)).toBeVisible();
  await page.click(selectors.loginButton);
}

// Группировка тестов с предусловием
test.describe('Авторизация пользователей на SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Генерируем тесты для каждого пользователя из массива users
  for (const user of users) {
    test(user.testName, async ({ page }) => {
      await login(page, user.username, user.password);

      if (user.expectSuccess) {
        // Проверяем успешный вход — заголовок "Products"
        await expect(page.locator(selectors.productsTitle)).toHaveText('Products');
      } else {
        // Проверяем сообщение об ошибке
        await expect(page.locator(selectors.errorMessage)).toHaveText(user.errorMessage!);
      }
    });
  }
});

