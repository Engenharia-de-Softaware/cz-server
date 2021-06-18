const MessageBroker = require('./queueConnection');

exports.connect = async (req, res) => {
    try {

        const { consumerChannel: channel } = await MessageBroker.connect();
        const queue = "covid-zone";

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
  