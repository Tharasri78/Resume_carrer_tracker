import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../api/axios";
import "../styles/resume.css";

export default function Resume() {
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // LOAD RESUME ON PAGE LOAD
  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get("/resume");
        setFullName(data.personal?.fullName || "");
        setSkills((data.skills || []).join(", "));
      } catch (err) {
        err
        // no resume yet → ignore
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  const saveResume = async () => {
    setSaved(false);
    await api.post("/resume", {
      personal: { fullName },
      skills: skills.split(",").map((s) => s.trim()),
    });
    setSaved(true);
  };

  if (loading) return <Layout><p className="loading">Loading resume…</p></Layout>;

  return (
    <Layout>
      <div className="resume-page">
        <h1>Resume</h1>
        <p className="subtitle">Manage your professional details</p>

        {/* FORM */}
        <div className="resume-card">
          <label>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
          />

          <label>Skills</label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Node, MongoDB"
          />

          <button onClick={saveResume}>Save Resume</button>

          {saved && <span className="success">✔ Resume saved</span>}
        </div>

        {/* PREVIEW */}
        {(fullName || skills) && (
          <div className="resume-preview">
            <h2>{fullName}</h2>
            <div className="skills">
              {skills.split(",").map((skill) => (
                <span key={skill}>{skill.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}