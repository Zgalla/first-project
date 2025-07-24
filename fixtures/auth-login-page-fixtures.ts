import { test as base, expect, type Page } from '@playwright/test';
import { LoginPageAuth } from '../pages/LoginPageAuth';

type MyFixtures = {
  loginPageAuth: LoginPageAuth;
  page: Page;
};

export const test = base.extend<MyFixtures>({
  loginPageAuth: async ({ page }, use) => {
    const loginPageAuth = new LoginPageAuth(page);
    await loginPageAuth.goto();
    await use(loginPageAuth);
  },
});

export { expect };
