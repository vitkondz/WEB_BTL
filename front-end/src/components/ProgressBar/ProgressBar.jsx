import React from "react";
// reactstrap components
import { Progress } from "reactstrap";
// core components

function ProgressBar(){
  return (
    <>
      <div className="progress-container">
        <span className="progress-badge">Default</span>
        <Progress max="100" value="25">
          <span className="progress-value">25%</span>
        </Progress>
      </div>
      <div className="progress-container progress-primary">
        <span className="progress-badge">Primary</span>
        <Progress max="100" value="60">
          <span className="progress-value">60%</span>
        </Progress>
      </div>
      <div className="progress-container progress-danger">
        <span className="progress-badge">Danger</span>
        <Progress max="100" value="60">
          <span className="progress-value">60%</span>
        </Progress>
      </div>
      <div className="progress-container progress-warning">
        <span className="progress-badge">Warning</span>
        <Progress max="100" value="60">
          <span className="progress-value">60%</span>
        </Progress>
      </div>
      <div className="progress-container progress-success">
        <span className="progress-badge">Success</span>
        <Progress max="100" value="60">
          <span className="progress-value">60%</span>
        </Progress>
      </div>
      <div className="progress-container progress-info">
        <span className="progress-badge">Info</span>
        <Progress max="100" value="60">
          <span className="progress-value">60%</span>
        </Progress>
      </div>
    </>
  );
}

export default ProgressBar;