// routes/auth.routes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

// ❗ NO middleware on register/login
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;