import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatedBackground } from '../App';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onLogin(username);
      navigate('/dashboard');
    } else {
      setError('Enter username and password');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <AnimatedBackground>
      <div className="login-container animate-slide-up">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">🚀</div>
            <h1 className="app-title">InternPortal</h1>
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-container">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="modern-input"
                autoFocus
              />
              <div className="input-border"></div>
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
                <span>Sign In</span>
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
          <p className="demo-text">Demo mode - any credentials work</p>
          <p>Don't have an account? <Link to="/signup" className="link-accent">Sign up</Link></p>
        </div>
      </div>
    </AnimatedBackground>
  );
};