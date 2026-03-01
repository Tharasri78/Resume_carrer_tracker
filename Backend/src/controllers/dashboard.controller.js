const JobApplication = require("../models/JobApplication");

exports.getDashboardStats = async (req, res) => {
  const userId = req.user._id;

  const total = await JobApplication.countDocuments({ user: userId });

  const applied = await JobApplication.countDocuments({
    user: userId,
    status: "Applied",
  });

  const interview = await JobApplication.countDocuments({
    user: userId,
    status: "Interview",
  });

  const rejected = await JobApplication.countDocuments({
    user: userId,
    status: "Rejected",
  });

  const selected = await JobApplication.countDocuments({
    user: userId,
    status: "Selected",
  });

  res.json({
    total,
    applied,
    interview,
    rejected,
    selected,
  });
};