import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/jsx/HomePage';
import AboutPage from './pages/jsx/AboutPage';
import ProjectsPage from './pages/jsx/ProjectsPage';
import AchievementsPage from './pages/jsx/AchievementsPage';
import TechStackPage from './pages/jsx/TechStackPage';
import ContactPage from './pages/jsx/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/TechStackPage" element={<TechStackPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
