const MessageBroker = require('./queueConnection');


exports.publisherQueue = async (msg) => {
    try {
        const queue = "cz_user_in";
        const { consumerChannel: channel } = await MessageBroker.connect();

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, msg);

        res.status(200).send();
        
      } catch (err) {
      res.status(500).send({ errors: err });
    }
  };