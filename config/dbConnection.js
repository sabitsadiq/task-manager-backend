const mongoose = require("mongoose");
const mysql = require("mysql");
const { Pool } = require("pg");
const knex = require("knex");
const dotenv = require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING);
//     console.log(
//       "Database connected",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB,
// });
// module.exports = db;

// postgres connection code

// const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
// });

// const pool = new Pool({
//   Username: process.env.USER,
//   Password: process.env.PASSWORD,
//   Hostname: process.env.HOST,
//   Port: process.env.PORT, // default Postgres port
//   Database: process.env.DATABASE,
// });
// module.exports = { pool };

const db = knex({
  client: "pg",
  connection: {
    connectionString:
      "postgres://sadiq:JmpnTGtXPKY54ripQDRk75DAvcTYCvPi@dpg-cnb824da73kc73b0flfg-a.oregon-postgres.render.com/postgresdb_tqjh",
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
