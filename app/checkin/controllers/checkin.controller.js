// const publisherQueue = require('../../queues/publisherQueue');
const publisherQueue = require("../../queues/publisherQueue");

exports.checkIn = (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`ID: ${id}`);
    const { latitude, longitude } = req.body;

    const userCheckin = {
      user_id: id,
      latitude: latitude,
      longitude: longitude,
    };

    console.log(userCheckin);
    
    var msg = Buffer.from(typeof userCheckin === 'object'? JSON.stringify(userCheckin) : userCheckin);
    req.body.msg = msg;
    console.log(req.body.msg);
    next();
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
