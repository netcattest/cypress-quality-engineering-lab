import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("API - DummyJSON Auth Me", () => {
  it("should login and fetch /auth/me with bearer token", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login(user)
        .then((loginRes) => {
          const token = loginRes.body.accessToken;
          expect(token).to.be.a("string");
          return DummyJSONClient.me(token);
        })
        .then((meRes) => {
          expect(meRes.status).to.eq(200);
          expect(meRes.body).to.have.property("username", user.username);
        });
    });
  });
});
