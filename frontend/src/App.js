import React, { useEffect, useState } from 'react';
// import backgroundImage from './images/homepage_image.jpg';
import JournalPage from './JournalPage';
import Meditation from './Meditation';
import { useAuth0 } from '@auth0/auth0-react';


const images = require.context('./images/homepage', false, /\.(jpg|jpeg|png)$/).keys().map(image => require(`./images/homepage${image.slice(1)}`));

function App() {
  const [page, setPage] = useState('home');
  const [currentImage, setCurrentImage] = useState(images[0]);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


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
        position: 'relative',
      }}
    >
      {/* ✅ Auth buttons: top-right corner */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', textAlign: 'right' }}>
        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect()}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            Log In
          </button>
        ) : (
          <>
            <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>
              Welcome, {user.name}
            </p>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>

      {/* App title */}
      <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>TrailNotes</h1>

      {/* Navigation buttons */}
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
