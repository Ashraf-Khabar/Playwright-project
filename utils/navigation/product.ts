import { test, Page, Locator, expect } from "@playwright/test";

export class Products {

    readonly page: Page;
    readonly sideBarButton: Locator;
    readonly allItemButtom: Locator;
    readonly cardItem: Locator

    constructor(page: Page) {
        this.page = page;
        this.sideBarButton = page.locator('#react-burger-menu-btn');
        this.allItemButtom = page.locator('#inventory_sidebar_link');
        this.cardItem = page.locator("xpath=//a[@class='shopping_cart_link']");

    }

    /**
     * Verification of the button of add card
    */
    async addElementsToCart() {
        for (let i = 1; i <= 6; i++) {
            const addBtn = `xpath=(//div[@class='inventory_item_description'])[${i}]//button`;
            await this.page.locator(addBtn).click();
            const currentCount = await this.getNumberOfCardElemenmts();
            const removeBtn = `xpath=(//button[normalize-space()='Remove'])[${i}]`;
            await expect(this.page.locator(removeBtn)).toBeVisible();
            await expect(currentCount).toBe(i);
        }
    }

    async removeElementsFromCart() {
        for (let i = 6; i > 0; i--) {
            const removeBtn = this.page.locator("button:has-text('Remove')").last();
            await expect(removeBtn).toBeVisible();
            await removeBtn.click();
            const currentCount = await this.getNumberOfCardElemenmts();
            await expect(currentCount, `Après suppression, il devrait rester ${i - 1} éléments`).toBe(i - 1);
            console.log(`Élément retiré. Restant dans le panier : ${currentCount}`);
        }
    }

    /**
     * Helper fucntions to be used in my test fucntions
    */
    async getNumberOfCardElemenmts() {
        const badge = this.page.locator('.shopping_cart_badge');
        const count = await badge.count();                          
        if (count === 0) {
            return 0;
        }
        const text = await badge.innerText();
        return parseInt(text);
    }

    async getElementInformations(locator: Locator) {
        this.sideBarButton.click()
        this.allItemButtom.click()
        const text = await locator.innerText();
        test.info().annotations.push({
            type: 'Info Produit',
            description: `${text}`
        });
        const card_elements = text.split('\n')
        return card_elements
    }

    async getProductName(locator: Locator) {
        const card_elements = await this.getElementInformations(locator);
        console.log(card_elements[0])
    }

    async formatTextLocator(Basetext: String) {
        const prefex = "add-to-cart"
        const formattedText = Basetext
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');
        const finalResult = `${prefex}-${formattedText}`
        console.log(finalResult);
        return finalResult;
    }
}