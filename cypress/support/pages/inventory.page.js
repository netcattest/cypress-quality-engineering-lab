import { INVENTORY_PAGE_SELECTORS } from "../constants/selectors";

class InventoryPage {
  firstItem() {
    return cy.get(INVENTORY_PAGE_SELECTORS.itemName).first();
  }

  backToProductsButton() {
    return cy.get(INVENTORY_PAGE_SELECTORS.backToProductsButton);
  }

  openMenu() {
    cy.get(INVENTORY_PAGE_SELECTORS.menuButton).click();
  }

  logout() {
    cy.get(INVENTORY_PAGE_SELECTORS.logoutLink).should("be.visible").click();
  }
}

export const inventoryPage = new InventoryPage();
