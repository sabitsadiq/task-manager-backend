const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const db = require("./config/dbConnection");
// const connectDb = require("./config/dbConnection");
const { pool } = require("./config/dbConnection");

// connectDb();
// connecting to mysql/postgres by switching db and pool below
// db.connect((error) => {
//   if (error) {
//     console.log(`DB error: ${error}`);
//   } else {
//     console.log("DB CONNECTED");
//   }
// });

const app = express();

// const port = process.env.MAIN_PORT || 5000;
const port = process.env.PORT;
app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
