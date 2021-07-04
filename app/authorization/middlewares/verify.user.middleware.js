/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const crypto = require('crypto');
const { auth, Sequelize } = require("../../models");
const Auth = auth;
const Op = Sequelize.Op;

exports.hasAuthValidFields = (req, res, next) => {
  const errors = [];

  if (req.body) {
    if (!req.body.email && !req.body.cpf) {
      errors.push('Missing email or CPF field');
    } else if (req.body.cpf && req.body.email) {
      errors.push('Provide only the email or the CPF');
    }

    if (!req.body.password) {
      errors.push('Missing password field');
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(',') });
    }
    return next();
  }
  return res.status(400).send({ errors: 'Missing email and password fields' });
};

exports.isPasswordAndUserMatch = async (req, res, next) => {
  let query;
  const { email } = req.body;
  if (email) query = { email };
  console.log(`Ema: ${email}`);
  // if (req.body.cpf) query = { cpf: req.body.cpf };

  try {
    const user = await Auth.findOne({ where: { email: email } });
    console.log(`User: ${user}`);

    if (!user) {
      return res.status(404).send({});
    }

    const passwordFields = user.password.split("$");
    const salt = passwordFields[0];
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    if (hash === passwordFields[1]) {
      req.body = {
        id: user.id,
        email: user.email,
        name: user.name,
        cpf: user.cpf,
      };

      next();
    }
    
    // throw new Error("Invalid e-mail or password");
  } catch (error) {
    console.log(error);
    return res.status(400).send({ errors: ["Invalid e-mail or password"] });
  }

  // Auth.findOne(query)
  //   .then((user) => {
  //     if (user && user.client_id) {
  //       return Institution.findOne({ client_id: user.client_id })
  //         .then(institution => Object.assign(user, { institution }));
  //     }
  //     return user;
  //   })
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send({});
  //     }

  //     const passwordFields = user.password.split('$');
  //     const salt = passwordFields[0];
  //     const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
  //     if (hash === passwordFields[1]) {
  //       req.body = {
  //         userId: user._id,
  //         email: user.email,
  //         permission: user.permission,
  //         name: user.name,
  //         cpf: user.cpf,
  //       };
  //       if (user.institution) req.body.institution = user.institution;
  //       if (user.cnpj) req.body.cnpj = user.cnpj;
  // if (user.client_id) req.body.client_id = user.client_id;

  //       return next();
  //     }

  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   });
};;;;;;;;;;;;
