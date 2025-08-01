import React, { useEffect, useState } from "react";
import axios from "axios";
import Rewards from "./Rewards";
import { Link } from "react-router-dom";
import './Dashboard.css';

export default function Dashboard({ username }) {
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/intern-dashboard?name=${encodeURIComponent(username)}`)
      .then(res => setIntern(res.data));
  }, [username]);

  return (
    <div className="dashboard">
      <h2>Welcome, {username}</h2>
      {intern ? <>
        <div className="dashboard-row">
          <b>Referral Code:</b> {intern.referralCode}
        </div>
        <div className="dashboard-row">
          <b>Total Donations:</b> ₹{intern.donationsRaised}
        </div>
        <Rewards />
      </> : <p>Loading...</p>}
      <Link to="/leaderboard" className="leaderboard-btn">View Leaderboard</Link>
    </div>
  );
}
