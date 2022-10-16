import amqplib, { Channel } from "amqplib";
import { IRabbitMQ } from "./types";

class RabbitMQ implements IRabbitMQ {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async createQueue(queue: string, options?: amqplib.Options.AssertQueue) {
    try {
      await this.channel?.assertQueue(queue, options);
    } catch (error) {
      console.log(error);
    }
  }
}

export { RabbitMQ };
