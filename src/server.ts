import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { ExitCode, ENV } from "./utils/enums/enums.js";
import { errorHandler, validatorCompiler } from "./utils/helpers/helpers.js";
import { build } from "./app/app.js";
import { initRabbitMQ } from "./config/services/services.config.js";
import { initAppHooks } from "./hooks/hooks.js";

const ajv = new Ajv({ allErrors: true });

AjvErrors(ajv);
addFormats(ajv);

const app = build({
  logger: true,
  ajv: { plugins: [AjvErrors, addFormats] },
});

const { rabbitMQProducer, rabbitMQConsumer } = await initRabbitMQ();

initAppHooks(app, rabbitMQProducer);

app.setErrorHandler(errorHandler);

app.setValidatorCompiler(function (schemaDefinition) {
  return validatorCompiler(schemaDefinition, ajv);
});

const start = async () => {
  try {
    await app.listen({ port: ENV.APP.PORT, host: ENV.APP.HOST });
  } catch (error) {
    app.log.error(error);
    process.exit(ExitCode.ERROR);
  }
};

start();
