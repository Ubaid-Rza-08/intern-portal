import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Leaderboard.css';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/leaderboard").then(res => setRows(res.data));
  }, []);

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>
      <ol>
        {rows.map((row, idx) =>
          <li key={idx}>{row.name} — ₹{row.donationsRaised}</li>
        )}
      </ol>
      <Link to="/dashboard" className="back-btn">Back to Dashboard</Link>
    </div>
  );
}
