import schema from "../../support/schemas/authMe.schema.json";
import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";
import { validateSchema } from "../../support/utils/schemaValidator";

describe("CONTRACT - DummyJSON Auth Me", () => {
  it("should match /auth/me response schema", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login(user)
        .then((loginRes) => DummyJSONClient.me(loginRes.body.accessToken))
        .then((meRes) => {
          const { valid, errors } = validateSchema(schema, meRes.body);
          expect(valid, JSON.stringify(errors, null, 2)).to.eq(true);
        });
    });
  });
});
