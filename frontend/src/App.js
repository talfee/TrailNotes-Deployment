import React, { useEffect, useState } from 'react';
// import backgroundImage from './images/homepage_image.jpg';
import JournalPage from './JournalPage';
import Meditation from './Meditation';

const images = require.context('./images/homepage', false, /\.(jpg|jpeg|png)$/).keys().map(image => require(`./images/homepage${image.slice(1)}`));

function App() {
  const [page, setPage] = useState('home');

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (page === 'journal') return <JournalPage goHome={() => setPage('home')} />;
  if (page === 'meditation') return <Meditation goHome={() => setPage('home')} />;

  return (
    <div
      style={{
        backgroundImage: `url(${currentImage})`,
        transition: 'background-image 2s ease-in-out',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
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
            boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.5)',
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
            boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.5)',
          }}
        >
          Meditation
        </button>
      </div>
    </div>
  );
}

export default App;
