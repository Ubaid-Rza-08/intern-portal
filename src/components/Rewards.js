import React from "react";
import './Rewards.css';

export default function Rewards() {
  const rewards = [
    { icon: '🎁', title: 'Bronze Badge', amount: 1000, color: '#CD7F32' },
    { icon: '🥈', title: 'Silver Badge', amount: 5000, color: '#C0C0C0' },
    { icon: '👕', title: 'Free T-Shirt', amount: 10000, color: '#4F46E5' },
    { icon: '🏆', title: 'Gold Badge', amount: 25000, color: '#FFD700' },
    { icon: '💎', title: 'Premium Access', amount: 50000, color: '#9333EA' }
  ];

  return (
    <div className="rewards-section animate-fade-in">
      <h3 className="rewards-title">
        <span className="rewards-icon">🎯</span>
        Rewards & Achievements
      </h3>
      <div className="rewards-grid">
        {rewards.map((reward, index) => (
          <div 
            key={index} 
            className="reward-card animate-scale-up"
            style={{ 
              '--delay': `${index * 100}ms`,
              '--accent-color': reward.color 
            }}
          >
            <div className="reward-icon">{reward.icon}</div>
            <div className="reward-info">
              <h4 className="reward-name">{reward.title}</h4>
              <p className="reward-amount">₹{reward.amount.toLocaleString()}</p>
            </div>
            <div className="reward-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};