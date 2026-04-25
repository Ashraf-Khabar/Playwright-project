import { Page, Locator, expect } from "@playwright/test";
import { LOGIN_LOCATORS } from "../locators";

export class LoginPage {
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;
    readonly errorMessage: Locator;
    readonly sideBarButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.locator(LOGIN_LOCATORS.username);
        this.inputPassword = page.locator(LOGIN_LOCATORS.password);
        this.submitButton = page.locator(LOGIN_LOCATORS.loginButton);
        this.logoutButton = page.locator(LOGIN_LOCATORS.logoutButton);
        this.errorMessage = page.locator(LOGIN_LOCATORS.errorMessage);
        this.sideBarButton = page.locator(LOGIN_LOCATORS.sideBar);
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(user: string, pass: string) {
        await this.inputUsername.fill(user);
        await this.inputPassword.fill(pass);
        await this.submitButton.click();
    }

    async isPageLoged() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.logoutButton).toBeVisible();
    }

    async checkLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }

    async Logout() {
        await this.sideBarButton.click();
        await this.logoutButton.click();
    }

    async checkLogoutSuccess() {
        await expect(this.inputUsername).toBeVisible();
    }
}