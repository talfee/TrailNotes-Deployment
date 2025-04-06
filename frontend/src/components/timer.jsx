import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

function CountdownTimer() {
    const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  const oceanSound = useRef(new Audio('/sounds/oceansound.mp3'));

  useEffect(() => {
    if (isActive) {
      if (oceanSound.current.paused) {
        oceanSound.current.play();
      }
    } else {
      oceanSound.current.pause();
      oceanSound.current.currentTime = 0;
    }

    return () => {
      oceanSound.current.pause(); 
    };
  }, [isActive]); 

  useEffect(() => {
    setSeconds(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setSeconds(minutes * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleTimeChange = (event) => {
    setMinutes(event.target.value);
    setIsActive(false);
  };

  const startTimer = () => {
    setIsActive(true);
    setSeconds(minutes * 60);
  };

  return (
    <div className="timer-container">
      <h2 className="timer-heading">Meditation Timer</h2>
      <label htmlFor="time-select">Select Meditation Time:</label>
      <select
        id="time-select"
        value={minutes}
        onChange={handleTimeChange}
        disabled={isActive}
        className="time-select">
        <option value={0.5}>30 seconds</option>
        <option value={1}>1 minute</option>
        <option value={2}>2 minutes</option>
        <option value={3}>3 minutes</option>
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
        <option value={15}>15 minutes</option>
      </select>

      <h1 className="timer-number">
        {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}s
      </h1>

      <button className="timer-button" onClick={startTimer} disabled={isActive}>
        {isActive ? 'Meditating...' : 'Start Session'}
      </button>
    </div>
  );
}

export default CountdownTimer;
