import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../common/NotificationBell";
import "../../styles/navbar.css";

export default function Navbar() {

  const { user, logout } = useAuth();

  return (
    <nav className="navbar">

      <div className="nav-left">
        <h3>ResumeTracker</h3>
      </div>

      <div className="nav-right">

        {/* Notification Bell */}
        <NotificationBell />

        <span className="user-name">
          {user?.name}
        </span>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>

    </nav>
  );
}