import { test, expect } from '@playwright/test';
import { LoginPage } from '../utils/general/login';
import { Products } from '../utils/navigation/product';
import { PRODUCT_LOCATORS, PAYMENT_LOCATORS } from '../utils/locators';

test.describe('Extended Functional Tests', () => {
    let loginPage: LoginPage;
    let products: Products;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        products = new Products(page);
        const USER = process.env.ADMIN_USER_NAME!;
        const PASS = process.env.ADMIN_PASSWORD!;
        await loginPage.goto();
        await loginPage.login(USER, PASS);
    });

    // Test 06: Sort A-Z
    test('Sort products by Name (A to Z)', async ({ page }) => {
        await page.selectOption(PRODUCT_LOCATORS.sortContainer, 'az');
        const names = await page.locator(PRODUCT_LOCATORS.inventoryItemName).allInnerTexts();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    // Test 07: Sort Z-A
    test('Sort products by Name (Z to A)', async ({ page }) => {
        await page.selectOption(PRODUCT_LOCATORS.sortContainer, 'za');
        const names = await page.locator(PRODUCT_LOCATORS.inventoryItemName).allInnerTexts();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    // Test 08: Sort Price Low to High
    test('Sort products by Price (low to high)', async ({ page }) => {
        await page.selectOption(PRODUCT_LOCATORS.sortContainer, 'lohi');
        const prices = await page.locator(PRODUCT_LOCATORS.inventoryItemPrice).allInnerTexts();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices).toEqual(sortedPrices);
    });

    // Test 09: Sort Price High to Low
    test('Sort products by Price (high to low)', async ({ page }) => {
        await page.selectOption(PRODUCT_LOCATORS.sortContainer, 'hilo');
        const prices = await page.locator(PRODUCT_LOCATORS.inventoryItemPrice).allInnerTexts();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => b - a);
        expect(numericPrices).toEqual(sortedPrices);
    });

    // Test 10: Product Detail Navigation
    test('Navigate to Product Detail page and back', async ({ page }) => {
        const itemName = "Sauce Labs Backpack";
        await page.click(PRODUCT_LOCATORS.itemLinkByName(itemName));
        await expect(page).toHaveURL(/.*inventory-item.html/);
        await expect(page.locator('.inventory_details_name')).toHaveText(itemName);
        await page.click('#back-to-products');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    // Test 11: Add to cart from Detail page
    test('Add product to cart from Detail page', async ({ page }) => {
        await page.click(PRODUCT_LOCATORS.itemLinkByName("Sauce Labs Bike Light"));
        await page.click('button:has-text("Add to cart")');
        const badge = page.locator(PRODUCT_LOCATORS.cartBadge);
        await expect(badge).toHaveText("1");
    });

    // Test 12: Cancel Checkout
    test('Cancel checkout process returns to cart', async ({ page }) => {
        await page.click(PAYMENT_LOCATORS.backpackAddBtn);
        await page.click(PRODUCT_LOCATORS.cartLink);
        await page.click(PAYMENT_LOCATORS.checkoutBtn);
        await page.click(PAYMENT_LOCATORS.cancelBtn);
        await expect(page).toHaveURL(/.*cart.html/);
    });

    // Test 13: Complete a full transaction
    test('Successful full end-to-end purchase', async ({ page }) => {
        await page.click(PAYMENT_LOCATORS.backpackAddBtn);
        await page.click(PRODUCT_LOCATORS.cartLink);
        await page.click(PAYMENT_LOCATORS.checkoutBtn);
        await page.fill(PAYMENT_LOCATORS.firstNameField, 'John');
        await page.fill(PAYMENT_LOCATORS.lastNameField, 'Doe');
        await page.fill(PAYMENT_LOCATORS.postalCodeField, '12345');
        await page.click(PAYMENT_LOCATORS.continueBtn);
        await page.click(PAYMENT_LOCATORS.finishBtn);
        await expect(page.locator(PAYMENT_LOCATORS.completeHeader)).toHaveText('Thank you for your order!');
    });

    // Test 14: Cart Persistence after Logout
    test('Cart items persist after logout and relogin', async ({ page }) => {
        await page.click(PAYMENT_LOCATORS.backpackAddBtn);
        await expect(page.locator(PRODUCT_LOCATORS.cartBadge)).toHaveText("1");
        
        await loginPage.Logout();
        const USER = process.env.ADMIN_USER_NAME!;
        const PASS = process.env.ADMIN_PASSWORD!;
        await loginPage.login(USER, PASS);
        
        await expect(page.locator(PRODUCT_LOCATORS.cartBadge)).toHaveText("1");
    });

    // Test 15: Footer Social Links (External link check)
    test('Social media links are present in footer', async ({ page }) => {
        const twitter = page.locator('.social_twitter a');
        const facebook = page.locator('.social_facebook a');
        const linkedin = page.locator('.social_linkedin a');
        
        await expect(twitter).toHaveAttribute('href', 'https://twitter.com/saucelabs');
        await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
        await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
    });
});