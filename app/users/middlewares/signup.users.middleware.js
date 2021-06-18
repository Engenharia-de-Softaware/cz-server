function hasNormalUserSignUpValidFields(user) {
  const errors = [];

  if (!user.name) {
    errors.push('Missing name field');
  }

  if (!user.email) {
    errors.push('Missing email field');
  }

  if (!user.password) {
    errors.push('Missing password field');
  } else if (user.password.length < 8) {
    errors.push('The password must have at least 8 characters');
  }

  return errors;
}

function hasInstitutionUserSignUpValidFields(user) {
  const errors = hasNormalUserSignUpValidFields(user);

  if (!user.cnpj) {
    errors.push('Missing CNPJ field');
  } else if (user.cnpj.length !== 14) {
    errors.push('Invalid CNPJ field.');
  }

  if (!user.institution) {
    errors.push('Missing institution field');
  }

  if (!user.client_id) {
    errors.push('Missing client_id field');
  }

  return errors;
}

exports.hasNormalUserSignUpValidFields = (req, res, next) => {
  const errors = hasNormalUserSignUpValidFields(req.body);
  if (errors.length) {
    return res.status(400).send({ errors: errors.join(', ') });
  }
  return next();
};

exports.hasInstitutionUserSignUpValidFields = (req, res, next) => {
  const errors = hasInstitutionUserSignUpValidFields(req.body);
  if (errors.length) {
    return res.status(400).send({ errors: errors.join(', ') });
  }
  return next();
};
