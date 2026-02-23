import { loginPage } from "../../support/pages/login.page";

describe("UI - Login Validation", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("should require username when submitting empty form", () => {
    loginPage.submit();
    loginPage
      .errorBanner()
      .should("be.visible")
      .and("contain", "Epic sadface: Username is required");
  });

  it("should require password when only username is provided", () => {
    cy.fixture("users/saucedemo.valid").then((user) => {
      loginPage.fillUsername(user.username);
      loginPage.submit();

      loginPage
        .errorBanner()
        .should("be.visible")
        .and("contain", "Epic sadface: Password is required");
    });
  });

  it("should block locked users", () => {
    cy.fixture("users/saucedemo.locked").then((lockedUser) => {
      loginPage.login(lockedUser.username, lockedUser.password);

      loginPage
        .errorBanner()
        .should("be.visible")
        .and("contain", "Epic sadface: Sorry, this user has been locked out.");
    });
  });
});
