import { DUMMY_JSON_ROUTES } from "../../constants/routes";
import { buildUrl, resolveDummyBaseUrl } from "../../utils/helpers";

export const DummyJSONClient = {
  login({
    username,
    password,
    expiresInMins = 30,
    failOnStatusCode = true,
  }) {
    return cy.request({
      method: "POST",
      url: buildUrl(resolveDummyBaseUrl(), DUMMY_JSON_ROUTES.login),
      headers: { "Content-Type": "application/json" },
      body: { username, password, expiresInMins },
      failOnStatusCode,
    });
  },

  refresh(refreshToken, { expiresInMins = 30, failOnStatusCode = true } = {}) {
    return cy.request({
      method: "POST",
      url: buildUrl(resolveDummyBaseUrl(), DUMMY_JSON_ROUTES.refresh),
      headers: { "Content-Type": "application/json" },
      body: { refreshToken, expiresInMins },
      failOnStatusCode,
    });
  },

  me(accessToken, { failOnStatusCode = true } = {}) {
    return cy.request({
      method: "GET",
      url: buildUrl(resolveDummyBaseUrl(), DUMMY_JSON_ROUTES.me),
      headers: { Authorization: `Bearer ${accessToken}` },
      failOnStatusCode,
    });
  },

  meWithoutToken({ failOnStatusCode = true } = {}) {
    return cy.request({
      method: "GET",
      url: buildUrl(resolveDummyBaseUrl(), DUMMY_JSON_ROUTES.me),
      failOnStatusCode,
    });
  },
};
