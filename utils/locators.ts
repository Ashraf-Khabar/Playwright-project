export const LOGIN_LOCATORS = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    logoutButton: '#logout_sidebar_link',
    errorMessage: 'xpath=/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3',
    sideBar: '#react-burger-menu-btn'
};

export const PRODUCT_LOCATORS = {
    inventoryItemButton: (index: number) => `xpath=(//div[@class='inventory_item_description'])[${index}]//button`,
    removeButtonByIndex: (index: number) => `xpath=(//button[normalize-space()='Remove'])[${index}]`,
    removeButtonGeneral: "button:has-text('Remove')",
    cartBadge: '.shopping_cart_badge',
    cartLink: '.shopping_cart_link',
    allItemLink: '#inventory_sidebar_link',
    // --- New Locators ---
    sortContainer: '.product_sort_container',
    inventoryItemName: '.inventory_item_name',
    inventoryItemPrice: '.inventory_item_price',
    itemLinkByName: (name: string) => `text=${name}`,
    backToProductsBtn: '#back-to-products'
};

export const PAYMENT_LOCATORS = {
    backpackAddBtn: "xpath=//button[@id='add-to-cart-sauce-labs-backpack']",
    bikeLightAddBtn: "xpath=//button[@id='add-to-cart-sauce-labs-bike-light']",
    cartItem: ".cart_item",
    checkoutBtn: "#checkout",
    firstNameField: "#first-name",
    lastNameField: "#last-name",
    postalCodeField: "#postal-code",
    errorBox: ".error-message-container.error",
    continueBtn: "#continue",
    // --- New Locators ---
    finishBtn: "#finish",
    cancelBtn: "#cancel",
    completeHeader: ".complete-header"
};