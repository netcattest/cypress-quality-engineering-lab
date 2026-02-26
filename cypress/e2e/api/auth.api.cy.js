import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("API - DummyJSON Auth", () => {
  it("should authenticate and return access metadata", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login({
        ...user,
        expiresInMins: 30,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("refreshToken");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username", user.username);
      });
    });
  });

  it("should reject invalid credentials", () => {
    cy.fixture("users/dummy.invalid").then((invalidUser) => {
      DummyJSONClient.login({
        ...invalidUser,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([400, 401]);
        expect(res.body).to.have.property("message");
      });
    });
  });
});
