import React, { useState, useEffect } from 'react';
import BackButton from './components/BackButton';


function JournalPage({ goHome }) {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/entries')
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = { text, location };
    console.log("Sending entry:", entry);

    const res = await fetch('http://localhost:3001/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    const newEntry = await res.json();
    setEntries((prev) => [newEntry, ...prev]);
    setText('');
    setLocation(null);
    setLocError(null);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Location captured:", latitude, longitude);
          setLocError(null);
        },
        (err) => {
          console.error('Location error:', err);
          setLocError('Unable to access location');
        }
      );
    } else {
      setLocError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div>
      {/* <button onClick={goHome}>← Back</button> */}
      <BackButton onClick={goHome} />
      <h2>Journal</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          rows="5"
          cols="40"
        />
        <br />
        <button type="button" onClick={handleGetLocation}>
          Share My Location
        </button>
        {location && (
          <div>
            Lat: {location.latitude.toFixed(5)}, Lng: {location.longitude.toFixed(5)}
          </div>
        )}
        {locError && <div style={{ color: 'red' }}>{locError}</div>}
        <br />
        <button type="submit">Save</button>
      </form>

      <h3>Previous Entries</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {entries.map((entry) => (
          <li key={entry.id} style={{ marginBottom: '1.5rem' }}>
            <div>{entry.text}</div>
            {entry.location ? (
              <div style={{ fontSize: '0.85rem', color: '#444' }}>
                Lat: {entry.location.latitude.toFixed(5)}, Lng: {entry.location.longitude.toFixed(5)}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#777' }}>Location not shared</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JournalPage;
