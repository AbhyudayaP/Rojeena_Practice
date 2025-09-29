const { test, expect } = require('@playwright/test');

test('add product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory\.html/);

    // Add Sauce Labs Backpack to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Verify cart badge shows 1 item
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
});