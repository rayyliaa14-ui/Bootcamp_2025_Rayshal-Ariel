const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_contacts",
  password: '112112',
  port: 5432,
});

module.exports = pool;
