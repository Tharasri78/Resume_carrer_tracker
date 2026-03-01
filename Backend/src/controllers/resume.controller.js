const Resume = require("../models/Resume");

exports.getResume = async (req, res) => {
  const resume = await Resume.findOne({ user: req.user._id });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};

exports.saveResume = async (req, res) => {
  const existing = await Resume.findOne({ user: req.user._id });

  if (existing) {
    const updated = await Resume.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    return res.json(updated);
  }

  const resume = await Resume.create({
    user: req.user._id,
    ...req.body
  });

  res.status(201).json(resume);
};