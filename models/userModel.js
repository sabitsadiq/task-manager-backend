const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add the user name"],
    },
    email: {
      type: String,
      require: [true, "Please add the user email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);

// const db = require("../config/dbConnection");

// (async () => {
//   try {
//     await db.schema.dropTableIfExists("users");

//     await db.schema.withSchema("public").createTable("users", (table) => {
//       table.increments("id").primary();
//       table.string("username").notNullable();
//       table.string("email").notNullable();
//       table.string("password").notNullable();
//     });

//     // console.log("Created users table with id, username, and password columns!");
//     process.exit(0);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// })();
