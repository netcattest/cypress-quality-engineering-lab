export const LOGIN_PAGE_SELECTORS = Object.freeze({
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorBanner: '[data-test="error"]',
  title: ".title",
});

export const INVENTORY_PAGE_SELECTORS = Object.freeze({
  itemName: '[data-test="inventory-item-name"]',
  menuButton: "#react-burger-menu-btn",
  logoutLink: '[data-test="logout-sidebar-link"]',
  backToProductsButton: '[data-test="back-to-products"]',
});
