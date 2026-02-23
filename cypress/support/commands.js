import { loginPage } from "./pages/login.page";

Cypress.Commands.add("loginSauce", (username, password) => {
  loginPage.login(username, password);
});
