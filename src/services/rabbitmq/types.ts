import amqplib, { Channel } from "amqplib";

type IRabbitMQ = {
  channel: Channel;
  createQueue: (queue: string, options?: amqplib.Options.AssertQueue) => void;
};

type IRabbitMQConsumer = {
  channel: Channel;
  consume: (
    queue: string,
    onMessage: (msg: amqplib.ConsumeMessage | null) => void,
    options?: amqplib.Options.Consume
  ) => void;
};

type IRabbitMQProducer = {
  channel: Channel;
  sendToQueue: (
    queue: string,
    content: Buffer,
    options?: amqplib.Options.Publish
  ) => void;
};

export { IRabbitMQ, IRabbitMQConsumer, IRabbitMQProducer };
