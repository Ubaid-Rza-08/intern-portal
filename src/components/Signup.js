import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatedBackground } from '../App';
import './Login.css'; 

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.password.trim()) {
      setError('Please fill all the fields.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'success-popup';
    successMsg.innerHTML = `
      <div class="success-content">
        <div class="success-icon">✅</div>
        <p>Account created successfully!</p>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      document.body.removeChild(successMsg);
      navigate('/login');
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatedBackground>
      <div className="login-container animate-slide-up">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">🚀</div>
            <h1 className="app-title">InternPortal</h1>
          </div>
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Join our intern community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-container">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="modern-input"
                autoFocus
              />
              <div className="input-border"></div>
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="modern-input"
              />
              <div className="input-border"></div>
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="modern-input"
              />
              <div className="input-border"></div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`modern-btn primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="btn-spinner"></div>
            ) : (
              <>
                <span>Create Account</span>
                <div className="btn-glow"></div>
              </>
            )}
          </button>
          
          {error && (
            <div className="error-message animate-shake">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </form>
        
        <div className="login-footer">
          <p>Already have an account? <Link to="/login" className="link-accent">Sign in</Link></p>
          <p className="demo-text">This is a demo signup</p>
        </div>
      </div>
    </AnimatedBackground>
  );
};