import React from 'react';
import Timer from './components/timer';

function Meditation({ goHome }) {
  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={goHome}>Back</button>
      <Timer />
    </div>
  );
}

export default Meditation;