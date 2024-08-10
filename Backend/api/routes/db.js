const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "characters",
  password: "Appl0812",
  port: 5432,
});

module.exports = pool;
