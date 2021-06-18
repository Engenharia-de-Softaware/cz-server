const publisherQueue = require('../../queues/publisherQueue');

exports.checkIn = (req, res) => {
  try {

    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const userCheckin = {

      id: id,
      latitude: latitude,
      longitude: longitude

    }

    publisherQueue(userCheckin);
    
    res.status(200).send(userCheckin);

    } catch (err) {
    res.status(500).send({ errors: err });
  }
};
