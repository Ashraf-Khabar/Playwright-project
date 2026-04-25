import { test, Page, Locator, expect } from "@playwright/test";
import { PRODUCT_LOCATORS } from "../locators";

export class Products {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addElementsToCart() {
        for (let i = 1; i <= 6; i++) {
            const addBtn = this.page.locator(PRODUCT_LOCATORS.inventoryItemButton(i));
            await addBtn.click();
            
            const currentCount = await this.getNumberOfCardElemenmts();
            const removeBtn = this.page.locator(PRODUCT_LOCATORS.removeButtonByIndex(i));
            
            await expect(removeBtn).toBeVisible();
            await expect(currentCount).toBe(i);
        }
    }

    async removeElementsFromCart() {
        for (let i = 6; i > 0; i--) {
            const removeBtn = this.page.locator(PRODUCT_LOCATORS.removeButtonGeneral).last();
            await removeBtn.click();

            const currentCount = await this.getNumberOfCardElemenmts();
            await expect(currentCount, `Attendu: ${i-1}`).toBe(i - 1);
        }
    }

    async getNumberOfCardElemenmts() {
        const badge = this.page.locator(PRODUCT_LOCATORS.cartBadge);
        if (await badge.count() === 0) {
            return 0;
        }
        const text = await badge.innerText();
        return parseInt(text);
    }
}