import amqplib, { Channel } from "amqplib";
import { IRabbitMQConsumer } from "./types";

class RabbitMQConsumer implements IRabbitMQConsumer {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async consume(
    queue: string,
    onMessage: (msg: amqplib.ConsumeMessage | null) => void,
    options?: amqplib.Options.Consume
  ) {
    await this.channel?.assertQueue(queue, {
      durable: true,
    });
    await this.channel?.consume(
      queue,
      (msg) => {
        if (msg) {
          onMessage(msg);
          this.channel?.ack(msg);
        }
      },
      options
    );
  }
}

export { RabbitMQConsumer };
