const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    summary: String,

    skills: [String],

    education: [
      {
        degree: String,
        institution: String,
        year: String,
        location: String,          // added - e.g. "COIMBATORE"
        percentage: String,        // added - e.g. "83%" for HSLC
      },
    ],

    experience: [
      {
        title: String,
        company: String,
        duration: String,
        description: String,
      },
    ],

    // ──────────── NEW ────────────
    projects: [
      {
        title: String,
        duration: String,          // e.g. "MAR 2024"
        description: String,       // can contain bullets as \n separated text
        techStack: String,         // e.g. "React.js, Node.js, Express.js, MongoDB"
      },
    ],

    certifications: [String],     // simple array of certification strings
    // ─────────────────────────────
  },
  { timestamps: true }
);

resumeSchema.index({ user: 1 });

module.exports = mongoose.model("Resume", resumeSchema);