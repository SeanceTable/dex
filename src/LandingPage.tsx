import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h2>qPortal</h2>
      <p>qBit's Decentralized dApps</p>
      <Link to="/widget">
        <button>qSwap</button>
        </Link>
      <Link to="/swappy">
        <button>Swappy</button>
        </Link>
      <Link to="/bridge">
        <button>Bridge</button>
      </Link>
    </div>
  );
};

export default LandingPage;