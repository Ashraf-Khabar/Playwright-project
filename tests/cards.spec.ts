import { test } from '@playwright/test';
import { LoginPage } from '../utils/general/login';
import dotenv from 'dotenv';
import { Products } from '../utils/navigation/product';

test.describe('Module de Cards', () => {

    test('Navigation on cards', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const products = new Products(page);
        const USER = process.env.ADMIN_USER_NAME;
        const PASS = process.env.ADMIN_PASSWORD;

        console.log(USER)

        if (!USER || !PASS) {
            throw new Error('ADMIN_USER_NAME and ADMIN_PASSWORD must be defined');
        }
        await loginPage.goto()
        await loginPage.login(USER, PASS)
        await products.ListingAllElements()
    });

});