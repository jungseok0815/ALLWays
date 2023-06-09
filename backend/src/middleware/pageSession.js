const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const env = process.env;

const options = {
  host: env.DATABASE_HOST,
  user: env.DATABASE_USERNAME,
  port: env.DATABASE_PORT,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DATABASE,
  name: "mysqlSession",
};

const sessionMysql = new MySQLStore(options);

module.exports = session({
  secret: env.SESSION_SECRET,
  store: sessionMysql,
  resave: false,
  saveUninitialized: false,
});
