const MessageBroker = require('./queueConnection');


exports.publisherQueue = async(req, res) => {

  try {
        const { queue } = req.body;
        const { consumerChannel: channel } = await MessageBroker.connect();


        console.log(queue);
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, req.body.msg);

        res.status(200).send();
        
      } catch (err) {
      // console.log("oiee");
      res.status(500).send({ errors: err });
    }
};