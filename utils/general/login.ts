import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.locator('#username');
        this.inputPassword = page.locator('#password');
        this.submitButton = page.locator('#submit');
        this.logoutButton = page.locator('xpath=/html/body/div/div/section/div/div/article/div[2]/div/div/div/a');
        this.errorMessage = page.locator('#error');
    }

    async goto() {
        await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }

    async login(user: string, pass: string) {
        await this.inputUsername.fill(user);
        await this.inputPassword.fill(pass);
        await this.submitButton.click();
    }
    async isPageLoged() {
        await expect(this.page).toHaveURL('/logged-in-successfully/')
        await expect(this.logoutButton).toBeVisible({ timeout: 10000 });
    }
    async checkLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
    async Logout() {
        await expect(this.page).toHaveURL('/logged-in-successfully/')
        await this.logoutButton.click()
    }

    async checkLogoutSuccess() {
        await expect(this.page).toHaveURL('/practice-test-login/')
        await expect(this.inputUsername).toBeVisible()
        await expect(this.inputPassword).toBeVisible()
    }
}