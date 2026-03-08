import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../styles/home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    howItWorks: useRef(null)
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(prev => ({ ...prev, [key]: entry.isIntersecting }));
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">JobTracker</div>
          
          <div className="nav-links">
            <button 
              onClick={() => scrollToSection(sectionRefs.features)}
              className="nav-link"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection(sectionRefs.howItWorks)}
              className="nav-link"
            >
              How It Works
            </button>
          </div>

          <div className="nav-buttons">
            <Link to="/login" className="nav-login">Sign In</Link>
            <Link to="/register" className="nav-register">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero} 
        className={`hero-section ${isVisible.hero ? 'visible' : ''}`}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Track your job applications,
            <br />
            <span className="hero-highlight">build resumes</span> and land your dream job
          </h1>
          <p className="hero-subtitle">
            A simple way to organize your job search journey
          </p>
          
          <div className="hero-cta">
            <Link to="/register" className="cta-primary">
              Start Your Journey →
            </Link>
            <Link to="/login" className="cta-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={sectionRefs.features}
        className={`features-section ${isVisible.features ? 'visible' : ''}`}
      >
        <div className="section-header">
          <h2 className="section-title">
            Everything you need to{' '}
            <span className="gradient-text">land your dream job</span>
          </h2>
          <p className="section-subtitle">
            Powerful tools to streamline your job search and boost your success rate
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <span className="feature-icon">📋</span>
            </div>
            <h3>Application Tracker</h3>
            <p>Track all your job applications in one place. Never miss a follow-up or deadline again.</p>
            <ul className="feature-list">
              <li>✓ Status tracking</li>
              <li>✓ Deadline reminders</li>
              <li>✓ Interview scheduler</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <span className="feature-icon">📄</span>
            </div>
            <h3>Resume Builder</h3>
            <p>Create  resumes with our professional templates and builder.</p>
            <ul className="feature-list">
              <li>✓ Professional templates</li>
              <li>✓ ATS optimized</li>
              <li>✓ PDF export</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper green">
              <span className="feature-icon">📊</span>
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Get insights into your job search with detailed analytics and reports.</p>
            <ul className="feature-list">
              <li>✓ Success rate tracking</li>
              <li>✓ Response analytics</li>
              <li>✓ Progress reports</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper orange">
              <span className="feature-icon">🔔</span>
            </div>
            <h3>Smart Reminders</h3>
            <p>Never miss an opportunity with automated follow-up reminders.</p>
            <ul className="feature-list">
              <li>✓ Follow-up alerts</li>
              <li>✓ Interview reminders</li>
              <li>✓ Deadline notifications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={sectionRefs.howItWorks}
        className={`how-it-works-section ${isVisible.howItWorks ? 'visible' : ''}`}
      >
        <div className="section-header">
          <h2 className="section-title">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="section-subtitle">
            Three simple steps to organize your job search
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up for free and set up your profile in minutes</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Add Applications</h3>
            <p>Track jobs you've applied to and set follow-up reminders</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Build Resume</h3>
            <p>Create professional resumes tailored to each application</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>JobTracker</h4>
            <p>Your complete job search companion</p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/careers">Careers</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 JobTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;