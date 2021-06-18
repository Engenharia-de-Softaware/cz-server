const MessageBroker = require('./queueConnection');


exports.publisherQueue = async (msg) => {
    try {
        const queue = "covid-zone";
        const { consumerChannel: channel } = await MessageBroker.connect();

        channel.assertQueue(queue, { durable: false });


        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
        
        

      
        // res.status(200).send(data);
        
      } catch (err) {
      res.status(500).send({ errors: err });
    }
  };