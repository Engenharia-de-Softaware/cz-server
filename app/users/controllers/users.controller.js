/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const crypto = require('crypto');

exports.passwordHash = async function insertUser(req, _res, next) {
  try {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = `${salt}$${hash}`;
    next();
  } catch (error) {
    return next(error);
  }
};
