const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    video: false,
  },
  env: {
    dummyBaseUrl: "https://dummyjson.com",
  },

  // usa o mochawesome puro
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/json",
    overwrite: false, // gera um arquivo por spec (nao sobrescreve)
    html: false, // NAO gera html aqui
    json: true, // gera json por spec
  },
});
