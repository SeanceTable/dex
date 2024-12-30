import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './LandingPage';
import WidgetPage from './WidgetPage';
import SwappyPage from './SwappyPage.tsx';
import './styles.css';
import BridgePage from './BridgePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App container">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/widget" element={<WidgetPage />} />
          <Route path="/bridge" element={<BridgePage />} /> {/* New Route */}
          <Route path="/swappy" element={<SwappyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;