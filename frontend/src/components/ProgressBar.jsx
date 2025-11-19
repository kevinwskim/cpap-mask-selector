import React from 'react';
import './ProgressBar.css';

function ProgressBar({ progress, current, total }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>Question {current} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;

