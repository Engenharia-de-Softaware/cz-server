module.exports = {
  HOST: process.env.DBHOST,
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "cz_user_dev",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
