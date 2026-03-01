import Layout from "../components/layout/Layout";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <Layout>
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h4>Total Applications</h4>
          <span>24</span>
        </div>

        <div className="stat-card">
          <h4>Interviews</h4>
          <span>5</span>
        </div>

        <div className="stat-card">
          <h4>Rejected</h4>
          <span>12</span>
        </div>

        <div className="stat-card">
          <h4>Selected</h4>
          <span>2</span>
        </div>
      </div>
    </Layout>
  );
}