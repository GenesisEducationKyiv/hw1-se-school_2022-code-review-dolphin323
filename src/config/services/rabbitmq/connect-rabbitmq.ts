import amqplib from "amqplib";
import { ENV } from "../../../utils/enums/enums.js";

async function connectRabbitMQ(amqpServer: string) {
  const connection = await amqplib.connect(amqpServer);
  const channelConsumer = await connection.createChannel();
  const channelProducer = await connection.createChannel();

  return { channelConsumer, channelProducer };
}

const { channelConsumer, channelProducer } = await connectRabbitMQ(
  ENV.RABBITMQ.URL
);

export { connectRabbitMQ, channelConsumer, channelProducer };
