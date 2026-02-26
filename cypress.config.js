const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    video: false,
  },
  expose: {
    dummyBaseUrl: process.env.DUMMY_BASE_URL || "https://dummyjson.com",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/json",
    overwrite: false,
    html: false,
    json: true,
  },
});
