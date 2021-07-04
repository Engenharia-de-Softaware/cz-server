const multer = require('multer')();
const MarkersController = require('./controllers/markers.controller');
const AuthValidationMiddleware = require('../common/auth.validation.middleware');

exports.routesConfig = (app) => {
  app.get('/getmarkers', [
    multer.none(),
    AuthValidationMiddleware.validJWTNeeded,
    MarkersController.getMarkers,
  ]);
};
