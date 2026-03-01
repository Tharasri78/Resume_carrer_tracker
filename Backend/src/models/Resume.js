const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true
    },

    personal: {
      fullName: String,
      phone: String,
      location: String,
      summary: String
    },

    education: [
      {
        institution: String,
        degree: String,
        startYear: String,
        endYear: String
      }
    ],

    skills: [String],

    projects: [
      {
        title: String,
        description: String,
        technologies: String
      }
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);