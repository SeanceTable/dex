import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './LandingPage';
import WidgetPage from './WidgetPage';
import './styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App container">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/widget" element={<WidgetPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;