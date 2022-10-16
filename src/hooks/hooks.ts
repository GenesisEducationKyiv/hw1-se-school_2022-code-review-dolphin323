import { FastifyInstance } from "fastify";
import { HttpCode } from "../utils/enums/enums.js";
import { RabbitMQProducer } from "../services/rabbitmq/rabbitmq-producer.service.js";
import { QueueName } from "../utils/enums/rabbitmq/rabbitmq.js";

function initAppHooks(
  app: FastifyInstance,
  rabbitMQProducer: RabbitMQProducer
) {
  app.addHook("preHandler", function (req, res, done) {
    rabbitMQProducer.sendToQueue(
      QueueName.INFO_LOGS,
      Buffer.from(JSON.stringify({ body: req.body, url: req.url }))
    );
    done();
  });

  app.addHook("onError", async (req, res, error) => {
    if (error.statusCode === HttpCode.INTERNAL_SERVER_ERROR) {
      rabbitMQProducer.sendToQueue(
        QueueName.ERROR_LOGS,
        Buffer.from(JSON.stringify({ error }))
      );
    } else {
      rabbitMQProducer.sendToQueue(
        QueueName.WARNING_LOGS,
        Buffer.from(JSON.stringify({ error }))
      );
    }
  });
}

export { initAppHooks };
