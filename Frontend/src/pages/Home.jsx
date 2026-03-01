import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation */}
     

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Track your job applications,
            <br />
            <span className="hero-highlight">build resumes</span> and land your dream job
          </h1>
          <p className="hero-subtitle">
            A simple way to organize your job search journey
          </p>
          
          {/* CTA Buttons */}
          <div className="hero-cta">
            <Link to="/register" className="cta-primary">
              Register →
            </Link>
            <Link to="/login" className="cta-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 JOBSNAP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;