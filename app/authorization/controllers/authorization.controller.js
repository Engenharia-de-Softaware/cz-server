const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtOptions } = require('../../common/env.config').env;


exports.login = (req, res) => {
  try {
    const refreshId = `${req.body.userId}${jwtSecret}`;
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
    req.body.refreshKey = salt;
    const accessToken = jwt.sign(req.body, jwtSecret, jwtOptions);
    delete req.body.refreshKey;
    const refreshToken = Buffer.from(hash).toString('base64');

    
    const data = req.body;

    data.accessToken = accessToken;
    data.refreshToken = refreshToken;
    res.status(200).send(data);

    } catch (err) {
    res.status(500).send({ errors: err });
  }
};


exports.logout = (req, res) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      }

      const token = authorization[1];
      req.jwt = jwt.verify(token, jwtSecret);


      return res.status(200).send('Log out');
      
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};


exports.token = (req) => {
  try {
    const salt = crypto.randomBytes(16).toString('base64');
    req.body.refreshKey = salt;
    const accessToken = jwt.sign(req.body, jwtSecret, jwtOptions);
    return accessToken;
  } catch (err) {
    console.log(err);
    throw new Error("Error generating token 2");
  }
};
