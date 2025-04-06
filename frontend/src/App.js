import React, { useEffect, useState } from 'react';
// import backgroundImage from './images/homepage_image.jpg';
import JournalPage from './JournalPage';
import Meditation from './Meditation';
import './App.css';

const images = require.context('./images/homepage', false, /\.(jpg|jpeg|png)$/).keys().map(image => require(`./images/homepage${image.slice(1)}`));
const leftCaptions = [
    <>
    Photo by <a href="https://www.pexels.com/photo/bench-under-flowering-trees-11470287/" target="_blank" rel="noopener noreferrer">Nikita</a>
    </>,
    <>
    Photo by <a href="https://www.pexels.com/photo/photo-of-field-full-of-pumpkins-1486976/" target="_blank" rel="noopener noreferrer">James Wheeler</a>
    </>,
    <>
    Photo by <a href="https://www.pexels.com/photo/snowy-mountain-1881838/" target="_blank" rel="noopener noreferrer">Connor Danylenko</a>
    </>,
]
const rightCaptions = [
    "⚲ Queen Elizabeth Park, Vancouver, BC",
    "⚲ Maple Ridge, BC",
    "⚲ Whistler, BC",
];

function App() {
    const [page, setPage] = useState('home');

    const [currentImage, setCurrentImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setCurrentImage(prevImage => {
                const currentIndex = images.indexOf(prevImage);
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex];
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (page === 'journal') return <JournalPage goHome={() => setPage('home')} />;
    if (page === 'meditation') return <Meditation goHome={() => setPage('home')} />;

    return (
        <div
        style={{
            backgroundImage: `url(${currentImage})`,
            objectFit: 'cover',
            position: 'relative',
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
        }}
        >
            <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>TrailNotes</h1>
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
