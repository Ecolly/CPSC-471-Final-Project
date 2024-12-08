import React from 'react';
import './Decor.css'; // Assuming you have a separate CSS file for the decoration

const BottomDecoration = () => {
  return (
    <div className="bottom-decoration">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"  // Adjust the width if needed
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          fill="#000"
          d="M0,0 C480,60 960,120 1440,60 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default BottomDecoration;
