const express = require("express");
const protect = require("../middleware/auth.middleware");
const { getNotifications } = require("../controllers/notification.controller");

const router = express.Router();

router.get("/", protect, getNotifications);

module.exports = router;