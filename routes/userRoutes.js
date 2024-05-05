const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  testing,
  logoutUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.delete("/logout", logoutUser);
router.get("/testing", testing);

module.exports = router;
