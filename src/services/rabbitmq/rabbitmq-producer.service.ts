import amqplib, { Channel } from "amqplib";
import { IRabbitMQProducer } from "./types";

class RabbitMQProducer implements IRabbitMQProducer {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async sendToQueue(
    queue: string,
    content: Buffer,
    options?: amqplib.Options.Publish
  ) {
    this.channel?.sendToQueue(queue, content, options);
  }
}

export { RabbitMQProducer };
