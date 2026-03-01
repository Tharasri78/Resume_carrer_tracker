// pages/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import '../../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { register, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      register(formData);
    }
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
            <h1>Join Us Today!</h1>
            <p>Start your journey to career success with our comprehensive job tracking platform.</p>
            
            {/* <div className="auth-left-features">
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span className="feature-text">Free account with unlimited applications</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span className="feature-text">Track your progress with analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span className="feature-text">Connect with other job seekers</span>
              </div>
            </div> */}
            
            <div className="auth-left-footer">
              Already have an account? <a href="/login">Sign in here</a>
            </div>
          </div>
        </div>

        {/* Right Card - Registration Section */}
        <div className="auth-right">
          <div className="auth-right-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          <div className="auth-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group with-icon">
                <span className="input-icon"></span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
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
              
              <div className="form-group with-icon">
                <span className="input-icon"></span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Create Account'}
              </button>
            </form>

            {/* <div className="social-login">
              <p>Or sign up with</p>
              <div className="social-buttons">
                <button className="social-button google">
                  G
                </button>
                <button className="social-button github">
                  GH
                </button>
                <button className="social-button linkedin">
                  in
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 