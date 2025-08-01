import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
      navigate('/dashboard');
    } else {
      setErr('Enter username and password');
    }
  }

  return (
    <div className="login-container">
      <h2>Intern Portal Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username}
               onChange={e => setUsername(e.target.value)}
               placeholder="Username" autoFocus />
        <input type="password" value={password}
               onChange={e => setPassword(e.target.value)}
               placeholder="Password" />
        <button type="submit">Log In</button>
        {err && <div className="error">{err}</div>}
      </form>
      <p className="sub-text">No real authentication for demo</p>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
