import React from 'react';
import './UserSelection.css'; // Importing CSS for this component

const UserSelection = () => {
  return (
    <div className="container">
      <div className="selection-box">
        <h2>Tell us who u r</h2>
        <button className="btn">Teacher</button>
        <button className="btn">Student</button>
      </div>
    </div>
  );
};

export default UserSelection;
