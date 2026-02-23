import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";
import { createRandomToken } from "../../support/utils/generators";

describe("API - DummyJSON Auth Me Negative", () => {
  it("should reject request without token", () => {
    DummyJSONClient.meWithoutToken({ failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
      expect(res.body).to.have.property("message");
    });
  });

  it("should reject request with invalid token", () => {
    DummyJSONClient.me(createRandomToken(), { failOnStatusCode: false }).then(
      (res) => {
        expect(res.status).to.be.oneOf([401, 403, 500]);
        expect(res.body).to.have.property("message");
      },
    );
  });
});
