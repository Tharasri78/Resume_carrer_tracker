import { useEffect, useState } from "react";
import { getJobs, createJob, updateJobStatus } from "../api/job.api";
import "../styles/job.css";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    followUpDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) return;

    try {
      await createJob(formData);
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        followUpDate: "",
        notes: "",
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to add job", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobStatus(id, newStatus);
      fetchJobs();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading your applications...</div>;
  }

  return (
    <div className="job-tracker-page">
      <header className="page-header">
        <h1>Job Tracker</h1>
        <p>Track, organize and follow up on your job applications</p>
      </header>

      {/* ─── ADD NEW APPLICATION FORM ─── */}
      <form className="add-job-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google, TCS, Zoho"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer, SDE-1"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected / Offer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Notes / Next Steps</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Waiting for HR call, Prepare system design..."
              rows={2}
            />
          </div>
        </div>

        <button type="submit" className="btn-add">
          + Add Application
        </button>
      </form>

      {/* ─── JOB LIST ─── */}
      <div className="jobs-container">
        {jobs.length === 0 ? (
          <div className="empty-state">
            <p>No job applications yet.</p>
            <small>Add your first application above!</small>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-top">
                  <h3 className="company">{job.company}</h3>
                  <span className={`status-badge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>

                <p className="role-name">{job.role}</p>

                {job.followUpDate && (
                  <p className="follow-up">
                    Follow up: <strong>{new Date(job.followUpDate).toLocaleDateString("en-GB")}</strong>
                  </p>
                )}

                {job.notes && <p className="notes-preview">{job.notes}</p>}

                <div className="status-control">
                  <label>Update status</label>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected / Offer</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}