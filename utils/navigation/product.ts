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
            const base_locator = `xpath=(//div[@class='inventory_item_description'])[${i}]//button`;
            await this.page.locator(base_locator).click();
            const currentCount = await this.getNumberOfCardElemenmts();
            await expect(currentCount, `Le panier devrait contenir ${i} éléments`).toBe(i);
            console.log(`Élément ${i} ajouté. Panier : ${currentCount}`);
        }
    }

    /**
     * Helper fucntions to be used in my test fucntions
    */
    async getNumberOfCardElemenmts() {
        const text = await this.cardItem.innerText();
        console.log('__________')
        return parseInt(text)
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