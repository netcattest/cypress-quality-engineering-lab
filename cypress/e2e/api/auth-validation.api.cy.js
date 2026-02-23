import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";

describe("API - DummyJSON Auth Validation", () => {
  it("should reject missing password", () => {
    DummyJSONClient.login({
      username: "emilys",
      password: undefined,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
      expect(res.body).to.have.property("message");
    });
  });

  it("should reject missing username", () => {
    DummyJSONClient.login({
      username: undefined,
      password: "emilyspass",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
      expect(res.body).to.have.property("message");
    });
  });
});
