import fastify from "fastify";
import cors from "@fastify/cors";
import swagger, { StaticPathSpec } from "@fastify/swagger";
import {
  ENV,
  ExceptionMessage,
  FilePath,
  HttpCode,
} from "../utils/enums/enums.js";
import { apiController } from "../controllers/controllers.js";
import { initApi } from "../routes/routes.js";

function build(opts = {}) {
  const app = fastify(opts);
  app.register(cors);

  app.register(swagger, {
    routePrefix: "/swagger",
    mode: "static",
    specification: ((): StaticPathSpec => {
      const url = new URL("../swagger", import.meta.url).pathname;

      return {
        path: `${url}/swagger.yaml`,
        baseDir: url,
      };
    })(),
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
