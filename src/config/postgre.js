const { Pool } = require("pg");

const db = new Pool({
  host: process.env.LOCALHOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT,
});

module.exports = db;
