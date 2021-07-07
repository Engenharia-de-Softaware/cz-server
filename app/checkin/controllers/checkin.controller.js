exports.checkIn = (req, res, next) => {
  try {

    const { user_id, latitude, longitude } = req.body;
    
    const userCheckin = {
      
      user_id: user_id,
      latitude: latitude,
      longitude: longitude
      
    }
    
    var msg = Buffer.from(typeof userCheckin === 'object'
            ? JSON.stringify(userCheckin) : userCheckin);

    req.body.msg = msg;
    
    
    next();

    } catch (err) {
    res.status(500).send({ errors: err });
  }
};

