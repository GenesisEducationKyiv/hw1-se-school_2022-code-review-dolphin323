import { ConsumeMessage } from "amqplib";
import { channelConsumer, channelProducer } from "./connect-rabbitmq.js";
import { RabbitMQConsumer } from "../../../services/rabbitmq/rabbitmq-consumer.service.js";
import { RabbitMQProducer } from "../../../services/rabbitmq/rabbitmq-producer.service.js";
import { RabbitMQ } from "../../../services/rabbitmq/rabbitmq.service.js";
import { QueueName } from "../../../utils/enums/rabbitmq/rabbitmq.js";

async function initQueues() {
  const rabbitMQ = new RabbitMQ(channelConsumer);
  await rabbitMQ.createQueue(QueueName.INFO_LOGS);
  await rabbitMQ.createQueue(QueueName.ERROR_LOGS);
  await rabbitMQ.createQueue(QueueName.WARNING_LOGS);
}

async function initConsumer() {
  const rabbitMQConsumer = new RabbitMQConsumer(channelConsumer);

  const onMessage = (msg: ConsumeMessage | null, queueName: string) => {
    console.log(queueName, msg?.content.toString());
  };

  await rabbitMQConsumer.consume(QueueName.INFO_LOGS, (msg) => {
    onMessage(msg, QueueName.INFO_LOGS);
  });
  await rabbitMQConsumer.consume(QueueName.ERROR_LOGS, (msg) => {
    onMessage(msg, QueueName.ERROR_LOGS);
  });
  await rabbitMQConsumer.consume(QueueName.WARNING_LOGS, (msg) => {
    onMessage(msg, QueueName.WARNING_LOGS);
  });

  return rabbitMQConsumer;
}

async function initProducer() {
  const rabbitMQProducer = new RabbitMQProducer(channelProducer);

  return rabbitMQProducer;
}

async function initRabbitMQ() {
  await initQueues();
  const rabbitMQProducer = await initProducer();
  const rabbitMQConsumer = await initConsumer();

  return { rabbitMQProducer, rabbitMQConsumer };
}

export { initRabbitMQ };
