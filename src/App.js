import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
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
  );
}

export default App;
