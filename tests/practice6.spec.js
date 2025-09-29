const { test, expect } = require('@playwright/test');

// Page Objects

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.backpackAddBtn = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.bikeLightAddBtn = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.fleeceJacketAddBtn = page.locator('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async addProductsToCart() {
        await this.backpackAddBtn.click();
        await this.bikeLightAddBtn.click();
        await this.fleeceJacketAddBtn.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
    }

    async getCartItemNames() {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }
}

// Test

test('Add products to cart and verify using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductsToCart();
    await productsPage.goToCart();

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
    expect(itemNames).toContain('Sauce Labs Fleece Jacket');
});