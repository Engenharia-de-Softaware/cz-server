const express = require("express");
const cors = require("cors");

const UsersRouter = require('./users/routes.config');
const AuthorizationRouter = require('./authorization/routes.config');
const Consumer = require('./queues/consumerQueue');
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");
db.sequelize.sync();

Consumer.connect();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


UsersRouter.routesConfig(app);
AuthorizationRouter.routesConfig(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
