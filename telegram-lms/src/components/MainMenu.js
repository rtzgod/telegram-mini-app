// src/components/MainMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = ({ progressData }) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate('/course/1');
  };

  const handleViewProgress = () => {
    navigate('/progress');
  };

  return (
    <div className="main-menu-container">
      <h1>Welcome to the Learning App</h1>
      <div className="menu-buttons">
        <button className="menu-button" onClick={handleStartCourse}>
          Start Course
        </button>
        <button className="menu-button" onClick={handleViewProgress}>
          View Progress
        </button>
      </div>

      {progressData && (
        <div className="progress-summary">
          <h2>Your Progress</h2>
          <ul className="progress-list">
            {Object.keys(progressData).map((date) => (
              <li key={date} className="progress-item">
                {date}: {progressData[date]} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
