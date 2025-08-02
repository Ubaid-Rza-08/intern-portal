import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AnimatedBackground, LoadingSpinner } from '../App';
import './Leaderboard.css';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://intern-portal-backend-deploy.onrender.com/api/leaderboard")
      .then(res => {
        setRows(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard data:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatedBackground>
      <div className="leaderboard-container animate-slide-up">
        <header className="leaderboard-header">
          <h1 className="leaderboard-title">
            <span className="title-icon">🏆</span>
            Leaderboard
          </h1>
          <p className="leaderboard-subtitle">Top performing interns</p>
        </header>

        <div className="leaderboard-list">
          {rows.map((row, index) => (
            <div 
              key={index} 
              className={`leaderboard-item animate-slide-in ${index < 3 ? 'top-three' : ''}`}
              style={{ '--delay': `${index * 100}ms` }}
            >
              <div className="rank-badge">
                {index === 0 && <span className="medal gold">🥇</span>}
                {index === 1 && <span className="medal silver">🥈</span>}
                {index === 2 && <span className="medal bronze">🥉</span>}
                {index > 2 && <span className="rank-number">#{index + 1}</span>}
              </div>
              
              <div className="participant-info">
                <h3 className="participant-name">{row.name}</h3>
                <div className="donation-amount">₹{row.donationsRaised.toLocaleString()}</div>
              </div>
              
              <div className="item-glow"></div>
            </div>
          ))}
        </div>

        <div className="leaderboard-actions">
          <Link to="/dashboard" className="modern-btn secondary">
            <span>← Back to Dashboard</span>
            <div className="btn-glow"></div>
          </Link>
        </div>
      </div>
    </AnimatedBackground>
  );
};