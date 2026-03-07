import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getDashboardStats } from "../api/dashboard.api";
import { getUpcomingFollowUps } from "../api/job.api";
import NotificationBell from "../components/common/NotificationBell";
import "../styles/dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Selected: 0
  });

  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadStats();
    loadFollowUps();
  }, [isAuthenticated]);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError("Dashboard data unavailable");
    } finally {
      setLoading(false);
    }
  };

  const loadFollowUps = async () => {
    try {
      const data = await getUpcomingFollowUps();
      setFollowUps(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const successRate = stats.total > 0
    ? Math.round((stats.Selected / stats.total) * 100)
    : 0;

  const interviewRate = stats.total > 0
    ? Math.round((stats.Interview / stats.total) * 100)
    : 0;

  const chartData = {
    labels: ["Applied", "Interview", "Rejected", "Selected"],
    datasets: [
      {
        label: "Applications",
        data: [stats.Applied, stats.Interview, stats.Rejected, stats.Selected],
        backgroundColor: [
          "rgba(156, 163, 175, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(16, 185, 129, 0.8)"
        ],
        borderColor: [
          "rgb(156, 163, 175)",
          "rgb(139, 92, 246)",
          "rgb(239, 68, 68)",
          "rgb(16, 185, 129)"
        ],
        borderWidth: 1
      }
    ]
  };

  const barChartData = {
    labels: ["Application Status"],
    datasets: [
      {
        label: "Applied",
        data: [stats.Applied],
        backgroundColor: "rgba(156, 163, 175, 0.8)",
      },
      {
        label: "Interview",
        data: [stats.Interview],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
      },
      {
        label: "Rejected",
        data: [stats.Rejected],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
      },
      {
        label: "Selected",
        data: [stats.Selected],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{error}</p>
      <button onClick={loadStats} className="primary-btn retry-btn">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">JobTracker</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <span className="nav-icon"></span>
            <span>Dashboard</span>
          </Link>
          <Link to="/jobs" className="nav-item">
            <span className="nav-icon"></span>
            <span>Applications</span>
          </Link>
          <Link to="/resume" className="nav-item">
            <span className="nav-icon"></span>
            <span>Resume Manager</span>
          </Link>
          
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-email">{user?.email || ""}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon"></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1 className="page-title">Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span className="user-highlight">{user?.name || "User"}</span>
            </p>
          </div>

          <div className="header-right">
            <NotificationBell />
            <div className="date-display">
              <span className="date-icon"></span>
              <span className="date-text">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="kpi-section">
          <KPI 
            label="Total Applications" 
            value={stats.total} 
            icon=""
            trend={stats.total > 0 ? "+12%" : "0%"}
          />
          <KPI 
            label="Applied" 
            value={stats.Applied} 
            icon=""
            color="applied"
          />
          <KPI 
            label="Interviews" 
            value={stats.Interview} 
            icon=""
            color="interview"
          />
          <KPI 
            label="Rejected" 
            value={stats.Rejected} 
            icon=""
            color="rejected"
          />
          <KPI 
            label="Selected" 
            value={stats.Selected} 
            
            color="selected"
          />
        </section>

        {/* Charts Section */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Application Distribution</h3>
              <div className="chart-stats">
                <span>Success Rate: {successRate}%</span>
                <span>Interview Rate: {interviewRate}%</span>
              </div>
            </div>
            <div className="chart-container">
              <Pie data={chartData} options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  }
                }
              }} />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Status Breakdown</h3>
              <div className="progress-summary">
                <div className="progress-item">
                  <span className="progress-label">Progress</span>
                  <span className="progress-value">{stats.total} total</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <Bar data={barChartData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          {/* Follow-ups Panel */}
          <div className="panel followups-panel">
            <div className="panel-header">
              <h3>
                <span className="panel-icon"></span>
                Upcoming Follow-Ups
              </h3>
              <span className="panel-badge">{followUps.length}</span>
            </div>

            <div className="followups-list">
              {followUps.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon"></span>
                  <p>No upcoming follow-ups</p>
                  <small>Take a break or add new applications</small>
                </div>
              ) : (
                followUps.map(job => (
                  <div key={job._id} className="followup-item">
                    <div className="followup-company">
                      <strong>{job.company}</strong>
                      <span className="followup-role">{job.role}</span>
                    </div>
                    <div className="followup-date">
                      <span className="date-badge">
                        {new Date(job.followUpDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="days-left">
                        {Math.ceil((new Date(job.followUpDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="panel actions-panel">
            <div className="panel-header">
              <h3>
                <span className="panel-icon"></span>
                Quick Actions
              </h3>
            </div>

            <div className="actions-grid">
              <Link to="/jobs" className="action-card">
                <div className="action-icon"></div>
                <div className="action-content">
                  <span className="action-title">Manage Applications</span>
                  <span className="action-subtitle">View and update your job applications</span>
                </div>
                <span className="action-arrow">→</span>
              </Link>

              <Link to="/resume" className="action-card">
                <div className="action-icon"></div>
                <div className="action-content">
                  <span className="action-title">Resume Manager</span>
                  <span className="action-subtitle">Upload and manage your resumes</span>
                </div>
                <span className="action-arrow">→</span>
              </Link>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const KPI = ({ label, value, icon, trend, color = "default" }) => {
  return (
    <div className={`kpi-card kpi-${color}`}>
      <div className="kpi-header">
        <span className="kpi-icon">{icon}</span>
        {trend && <span className="kpi-trend">{trend}</span>}
      </div>
      <div className="kpi-body">
        <span className="kpi-value">{value}</span>
        <span className="kpi-label">{label}</span>
      </div>
    </div>
  );
};

export default Dashboard;