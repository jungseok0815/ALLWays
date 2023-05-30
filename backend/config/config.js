require('dotenv').config();
const env = process.env;

const development = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DATABASE,
  host: env.DATABASE_HOST,
  dialect: "mysql",
};

const production = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: "database_production",
  host: env.DATABASE_HOST,
  dialect: "mysql",
};

const test = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: "database_test",
  host: env.DATABASE_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
