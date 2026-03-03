const Resume = require("../models/Resume");

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(200).json(null); // Important: not 404
    }

    res.json(resume);
  } catch (error) {
    console.error("GET RESUME ERROR:", error);
    res.status(500).json({ message: "Failed to fetch resume" });
  }
};

exports.saveResume = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      skills,
      education,
      experience,
      projects,          // ← added
      certifications,    // ← added
    } = req.body;

    const existing = await Resume.findOne({ user: req.user._id });

    if (existing) {
      const updated = await Resume.findOneAndUpdate(
        { user: req.user._id },
        {
          fullName,
          email,
          phone,
          location,
          linkedin,
          github,
          summary,
          skills,
          education,
          experience,
          projects,          // ← added
          certifications,    // ← added
        },
        { new: true }
      );

      return res.json(updated);
    }

    const resume = await Resume.create({
      user: req.user._id,
      fullName,
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      skills,
      education,
      experience,
      projects,            // ← added
      certifications,      // ← added
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("SAVE RESUME ERROR:", error);
    res.status(500).json({ message: "Failed to save resume" });
  }
};