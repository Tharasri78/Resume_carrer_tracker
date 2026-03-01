const express = require("express");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

// Test protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;