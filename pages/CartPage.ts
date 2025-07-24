import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../data/CartConstants';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCartIsEmpty() {
    await expect(this.page.locator(SELECTORS.REMOVE_ANY_ITEM)).toHaveCount(0, { timeout: 10000 });
  }

  async expectNumberOfItemsInCart(count: number) {
    await expect(this.page.locator(SELECTORS.REMOVE_ANY_ITEM)).toHaveCount(count, { timeout: 10000 });
  }

  async removeFromCart(productId: string) {
    const selector = `[data-test="remove-${productId}"]`;
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10000 });
    await this.page.click(selector);
  }

  async expectItemNotPresentInCart(productId: string) {
    const selector = `[data-test="remove-${productId}"]`;
    await expect(this.page.locator(selector)).not.toBeVisible({ timeout: 10000 });
  }
}
