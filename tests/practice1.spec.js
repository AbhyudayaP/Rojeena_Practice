import { test, expect } from '@playwright/test';
//Testing with valid users
[
  { user: 'standard_user', expected: 'Swag Labs' },
  { user: 'problem_user', expected: 'Swag Labs' },
  { user: 'visual_user', expected: 'Swag Labs' },
  { user: 'error_user', expected: 'Swag Labs' },
].forEach(({ user, expected }) => {
  test(`testing with valid user: ${user}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('//div[@class="app_logo"]')).toHaveText(expected);
  });
});
//Testing with invalid user
[
  { user: 'locked_out_user', expected: 'Epic sadface: Sorry, this user has been locked out.' },
].forEach(({ user, expected }) => {
  test(`testing with invalid user: ${user}`, async ({ page }) => {
    await page.goto(`https://www.saucedemo.com/`);
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(expected);
  });
});
