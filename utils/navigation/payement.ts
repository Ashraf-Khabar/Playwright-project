import { test, Locator, Page, expect } from "@playwright/test"

export class Payements {

    readonly page: Page;
    readonly addToCardButton_element1: Locator;
    readonly addToCardButton_element2: Locator;
    readonly basketButton: Locator;
    readonly cartItems: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.addToCardButton_element1 = page.locator("xpath=//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCardButton_element2 = page.locator("xpath=//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.basketButton = page.locator(".shopping_cart_link");
        this.cartItems = page.locator(".cart_item");
    }

    /**
     * Create a fucntion to manage tests
    */
    async addTheFirstElementToBasket() {
        // Click on the button to add the busket
        await this.addToCardButton_element1.click();
        await this.addToCardButton_element2.click();

        // Verification if the element is added to the basket
        let text = await this.basketButton.innerText()
        let number_of_element = parseInt(text)

        // Execution of tests on
        await test.expect(number_of_element).toBe(2);

        // Verification of the basket
        await this.basketButton.click();
        for (let i = 0; i < 2; i++) {
            const currentItem = this.cartItems.nth(i);
            console.log(currentItem)
            await expect(currentItem).toBeVisible();
        }

    }

}