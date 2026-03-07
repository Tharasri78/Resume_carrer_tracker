const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const { getUpcomingFollowUps } = require("../controllers/job.controller");

const {
  createJob,
  getJobs,
  updateJob,
} = require("../controllers/job.controller");

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.put("/:id", protect, updateJob);

router.get("/upcoming", protect, getUpcomingFollowUps);
module.exports = router;