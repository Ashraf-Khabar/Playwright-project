import { test, Locator, Page, expect } from "@playwright/test"
import { PAYMENT_LOCATORS, PRODUCT_LOCATORS } from "../locators";

export class Payements {
    readonly page: Page;
    readonly addToCardButton_element1: Locator;
    readonly addToCardButton_element2: Locator;
    readonly basketButton: Locator;
    readonly cartItems: Locator;
    readonly checkoutBtn: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly errorBox: Locator;
    readonly continueBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.addToCardButton_element1 = page.locator(PAYMENT_LOCATORS.backpackAddBtn);
        this.addToCardButton_element2 = page.locator(PAYMENT_LOCATORS.bikeLightAddBtn);
        this.basketButton = page.locator(PRODUCT_LOCATORS.cartLink);
        this.cartItems = page.locator(PAYMENT_LOCATORS.cartItem);
        this.firstNameField = page.locator(PAYMENT_LOCATORS.firstNameField);
        this.lastNameField = page.locator(PAYMENT_LOCATORS.lastNameField);
        this.postalCodeField = page.locator(PAYMENT_LOCATORS.postalCodeField);
        this.errorBox = page.locator(PAYMENT_LOCATORS.errorBox);
        this.continueBtn = page.locator(PAYMENT_LOCATORS.continueBtn);
        this.checkoutBtn = page.locator(PAYMENT_LOCATORS.checkoutBtn);
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

    async checkout() {
        await expect(this.checkoutBtn).toBeVisible();
        await this.checkoutBtn.click();
        await expect(this.continueBtn).toBeVisible();
        // verification of all usecases of fields
        await this.firstNameField.fill("Achraf");
        await this.continueBtn.click();

        let error_text = await this.errorBox.innerText();
        await expect(error_text).toBe("Error: Last Name is required");

        await this.lastNameField.fill("KHABAR");
        await this.continueBtn.click();

        error_text = await this.errorBox.innerText();
        await expect(error_text).toBe("Error: Postal Code is required");

        await this.firstNameField.clear();
        await this.postalCodeField.fill("92000");
        await this.continueBtn.click();

        error_text = await this.errorBox.innerText();
        await expect(error_text).toBe("Error: First Name is required");

        await this.firstNameField.fill("Achraf");
        await this.postalCodeField.fill("92000");
        await this.continueBtn.click();

        const count = await this.cartItems.count();
        for (let i = 0; i < count; i++) {
            await expect(this.cartItems.nth(i)).toBeVisible();
        }
    }
}