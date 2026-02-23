import { UI_ROUTES } from "../constants/routes";
import { LOGIN_PAGE_SELECTORS } from "../constants/selectors";

class LoginPage {
  visit() {
    cy.visit(UI_ROUTES.login);
  }

  fillUsername(username) {
    cy.get(LOGIN_PAGE_SELECTORS.usernameInput).clear().type(username);
  }

  fillPassword(password) {
    cy.get(LOGIN_PAGE_SELECTORS.passwordInput).clear().type(password);
  }

  submit() {
    cy.get(LOGIN_PAGE_SELECTORS.loginButton).click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  errorBanner() {
    return cy.get(LOGIN_PAGE_SELECTORS.errorBanner);
  }

  title() {
    return cy.get(LOGIN_PAGE_SELECTORS.title);
  }
}

export const loginPage = new LoginPage();
