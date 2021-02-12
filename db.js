const Pool = require("pg").Pool;

const devConfig = {
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
};
const proConfig = process.env.DATABASE_URL;

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
