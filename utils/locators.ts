export const LOGIN_LOCATORS = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    logoutButton: '#logout_sidebar_link',
    errorMessage: 'xpath=/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3',
    sideBar: '#react-burger-menu-btn'
};

export const PRODUCT_LOCATORS = {
    // Sélecteur dynamique pour les articles de l'inventaire
    inventoryItemButton: (index: number) => `xpath=(//div[@class='inventory_item_description'])[${index}]//button`,
    // Sélecteur dynamique pour le bouton Remove par index
    removeButtonByIndex: (index: number) => `xpath=(//button[normalize-space()='Remove'])[${index}]`,
    removeButtonGeneral: "button:has-text('Remove')",
    cartBadge: '.shopping_cart_badge',
    cartLink: '.shopping_cart_link',
    allItemLink: '#inventory_sidebar_link'
};

export const PAYMENT_LOCATORS = {
    backpackAddBtn: "xpath=//button[@id='add-to-cart-sauce-labs-backpack']",
    bikeLightAddBtn: "xpath=//button[@id='add-to-cart-sauce-labs-bike-light']",
    cartItem: ".cart_item"
};