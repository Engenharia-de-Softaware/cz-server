const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./env.config').env;

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers.authorization) {
      try {
        const authorization = req.headers.authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        }
        const token = authorization [1];
        req.jwt = jwt.verify(token, jwtSecret);
  
        client().lrange('token',0,99999999, (err, reply) => {
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(reply.indexOf(token) > -1){
                return res.status(400).send({error: 'Invalid Token'});
            } else {
                return next();
            }
        });
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
};
  
