const express = require("express");
const cors = require("cors");

const UsersRouter = require('./users/routes.config');
const AuthorizationRouter = require('./authorization/routes.config');
const CheckInRouter = require('./checkin/routes.config');
const MarkersRouter = require('./markers/routes.config')
const HealthRouter = require('./health/routes.config')

const Consumer = require('./queues/consumerQueue');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");
Consumer.connect();

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

UsersRouter.routesConfig(app);
AuthorizationRouter.routesConfig(app);
CheckInRouter.routesConfig(app);
MarkersRouter.routesConfig(app);
HealthRouter.routesConfig(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
