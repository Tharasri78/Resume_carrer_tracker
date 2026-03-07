// pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login, loading ,error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Card - Welcome Section */}
        <div className="auth-left">
          <div className="auth-left-content">
            <h1>Welcome Back! </h1>
            <p>Your job search journey continues here. Track applications, manage resumes, and land your dream job.</p>
            
            {/* <div className="auth-left-features">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Track job applications in real-time</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📄</span>
                <span className="feature-text">Create and manage multiple resumes</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Get personalized job recommendations</span>
              </div>
            </div> */}
            
            <div className="auth-left-footer">
              New to JobTracker? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>

        {/* Right Card - Authentication Section */}
        <div className="auth-right">
          <div className="auth-right-header">
            <h2>Sign In</h2>
            <p>Welcome back! Please enter your details</p>
          </div>

          <div className="auth-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group with-icon">
                <span className="input-icon"></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group with-icon">
                <span className="input-icon"></span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

                {/* Error Message */}
            {error && <p className="auth-error">{error}</p>}    
               
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Sign In'}
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;