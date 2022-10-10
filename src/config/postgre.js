const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { Pool } = require("pg");

const db = new Pool({
  host: "localhost",
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT,
});

module.exports = db;
