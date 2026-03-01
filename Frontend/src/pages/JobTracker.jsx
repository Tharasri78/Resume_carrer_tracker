import { useEffect, useState } from "react";
import { getJobs, createJob } from "../api/job.api";
import Layout from "../components/layout/Layout";
import StatusBadge from "../components/common/StatusBadge";
import "../styles/job.css";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const addJob = async () => {
    const newJob = await createJob({
      company,
      role,
      appliedDate: new Date(),
    });
    setJobs([newJob, ...jobs]);
    setCompany("");
    setRole("");
  };

  return (
    <Layout>
      <h2>Job Tracker</h2>

      <div className="job-form">
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={addJob}>Add</button>
      </div>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job._id}>
            <strong>{job.company}</strong> — {job.role}{" "}
            <StatusBadge status={job.status} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}