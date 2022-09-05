import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import { ENV, ExceptionMessage, HttpCode } from "../utils/enums/enums.js";
import { apiController } from "../controllers/controllers.js";
import { initApi } from "../routes/routes.js";

function build(opts = {}) {
  const app = fastify(opts);
  app.register(cors);

  app.register(swagger, {
    routePrefix: "/swagger",
    mode: "static",
    specification: {
      path: "./swagger/swagger.yaml",
    },
    exposeRoute: true,
  });

  app.register(initApi, {
    controllers: {
      apiController,
    },
    prefix: ENV.APP.API_PATH,
  });

  app.setNotFoundHandler((req, res) => {
    res.status(HttpCode.NOT_FOUND).send(ExceptionMessage.HANDLER_NOT_FOUND);
  });

  return app;
}

export { build };
