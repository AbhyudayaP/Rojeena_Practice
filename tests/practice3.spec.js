const { test, expect } = require('@playwright/test');

test('SauceDemo checkout flow', async ({ page }) => {
    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add Sauce Labs Backpack to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart
    await page.click('.shopping_cart_link');

    // Click checkout
    await page.click('button[data-test="checkout"]');

    // Fill checkout info
    await page.fill('input[data-test="firstName"]', 'John');
    await page.fill('input[data-test="lastName"]', 'Doe');
    await page.fill('input[data-test="postalCode"]', '123456');
    await page.click('input[data-test="continue"]');

    // Finish checkout
    await page.click('button[data-test="finish"]');

    // Verify success message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});