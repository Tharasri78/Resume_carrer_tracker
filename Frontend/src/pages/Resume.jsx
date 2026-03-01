import { useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../api/axios";
import "../styles/resume.css";

export default function Resume() {
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState("");

  const saveResume = async () => {
    await api.post("/resume", {
      personal: { fullName },
      skills: skills.split(",").map((s) => s.trim()),
    });
    alert("Resume saved");
  };

  return (
    <Layout>
      <h2>Resume</h2>

      <div className="resume-form">
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button onClick={saveResume}>Save</button>
      </div>
    </Layout>
  );
}