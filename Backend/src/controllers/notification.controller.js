const JobApplication = require("../models/JobApplication");

exports.getNotifications = async (req, res) => {
  try {
    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const jobs = await JobApplication.find({
      user: req.user._id,
      followUpDate: {
        $gte: today,
        $lte: twoDaysLater
      }
    });

    const notifications = jobs.map(job => ({
      message: `Follow up with ${job.company} for ${job.role}`,
      date: job.followUpDate
    }));

    res.json(notifications);

  } catch (error) {
    res.status(500).json({ message: "Failed to load notifications" });
  }
};