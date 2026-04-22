import { test } from '@playwright/test';
import { LoginPage } from '../utils/general/login';
import dotenv from 'dotenv';

test.describe('Module de Connexion', () => {

    test('Connexion success', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const USER = process.env.ADMIN_USER_NAME;
        const PASS = process.env.ADMIN_PASSWORD;

        if (!USER || !PASS) {
            throw new Error('ADMIN_USER_NAME and ADMIN_PASSWORD must be defined');
        }

        await loginPage.goto();
        await loginPage.login(USER, PASS);
        await loginPage.isPageLoged();
        await loginPage.Logout()
        await loginPage.checkLogoutSuccess()
    });

    test('Connexion failed', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('mauvais@email.com', 'mauvais-pass');
        await loginPage.checkLoginError();
    });

});