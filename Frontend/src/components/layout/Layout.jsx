import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        {children}
      </div>
    </div>
  );
}