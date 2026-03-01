const express = require("express");
const protect = require("../middleware/auth.middleware");
const {
  createJob,
  getJobs,
  updateJob,
} = require("../controllers/job.controller");

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.put("/:id", protect, updateJob);

module.exports = router;