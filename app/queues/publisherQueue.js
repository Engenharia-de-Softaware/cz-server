const MessageBroker = require('./queueConnection');


exports.publisherQueue = async(req, res) => {
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
    try {
        const queue = "cz_user_in";
        const { consumerChannel: channel } = await MessageBroker.connect();


        // console.log(channel);
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, req.body.msg);

        res.status(200).send();
        
      } catch (err) {
      // console.log("oiee");
      res.status(500).send({ errors: err });
    }
};