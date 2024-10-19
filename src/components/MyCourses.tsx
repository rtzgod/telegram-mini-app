import React from 'react';
import './index.css';

const MyCourses: React.FC = () => {
  return (
    <div className="container">
      <div className="courses-box">
        <h2>my courses</h2>
        <button className="course-btn">course1</button>
        <button className="course-btn">course2</button>
      </div>

      <div className="bottom-nav">
        <div className="points">
          5.12<span className="currency">t</span>
        </div>
        <button className="find-courses-btn">find courses</button>
        <div className="notification">
          <img src="/notification_icon.png" alt="Notification" />
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
