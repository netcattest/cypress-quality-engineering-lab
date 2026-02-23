import { UI_ROUTES } from "../../support/constants/routes";
import { loginPage } from "../../support/pages/login.page";

describe("UI - Login", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("should login with valid credentials", () => {
    cy.fixture("users/saucedemo.valid").then((user) => {
      loginPage.login(user.username, user.password);
      cy.url().should("include", UI_ROUTES.inventory);
      loginPage.title().should("contain", "Products");
    });
  });

  it("should show error for invalid credentials", () => {
    cy.fixture("users/saucedemo.invalid").then((user) => {
      loginPage.login(user.username, user.password);
      loginPage.errorBanner().should("be.visible");
    });
  });
});
