import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
          {/* Video Background */}
    <div className="video-background">
        <video autoPlay muted loop playsInline className="video-bg">
            <source src="https://cultist.in/qBit/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
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
      <a href="https://cultist.in/qBit/" target="_blank" rel="noopener noreferrer">
    <button>Back Home</button>
</a>

    </div>
  );
};

export default LandingPage;