import React, { useEffect, useState } from 'react';
// import backgroundImage from './images/homepage_image.jpg';
import JournalPage from './JournalPage';
import Meditation from './Meditation';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

const images = require.context('./images/homepage', false, /\.(jpg|jpeg|png)$/).keys().map(image => require(`./images/homepage${image.slice(1)}`));
const leftCaptions = [
    <>
    Photo by <a href="https://www.pexels.com/photo/bench-under-flowering-trees-11470287/" target="_blank" rel="noopener noreferrer">Nikita</a>
    </>,
    <>
    Photo by <a href="https://unsplash.com/photos/landscape-photo-of-trees-near-body-of-water-during-daytime-2Fl6efcITLA" target="_blank" rel="noopener noreferrer">Carlos Blanco</a>
    </>,
    <>
    Photo by <a href="https://www.pexels.com/photo/snowy-mountain-1881838/" target="_blank" rel="noopener noreferrer">Connor Danylenko</a>
    </>,
]
const rightCaptions = [
    "⚲ Queen Elizabeth Park, Vancouver, BC",
    "⚲ Lost Lake, Whistler, BC",
    "⚲ Whistler, BC",
];

function App() {
    const [page, setPage] = useState('home');
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
            objectFit: 'cover',
            transition: 'background-image 2s ease-in-out',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
            color: 'white',
            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            fontFamily: 'Helvetica Neue',
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
                    borderRadius: '999px',
                    cursor: 'pointer',
                    height: '50px',
                    width: '100px',
                    boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Log In
                </button>
                ) : (
                <>
                    <p style={{ marginTop: '1px', marginBottom: '5px', color: 'white', fontWeight: 'bold' }}>
                    Welcome, {user.name}
                    </p>
                    <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        height: '50px',
                        width: '125px',
                        boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.5)',
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

            {/* Captions */}
            <div className='captions' style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.75rem', color: 'white' }}>
                {leftCaptions[currentIndex]}
            </div>
            <div className='captions' style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
                {rightCaptions[currentIndex]}
            </div>
        </div>
    );

}

export default App;
