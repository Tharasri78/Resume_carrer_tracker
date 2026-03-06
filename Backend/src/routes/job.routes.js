const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createJob,
  getJobs,
  updateJob,
} = require("../controllers/job.controller");

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.put("/:id", protect, updateJob);

module.exports = router;