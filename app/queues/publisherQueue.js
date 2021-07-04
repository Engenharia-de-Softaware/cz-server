const MessageBroker = require('./queueConnection');

console.log("Entrando aqui");

exports.publisherQueue = async (req, res) => {
  try {
    const queue = "cz_user_in";
    const {   msg   } = req.body;
    console.log(queue, msg);
    
    const { consumerChannel: channel } = await MessageBroker.connect();
    channel.assertQueue(queue, { durable: false });
    console.log("Entrei aquo")

    channel.sendToQueue(queue, msg);

    res.status(200).send();
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
