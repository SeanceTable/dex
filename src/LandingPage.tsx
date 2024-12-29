import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h2>Welcome to qDex</h2>
      <p>qBit's Decentralized dApps</p>
      <Link to="/widget">
        <button>Go to DEX Widget</button>
      </Link>
    </div>
  );
};

export default LandingPage;