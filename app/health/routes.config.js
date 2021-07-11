const multer = require('multer')();
const HealthController = require('./controllers/health.controller');
const AuthValidationMiddleware = require('../common/auth.validation.middleware');
const Publisher = require('../queues/publisherQueue')

exports.routesConfig = (app) => {
  app.post('/health', [
    multer.none(),
    AuthValidationMiddleware.validJWTNeeded,
    HealthController.health,
    Publisher.publisherQueue
  ]);
};
