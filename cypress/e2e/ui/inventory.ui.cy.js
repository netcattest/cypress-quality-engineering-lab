import { UI_ROUTES } from "../../support/constants/routes";
import { inventoryPage } from "../../support/pages/inventory.page";
import { loginPage } from "../../support/pages/login.page";

describe("UI - Post Login Navigation", () => {
  beforeEach(() => {
    cy.fixture("users/saucedemo.valid").then((user) => {
      loginPage.visit();
      loginPage.login(user.username, user.password);
      cy.url().should("include", UI_ROUTES.inventory);
    });
  });

  it("should navigate to product details and return to inventory", () => {
    inventoryPage.firstItem().click();
    cy.url().should("include", UI_ROUTES.inventoryItem);
    inventoryPage.backToProductsButton().click();
    cy.url().should("include", UI_ROUTES.inventory);
    loginPage.title().should("contain", "Products");
  });

  it("should logout and return to the login page", () => {
    inventoryPage.openMenu();
    inventoryPage.logout();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get('[data-test="login-button"]').should("be.visible");
  });
});
