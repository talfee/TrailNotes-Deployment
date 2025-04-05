import React, { useState } from 'react';
import backgroundImage from './images/homepage_image.jpg';
import JournalPage from './JournalPage';
import Meditation from './Meditation';

function App() {
  const [page, setPage] = useState('home');

  if (page === 'journal') return <JournalPage goHome={() => setPage('home')} />;
  if (page === 'meditation') return <Meditation goHome={() => setPage('home')} />;

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>TrailNotes</h1>
      <div>
        <button
          onClick={() => setPage('journal')}
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '1rem 2rem',
            borderRadius: '999px',
            border: 'none',
            margin: '0 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Journal
        </button>
        <button
          onClick={() => setPage('meditation')}
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '1rem 2rem',
            borderRadius: '999px',
            border: 'none',
            margin: '0 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Meditation
        </button>
      </div>
    </div>
  );
}

export default App;
