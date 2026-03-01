import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">ResumeTracker</div>

        <div className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="btn-primary">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}