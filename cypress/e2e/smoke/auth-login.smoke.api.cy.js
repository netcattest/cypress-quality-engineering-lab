import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("SMOKE - API Auth Login", () => {
  it("should login successfully", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login(user).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("accessToken");
      });
    });
  });
});
