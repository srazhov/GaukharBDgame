import React, { useState } from "react";
import "../styles/VerticalProgressBar.css";

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#a855f7">
    <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.557 3.997h3.193c1.036 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM12.75 12.75h7.875c.103 0 .203.009.3.025v4.975c0 1.036-.84 1.875-1.875 1.875H12.75v-6.875zM11.25 12.75v6.875H4.875c-1.036 0-1.875-.84-1.875-1.875v-4.975c.097-.016.197-.025.3-.025h7.875z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

export default function VerticalProgressBar() {
  const [progress, setProgress] = useState(65);

  const milestones = [
    { percent: 25, label: "Milestone 1" },
    { percent: 50, label: "Milestone 2" },
    { percent: 75, label: "Milestone 3" },
    { percent: 100, label: "Goal!" },
  ];

  return (
    <div className="progress-container">
      <div className="progress-header">Current Progress: {progress}%</div>

      <div className="progress-track">
        {/* The animated bar's height must remain inline because it's dynamic state */}
        <div className="progress-fill" style={{ height: `${progress}%` }} />

        {milestones.map((milestone) => (
          <div
            key={milestone.percent}
            className="milestone"
            style={{ bottom: `${milestone.percent}%` }}
          >
            <div className="milestone-icon">
              {milestone.percent === 100 ? <HeartIcon /> : <GiftIcon />}
            </div>

            <div className="milestone-text">
              <p className="milestone-title">{milestone.label}</p>
              <p className="milestone-subtitle">{milestone.percent}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button
          className="btn"
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
        >
          Decrease
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setProgress((p) => Math.min(100, p + 10))}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
