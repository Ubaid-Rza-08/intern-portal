import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (!fullName.trim() || !username.trim() || !password.trim()) {
      setError('Please fill all the fields.');
      return;
    }

    // Simulate signup success (no backend call)
    alert(`Signup successful for user: ${username}`);
    navigate('/login');
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          autoFocus
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      <div className="sub-text">This signup is simulated (dummy, no backend yet)</div>
    </div>
  );
}
