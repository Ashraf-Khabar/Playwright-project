import { test } from '@playwright/test';
import { LoginPage } from '../utils/general/login';
import dotenv from 'dotenv';
import { Products } from '../utils/navigation/product';

test.describe('02 - Operations On Cards', () => {

    test('Navigation On Cards', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const products = new Products(page);
        const USER = process.env.ADMIN_USER_NAME;
        const PASS = process.env.ADMIN_PASSWORD;

        if (!USER || !PASS) {
            throw new Error('ADMIN_USER_NAME and ADMIN_PASSWORD must be defined');
        }

        await loginPage.goto();
        await loginPage.login(USER, PASS);
        await products.addElementsToCart();
        await products.removeElementsFromCart();
        await loginPage.Logout();
    });

});