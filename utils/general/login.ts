import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;
    readonly errorMessage: Locator;
    readonly sideBarButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.locator('#user-name');
        this.inputPassword = page.locator('#password');
        this.submitButton = page.locator('#login-button');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.errorMessage = page.locator('xpath=/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3');
        this.sideBarButton = page.locator('#react-burger-menu-btn')
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, pass: string) {
        await this.inputUsername.fill(user);
        await this.inputPassword.fill(pass);
        await this.submitButton.click();
    }

    async isPageLoged() {
        await expect(this.page).toHaveURL('/inventory.html')
        await expect(this.logoutButton).toBeVisible({ timeout: 10000 });
    }

    async checkLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }

    async Logout() {
        await expect(this.page).toHaveURL('/inventory.html')
        await this.sideBarButton.click()
        await this.logoutButton.click()
    }

    async checkLogoutSuccess() {
        await expect(this.page).toHaveURL('/')
        await expect(this.inputUsername).toBeVisible()
        await expect(this.inputPassword).toBeVisible()
    }
}