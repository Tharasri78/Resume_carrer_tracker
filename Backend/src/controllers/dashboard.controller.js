const JobApplication = require("../models/JobApplication");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await JobApplication.countDocuments({ user: userId });
    const Applied = await JobApplication.countDocuments({ user: userId, status: "Applied" });
    const Interview = await JobApplication.countDocuments({ user: userId, status: "Interview" });
    const Rejected = await JobApplication.countDocuments({ user: userId, status: "Rejected" });
    const Selected = await JobApplication.countDocuments({ user: userId, status: "Selected" });

    res.json({
      stats: { total, Applied, Interview, Rejected, Selected }
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
};

module.exports = { getDashboardStats };