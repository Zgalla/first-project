import { test, expect } from '../fixtures/cart-fixtures';
import { PRODUCTS_INFO } from '../data/CartConstants';

test.describe('Тесты корзины с POM (CartLoginPage)', () => {

  test('Корзина пуста после входа', async ({ loggedInAsStandardUser }) => {
    const { productsPage, cartPage } = loggedInAsStandardUser;
    await productsPage.openCart();
    await cartPage.expectCartIsEmpty();
  });

  test('Добавление 1 товара в корзину', async ({ loggedInAsStandardUser }) => {
    const { productsPage, cartPage } = loggedInAsStandardUser;
    await productsPage.addToCart(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.isRemoveButtonVisible(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.openCart();
    await cartPage.expectNumberOfItemsInCart(1);
  });

  test('Добавление второго товара в корзину', async ({ loggedInAsStandardUser }) => {
    const { productsPage, cartPage } = loggedInAsStandardUser;
    await productsPage.addToCart(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.addToCart(PRODUCTS_INFO.BIKE_LIGHT_ID);
    await productsPage.isRemoveButtonVisible(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.isRemoveButtonVisible(PRODUCTS_INFO.BIKE_LIGHT_ID);
    await productsPage.openCart();
    await cartPage.expectNumberOfItemsInCart(2);
  });

  test('Удаление одного из двух товаров из корзины', async ({ loggedInAsStandardUser }) => {
    const { productsPage, cartPage } = loggedInAsStandardUser;
    await productsPage.addToCart(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.addToCart(PRODUCTS_INFO.BIKE_LIGHT_ID);
    await productsPage.openCart();
    await cartPage.removeFromCart(PRODUCTS_INFO.BIKE_LIGHT_ID);
    await cartPage.expectItemNotPresentInCart(PRODUCTS_INFO.BIKE_LIGHT_ID);
    await cartPage.expectNumberOfItemsInCart(1);
  });

  test('Удаление последнего товара из корзины и проверка, что корзина пуста', async ({ loggedInAsStandardUser }) => {
    const { productsPage, cartPage } = loggedInAsStandardUser;
    await productsPage.addToCart(PRODUCTS_INFO.BACKPACK_ID);
    await productsPage.openCart();
    await cartPage.removeFromCart(PRODUCTS_INFO.BACKPACK_ID);
    await cartPage.expectCartIsEmpty();
  });

});
