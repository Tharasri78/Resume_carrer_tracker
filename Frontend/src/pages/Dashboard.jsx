import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Selected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchStats();
  }, [isAuthenticated, navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Dashboard data unavailable");

      const data = await res.json();
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const successRate =
    stats.total > 0
      ? Math.round(((stats.Interview + stats.Selected) / stats.total) * 100)
      : 0;

  if (loading) return <div className="page-center">Loading dashboard…</div>;

  if (error)
    return (
      <div className="page-center error-state">
        <p>{error}</p>
        <button onClick={fetchStats} className="primary-btn">Retry</button>
      </div>
    );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>
            Welcome back, <span className="user-name">{user?.name || "User"}</span>
          </p>
        </div>
        <div className="header-right">
          <span className="current-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="kpi-grid">
        <KPI label="Total Applications" value={stats.total} color="blue" />
        <KPI label="Applied" value={stats.Applied} color="gray" />
        <KPI label="Interviews" value={stats.Interview} color="purple" />
        <KPI label="Rejected" value={stats.Rejected} color="red" />
        <KPI label="Selected" value={stats.Selected} color="green" />
      </section>

      {/* Main Content */}
      <div className="main-content-grid">
        {/* Progress Panel */}
        <div className="panel progress-panel">
          <div className="panel-header">
            <h2>Application Progress</h2>
            <p className="success-rate">
              Success rate: <strong>{successRate}%</strong>
            </p>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${successRate}%` }}
            />
          </div>

          {stats.total === 0 && (
            <div className="empty-state">
              <p>You haven't added any job applications yet.</p>
              <Link to="/jobs" className="primary-btn">
                Start Adding Jobs
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="panel actions-panel">
          <div className="panel-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="action-list">
            <Link to="/jobs" className="action-card">
              <div className="action-content">
                <h3>Manage Applications</h3>
                <p>View, edit or add new job applications</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/resume" className="action-card">
              <div className="action-content">
                <h3>Resume Manager</h3>
                <p>Update and organize your resumes</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPI = ({ label, value, color }) => {
  const colorClasses = {
    blue: "kpi-blue",
    gray: "kpi-gray",
    purple: "kpi-purple",
    red: "kpi-red",
    green: "kpi-green",
  };

  return (
    <div className={`kpi-card ${colorClasses[color] || ""}`}>
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">{value.toLocaleString()}</span>
    </div>
  );
};

export default Dashboard;