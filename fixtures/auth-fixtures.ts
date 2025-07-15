import { test as baseTest, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../data/constants';

type MyFixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
  loginAndVerify: (user: User) => Promise<void>;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectProductsPage();
    await use(page);
  },

  loginAndVerify: async ({ loginPage }, use) => {
    const fn = async (user: User) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectSuccess) {
        await loginPage.expectProductsPage();
      } else if (user.errorMessage) {
        await loginPage.expectErrorMessage(user.errorMessage);
      } else {
        throw new Error(`User ${user.username} ожидает ошибку, но errorMessage не задан.`);
      }
    };
    await use(fn);
  },
});
