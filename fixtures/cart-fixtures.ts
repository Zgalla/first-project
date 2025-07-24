import { test as baseTest } from '@playwright/test';
import { CartLoginPage } from '../pages/CartLoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CREDENTIALS } from '../data/CartConstants';

type MyFixtures = {
  cartLoginPage: CartLoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  loggedInAsStandardUser: {
    cartLoginPage: CartLoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
  };
};

export const test = baseTest.extend<MyFixtures>({
  cartLoginPage: async ({ page }, use) => {
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(60000);
    await use(new CartLoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loggedInAsStandardUser: async ({ cartLoginPage, productsPage, cartPage }, use) => {
    await cartLoginPage.openAndLogin(CREDENTIALS.USERNAME, CREDENTIALS.PASSWORD);
    await productsPage.isProductsTitleVisible();
    await use({ cartLoginPage, productsPage, cartPage });
  },
});

export const expect = baseTest.expect;
