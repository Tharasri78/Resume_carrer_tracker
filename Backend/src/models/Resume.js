const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
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
        location: String,
        percentage: String
      }
    ],

    experience: [
      {
        title: String,
        company: String,
        duration: String,
        description: String
      }
    ],

    projects: [
      {
        title: String,
        duration: String,
        description: String,
        techStack: String
      }
    ],

    certifications: [String]

  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);