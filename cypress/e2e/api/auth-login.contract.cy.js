import schema from "../../support/schemas/authLogin.schema.json";
import { DummyJSONClient } from "../../support/api/clients/dummyJson.client";
import { validateSchema } from "../../support/utils/schemaValidator";

describe("CONTRACT - DummyJSON Auth Login", () => {
  it("should match login response schema", () => {
    cy.fixture("users/dummy.valid").then((user) => {
      DummyJSONClient.login(user).then((res) => {
        const { valid, errors } = validateSchema(schema, res.body);
        expect(valid, JSON.stringify(errors, null, 2)).to.eq(true);
      });
    });
  });
});
