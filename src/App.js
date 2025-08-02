import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import './App.css';

// Animated Background Component
export const AnimatedBackground = ({ children }) => (
  <div className="animated-bg">
    <div className="floating-shapes">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`shape shape-${i + 1}`}></div>
      ))}
    </div>
    {children}
  </div>
);

// Loading Spinner Component
export const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
    <p className="loading-text">Loading your data...</p>
  </div>
);

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={
            <Login
              onLogin={username => {
                setUser(username);
                setLoggedIn(true);
              }}
            />
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            loggedIn ? <Dashboard username={user} /> : <Navigate to="/login" />
          } />
          <Route path="/leaderboard" element={
            loggedIn ? <Leaderboard /> : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;