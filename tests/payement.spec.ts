import { test } from '@playwright/test';
import { LoginPage } from '../utils/general/login';
import dotenv from 'dotenv';
import { Payements } from '../utils/navigation/payement';

test.describe('03 - Pyaement on cards', () => {

    test('Payement on cards', async ({ page }) => {
        // create an object of the Page :
        const login = new LoginPage(page);
        const payement = new Payements(page);

        // declaration of variables :
        const USER = process.env.ADMIN_USER_NAME;
        const PASS = process.env.ADMIN_PASSWORD;
        if (!USER || !PASS) {
            throw new Error('ADMIN_USER_NAME and ADMIN_PASSWORD must be defined');
        }

        // Login on the app :
        await login.goto();
        await login.login(USER, PASS);
        await payement.addTheFirstElementToBasket()
    });

});