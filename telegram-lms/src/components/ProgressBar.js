// src/components/ProgressBar.js

import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;
