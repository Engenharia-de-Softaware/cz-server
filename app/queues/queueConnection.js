const amqplib = require('amqplib');

const connectionURL = {
  protocol: process.env.AMQP_PROTOCOL,
  hostname: process.env.AMQP_HOST,
  port: process.env.AMQP_PORT,
  username: process.env.AMQP_USER,
  password: process.env.AMQP_PASS,
};

let instance;

class MessageBroker {
  async init() {
    try {
      this.connection = await amqplib.connect(`amqp://localhost`);
      this.consumerChannel = await this.connection.createChannel();
      this.publisherChannel = await this.connection.createChannel();
  
      return this;
      
    } catch (error) {
      return error;
    }

  }
}


MessageBroker.connect = async () => {
  if (!instance) {
    const broker = new MessageBroker();
    instance = await broker.init();
  }

  return instance;
};



module.exports = MessageBroker;
