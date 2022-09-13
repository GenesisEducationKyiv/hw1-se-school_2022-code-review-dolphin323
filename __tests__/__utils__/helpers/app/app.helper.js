import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { build as buildApp } from "../../../../app.js";
import {
  errorHandler,
  validatorCompiler,
} from "../../../../utils/helpers/helpers.js";

function build() {
  const ajv = new Ajv({ allErrors: true });

  AjvErrors(ajv);
  addFormats(ajv);

  const app = buildApp({
    logger: false,
    ajv: { plugins: [AjvErrors, addFormats], logger: false },
  });

  app.setErrorHandler(errorHandler);

  app.setValidatorCompiler(function (schemaDefinition) {
    return validatorCompiler(schemaDefinition, ajv);
  });

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}

export { build };
