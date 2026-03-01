import { Link } from "react-router-dom";
import "../../styles/layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/resume">Resume</Link>
      <Link to="/jobs">Job Tracker</Link>
    </aside>
  );
}