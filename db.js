const Client = require("pg").Client;

const devConfig = {
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
};
const proConfig = process.env.DATABASE_URL;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = client;
