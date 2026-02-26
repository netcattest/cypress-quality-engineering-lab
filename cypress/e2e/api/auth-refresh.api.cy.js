import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("API - DummyJSON Auth Refresh", () => {
  it("should refresh access token with a valid refresh token", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login(user).then((loginRes) => {
        const refreshToken = loginRes.body.refreshToken;

        expect(refreshToken).to.be.a("string");

        DummyJSONClient.refresh(refreshToken).then((refreshRes) => {
          expect(refreshRes.status).to.eq(200);
          expect(refreshRes.body).to.have.property("accessToken");
          expect(refreshRes.body).to.have.property("refreshToken");
          DummyJSONClient.me(refreshRes.body.accessToken).then((meRes) => {
            expect(meRes.status).to.eq(200);
            expect(meRes.body).to.have.property("username", user.username);
          });
        });
      });
    });
  });

  it("should reject refresh with invalid refresh token", () => {
    DummyJSONClient.refresh("invalid_refresh_token", {
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401, 403]);
      expect(res.body).to.have.property("message");
    });
  });
});
