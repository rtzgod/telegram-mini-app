// src/components/Progress.js
import React from 'react';
import './Progress.css';

const Progress = ({ progressData }) => {
    const renderProgress = () => {
        return Object.keys(progressData).map(date => (
            <div key={date} className="progress-item">
                <span>{new Date(date).toLocaleDateString()}</span>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressData[date]}%` }}
                    >
                        {progressData[date]} points
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="progress-container">
            <h1>Progress Overview</h1>
            {renderProgress()}
        </div>
    );
};

export default Progress;
