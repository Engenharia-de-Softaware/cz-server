const multer = require('multer')();
const UsersController = require('./controllers/users.controller');
const SignUpValidatorMiddleware = require('./middlewares/signup.users.middleware');
const operations = require('./operations');


exports.routesConfig = (app) =>{
  // Create User
  app.post('/users', [
    multer.none(),
    SignUpValidatorMiddleware.hasNormalUserSignUpValidFields,
    UsersController.passwordHash,
    operations.insert
  ]);

};
