import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../data/CartConstants';

export class ProductsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isProductsTitleVisible() {
    await expect(this.page.locator(SELECTORS.PRODUCTS_TITLE)).toBeVisible({ timeout: 10000 });
  }

  async addToCart(productId: string) {
    const selector = `[data-test="add-to-cart-${productId}"]`;
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10000 });
    await this.page.click(selector);
  }

  async isRemoveButtonVisible(productId: string) {
    const selector = `[data-test="remove-${productId}"]`;
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10000 });
  }

  async openCart() {
    await expect(this.page.locator(SELECTORS.SHOPPING_CART_LINK)).toBeVisible({ timeout: 10000 });
    await this.page.click(SELECTORS.SHOPPING_CART_LINK);
  }
}
