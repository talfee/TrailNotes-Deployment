import React, { useState, useEffect } from 'react';
import BackButton from './components/BackButton';
import { useAuth0 } from '@auth0/auth0-react';
import "./JournalPage.css";

const reverseGeocode = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'trailnotes-youcode-2024'
    },
  });

  const data = await res.json();
  return data.display_name;
};

function JournalPage({ goHome }) {
//   const pageStyle = {
//     padding: '2rem',
//     height: '100vh',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     color: '#000',
//     backgroundColor: '#fdfaf6',
//   };
    const pageStyle = {
        padding: '2rem',
        height: '100vh',
        backgroundColor: '#e0f7fa',
        color: '#000',
        fontFamily: 'Helvetica Neue',
    };
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    fetch('http://localhost:3001/entries')
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = { text, location, photo };
    console.log("Sending entry");

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
        async (position) => {
          const { latitude, longitude } = position.coords;
          const place = await reverseGeocode(latitude, longitude);

          setLocation({ latitude, longitude, place });

          console.log("Location captured:", latitude, longitude);
          console.log("Resolved location:", place);

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

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>You must be logged in to write a journal ;-;</h2>
        <button onClick={loginWithRedirect}>Log In</button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
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
        <button class = 'journalButton' type="button" onClick={handleGetLocation}>
          Share My Location
        </button>
        {location && (
          <div>
            Lat: {location.latitude.toFixed(5)}, Lng: {location.longitude.toFixed(5)}
          </div>
        )}
        {locError && <div style={{ color: 'red' }}>{locError}</div>}
        <br />
        <label class = 'custom-file-upload'>
          Attach a Photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPhoto(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
        <br />
        <button class = 'journalButton' type="submit">Save</button>
      </form>

      <h3>Previous Entries</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {entries.map((entry) => (
          <li key={entry.id} style={{ marginBottom: '1.5rem' }}>
            <div>{entry.text}</div>

            {entry.location && entry.location.place ? (
              <div style={{ fontSize: '0.85rem', color: '#444' }}>
                {entry.location.place}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#777' }}>Location not shared</div>
            )}

            {entry.photo && (
              <div>
                <img
                  src={entry.photo}
                  alt="Journal attachment"
                  style={{ maxWidth: '300px', marginTop: '0.5rem', borderRadius: '8px' }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default JournalPage;
