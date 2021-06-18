const multer = require('multer')();
const CheckInController = require('./controllers/checkin.controller');
const AuthValidationMiddleware = require('../common/auth.validation.middleware');
const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');

exports.routesConfig = (app) => {
  app.post('/checkin:id', [
    multer.none(),
    AuthValidationMiddleware.validJWTNeeded,
    CheckInController.checkIn,
  ]);
};
