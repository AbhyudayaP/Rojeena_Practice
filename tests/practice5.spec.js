const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvFilePath = path.join(__dirname, 'E:\\PW-Project\\Playwright\\userdata\\userdata.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const users = parse(csvData, {
    columns: true,
    skip_empty_lines: true
});

users.filter(user => user.username).forEach(user => {
    test(`Login test for ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');

        if (user.expected === 'success') {
            await expect(page).toHaveURL(/inventory\.html/);
            await expect(page.locator('.inventory_list')).toBeVisible();
        } else {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
            await expect(page.locator('[data-test="error"]')).toContainText(user.expected);
        }
    });
});
