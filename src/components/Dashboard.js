import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AnimatedBackground, LoadingSpinner } from '../App';
import Rewards from "./Rewards";
import './Dashboard.css';

export default function Dashboard({ username }) {
  const [intern, setIntern] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/api/intern-dashboard?name=${encodeURIComponent(username)}`)
      .then(res => {
        setIntern(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
        setIsLoading(false);
      });
  }, [username]);

  const handleCopyReferralCode = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Copy button clicked');
    
    if (!intern?.referralCode) {
      console.error('No referral code available');
      setCopyButtonText('No Code');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
      return;
    }

    const textToCopy = String(intern.referralCode);
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        console.log('Copied with modern API');
      } else {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('execCommand failed');
        }
        console.log('Copied with fallback method');
      }
      
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
      
    } catch (err) {
      console.error('Copy failed:', err);
      setCopyButtonText('Failed');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!intern) {
    return (
      <AnimatedBackground>
        <div className="dashboard-container">
          <p>Failed to load dashboard data. Please try refreshing the page.</p>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <div className="dashboard-container animate-slide-up">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="welcome-section">
              <h1 className="welcome-title animate-type">
                Welcome back, {username}! 👋
              </h1>
              <p className="welcome-subtitle">Here's your progress overview</p>
            </div>
            <div className="user-avatar">
              <div className="avatar-ring"></div>
              <span className="avatar-text">{username.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card referral-card animate-float">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h3>Referral Code</h3>
              <p className="stat-value">{intern.referralCode || 'N/A'}</p>
              <button
                className="copy-btn"
                onClick={handleCopyReferralCode}
                disabled={!intern.referralCode}
                type="button"
              >
                {copyButtonText}
              </button>
            </div>
            <div className="stat-glow"></div>
          </div>

          <div className="stat-card donations-card animate-float">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Donations</h3>
              <p className="stat-value animate-count">₹{(intern.donationsRaised || 0).toLocaleString()}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(((intern.donationsRaised || 0) / 50000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-glow"></div>
          </div>
        </div>

        <Rewards />

        <div className="dashboard-actions">
          <Link to="/leaderboard" className="modern-btn secondary">
            <span>🏆 View Leaderboard</span>
            <div className="btn-glow"></div>
          </Link>
        </div>
      </div>
    </AnimatedBackground>
  );
};