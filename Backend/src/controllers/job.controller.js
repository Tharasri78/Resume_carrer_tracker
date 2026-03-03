const JobApplication = require("../models/JobApplication");

// CREATE job
exports.createJob = async (req, res) => {
  try {
    const job = await JobApplication.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

// GET all jobs of logged-in user
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// UPDATE job
exports.updateJob = async (req, res) => {
  try {
    const job = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};