import { BASE_URLS } from "../constants/urls";

export function buildUrl(baseUrl, route) {
  const normalizedBase = String(baseUrl).replace(/\/+$/, "");
  const normalizedRoute = String(route).replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedRoute}`;
}

export function resolveDummyBaseUrl() {
  return Cypress.env("dummyBaseUrl") || BASE_URLS.dummyJson;
}
