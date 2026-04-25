import { test, Locator, Page, expect } from "@playwright/test"
import { PAYMENT_LOCATORS, PRODUCT_LOCATORS } from "../locators";

export class Payements {
    readonly page: Page;
    readonly addToCardButton_element1: Locator;
    readonly addToCardButton_element2: Locator;
    readonly basketButton: Locator;
    readonly cartItems: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.addToCardButton_element1 = page.locator(PAYMENT_LOCATORS.backpackAddBtn);
        this.addToCardButton_element2 = page.locator(PAYMENT_LOCATORS.bikeLightAddBtn);
        this.basketButton = page.locator(PRODUCT_LOCATORS.cartLink);
        this.cartItems = page.locator(PAYMENT_LOCATORS.cartItem);
    }

    async addTheFirstElementToBasket() {
        await this.addToCardButton_element1.click();
        await this.addToCardButton_element2.click();

        const text = await this.basketButton.innerText();
        await expect(parseInt(text)).toBe(2);

        await this.basketButton.click();

        const count = await this.cartItems.count();
        for (let i = 0; i < count; i++) {
            await expect(this.cartItems.nth(i)).toBeVisible();
        }
    }
}