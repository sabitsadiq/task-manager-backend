const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const connectDb = require("../config/dbConnection");
const db = require("../config/dbConnection");
const { pool } = require("../config/dbConnection");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, password2 } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // const userAvailable = await User.findOne({ email });
  // if (userAvailable) {
  //   res.status(400);
  //   throw new Error("User already registered");
  // }

  /*mySQL*/
  db.query(
    `SELECT email FROM users WHERE email = $1`,
    [email],
    (error, result) => {
      if (error) {
        console.log(`error: ${error}`);
        res.status(500);
        throw new Error("Database error");
      }
      if (result.length > 0) {
        res.status(400);
        res.json({ message: "User already registered" });
        return;
      }
    }
  );
  if (password.trim().length < 6) {
    res.status(400);
    throw new Error("Password should be atleast 6 characters");
  }

  if (password != password2) {
    res.status(400);
    throw new Error("Password do not match.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // const user = await User.create({
  //   username,
  //   email,
  //   password: hashedPassword,
  // });
  // console.log(`User created ${user}`);
  // if (user) {
  //   res.status(201).json({ _id: user.id, email: user.email });
  // res.json({ message: "User Registered successfully" });
  // } else {
  //   res.status(400);
  //   throw new Error("User data is not valid");
  // }
  const sql = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`;
  db.query(sql, [username, email, hashedPassword], function (err, data) {
    if (err) {
      console.log(`Error occur: ${err}`);
    } else {
      console.log(`User created ${data}`);
      res.json({ message: "User Registered successfully" });
    }
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // const user = await User.findOne({ email });
  // if (user && (await bcrypt.compare(password, user.password))) {
  //   const accessToken = jwt.sign(
  //     {
  //       user: {
  //         username: user.username,
  //         email: user.email,
  //         id: user.id,
  //       },
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: "15m" }
  //   );
  //   res.status(200).json({ accessToken });
  //   // res.staus(200);
  //   // res.cookie = ("token", accessToken);
  // } else {
  //   res.status(401);
  //   throw new Error("Email or Password is not valid");
  // }
  /*mySQL*/
  const sql = `SELECT email,password,username,user_id FROM user WHERE email = ?`;
  console.log("sql", sql);
  db.query(sql, [email, password], (error, result) => {
    console.log("result", result);
    if (error) {
      console.log(`error: ${error}`);
      res.status(500);
      throw new Error("Database error");
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, result) => {
        if (error) {
          return res.status(400).json({ message: "wrong password" });
        } else {
          console.log("password match");
        }
      });
      if (result) {
        console.log("result2", result);
        const accessToken = jwt.sign(
          {
            user: {
              username: result[0].username,
              email: result[0].email,
              id: result[0].user_id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token: accessToken });
      }
    } else {
      return res.json({ message: "User don't exist" });
    }
  });
});

// PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token"); // Clear token from cookies
  req.user = null; // Clear user data from request object
  res.json({ message: "Logged out successfully" });
});

// testing
const testing = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { registerUser, loginUser, currentUser, testing, logoutUser };
