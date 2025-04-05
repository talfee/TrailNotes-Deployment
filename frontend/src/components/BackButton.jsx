// src/components/BackButton.jsx
import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="back-button">
      ← Back
    </button>
  );
};

export default BackButton;