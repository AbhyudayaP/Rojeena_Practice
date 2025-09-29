const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
test('Checkout with dynamic data', async ({ page }) => {
    // Go to login page
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add products to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Go to cart
    await page.click('.shopping_cart_link');

    // Verify products in cart
    await expect(page.locator('.cart_item:has-text("Sauce Labs Backpack")')).toBeVisible();
    await expect(page.locator('.cart_item:has-text("Sauce Labs Bike Light")')).toBeVisible();

    // Checkout
    await page.click('button[data-test="checkout"]');

    // Fill checkout info with faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();

    await page.fill('input[data-test="firstName"]', firstName);
    await page.fill('input[data-test="lastName"]', lastName);
    await page.fill('input[data-test="postalCode"]', zipCode);

    await page.click('input[data-test="continue"]');

    // Finish checkout
    await page.click('button[data-test="finish"]');

    // Verify checkout success
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
