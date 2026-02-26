import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("API - DummyJSON Auth Me Negative", () => {
  it("should reject request without token", () => {
    DummyJSONClient.meWithoutToken({ failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
      expect(res.body).to.have.property("message");
    });
  });

  it("should reject request with invalid token", () => {
    DummyJSONClient.me("abc", { failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
      expect(res.body).to.have.property("message");
    });
  });

  it("should reject request with expired token", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login({ ...user, expiresInMins: 1 }).then((loginRes) => {
        cy.wait(65000);
        DummyJSONClient.me(loginRes.body.accessToken, { failOnStatusCode: false }).then((res) => {
          expect(res.status).to.be.oneOf([401, 403]);
          expect(res.body).to.have.property("message");
        });
      });
    });
  });
});
