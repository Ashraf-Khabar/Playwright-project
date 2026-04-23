import { Page, Locator, expect } from "@playwright/test";

export class Products {

    readonly page: Page;
    readonly sideBarButton: Locator;
    readonly allItemButtom: Locator;
    readonly cardItem: Locator

    constructor(page: Page) {
        this.page = page;
        this.sideBarButton = page.locator('#react-burger-menu-btn');
        this.allItemButtom = page.locator('#inventory_sidebar_link');
        this.cardItem = page.locator("xpath=(//div[@class='inventory_item_description'])[1]")
    }

    async ListingAllElements() {
        this.sideBarButton.click()
        this.allItemButtom.click()
        const text = this.cardItem.getByText;
        console.log(text)
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