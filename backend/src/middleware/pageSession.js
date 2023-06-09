const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const env = process.env;

const options = {
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  port: env.DATABASE_PORT,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DATABASE,
};

const sessionMysql = new MySQLStore(options);

const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  store: sessionMysql,
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: 'localhost',
    path: '/',
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: 'none',
    httpOnly: true,
    secure: false,
  },
  name: "mysqlSession",
});

module.exports = sessionMiddleware;


// const session = require('express-session');
//   const MySQLStore = require("express-mysql-session")(session);
//   const env = process.env;

//     const options = {
//     host: env.DATABASE_HOST,
//     user: env.DATABASE_USER,
//     port: env.DATABASE_PORT,
//     password: env.DATABASE_PASSWORD,
//     database: env.DATABASE_DATABASE,
//     name: "mysqlSession",
//   };

//   const sessionMysql = new MySQLStore(options);

//   module.exports = session({
//     secret: env.SESSION_SECRET,
//     store: sessionMysql,
//     resave: false,
//     saveUninitialized: false,
//   });

// const session = require('express-session');
// const MySQLStore = require("express-mysql-session")(session);
// const env = process.env;

// const options = {
//   host: env.DATABASE_HOST,
//   user: env.DATABASE_USER,
//   port: env.DATABASE_PORT,
//   password: env.DATABASE_PASSWORD,
//   database: env.DATABASE_DATABASE,
//   name: "mysqlSession",
// };

// const sessionMysql = new MySQLStore(options);

// const pageSession = session({
//   secret: env.SESSION_SECRET,
//   store: sessionMysql,
//   resave: false,
//   saveUninitialized: false,
// });

// function destroySession(sessionId, callback) {
//   sessionMysql.destroy(sessionId, callback);
// }

// module.exports = { pageSession, destroySession };
