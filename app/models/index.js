const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 5432,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  // define: {
  //   createdAt: "createdat",
  //   updatedAt: "updatedat"
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users/create.model")(sequelize, Sequelize);
db.auth = require("./users/auth.model")(sequelize, Sequelize);
db.marker = require("./markers/mark.model")(sequelize, Sequelize);



module.exports = db;
