// controllers/resume.controller.js
const Resume = require("../models/Resume");

// @desc    Get user's resume
// @route   GET /api/resume
// @access  Private
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.userId });
    
    if (!resume) {
      return res.status(200).json({}); // Return empty object if no resume exists
    }
    
    res.json(resume);
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Save or update user's resume
// @route   POST /api/resume
// @access  Private
const saveResume = async (req, res) => {
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
      projects,
      certifications
    } = req.body;

    // Validate required fields
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    // Prepare resume data
    const resumeData = {
      user: req.userId,
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      location: location || "",
      linkedin: linkedin || "",
      github: github || "",
      summary: summary || "",
      skills: Array.isArray(skills) ? skills : [],
      education: Array.isArray(education) ? education : [],
      experience: Array.isArray(experience) ? experience : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : []
    };

    // Find and update, or create if doesn't exist
    const resume = await Resume.findOneAndUpdate(
      { user: req.userId },
      resumeData,
      { 
        new: true,           // Return the updated document
        upsert: true,        // Create if it doesn't exist
        runValidators: true, // Run schema validators
        setDefaultsOnInsert: true // Set defaults on insert
      }
    );

    res.status(200).json(resume);
  } catch (error) {
    console.error("Save resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getResume,
  saveResume
};