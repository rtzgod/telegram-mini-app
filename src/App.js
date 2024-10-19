import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UserSelection from './UserSelection'; // Import the new UserSelection component
import './App.css';  // Assuming you have general styles here

function App() {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    // Navigate to the User Selection page
    navigate('/user-selection');
  };

  return (
    <div className="App">
      <header className="App-header">My Courses</header>
      <div className="courses-list">
        <div className="course-item">course1</div>
        <div className="course-item">course2</div>
      </div>
      <footer className="App-footer">
        <div className="balance">5.12t</div>
        <button className="find-courses-button">Find Courses</button>
        <button className="notification-button" onClick={handleNotificationClick}>🔔</button>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user-selection" element={<UserSelection />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
