const JobApplication = require("../models/JobApplication");

// CREATE job application
exports.createJob = async (req, res) => {
  const job = await JobApplication.create({
    user: req.user._id,
    ...req.body,
  });

  res.status(201).json(job);
};

// GET all jobs of logged-in user
exports.getJobs = async (req, res) => {
  const jobs = await JobApplication.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(jobs);
};

// UPDATE job status / details
exports.updateJob = async (req, res) => {
  const job = await JobApplication.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};