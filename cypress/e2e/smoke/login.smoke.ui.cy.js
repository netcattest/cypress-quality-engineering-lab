import { UI_ROUTES } from "../../support/constants/routes";
import { loginPage } from "../../support/pages/login.page";

describe("SMOKE - UI Login", () => {
  it("should login and reach inventory", () => {
    cy.fixture("users/saucedemo.valid").then((user) => {
      loginPage.visit();
      loginPage.login(user.username, user.password);
      cy.url().should("include", UI_ROUTES.inventory);
    });
  });
});
