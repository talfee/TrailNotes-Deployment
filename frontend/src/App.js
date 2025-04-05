import React, { useState } from 'react';
import JournalPage from './JournalPage';
import MeditationPage from './MeditationPage';

function App() {
  const [page, setPage] = useState('home'); // 'home', 'journal', or 'meditation'

  const renderPage = () => {
    if (page === 'journal') return <JournalPage goHome={() => setPage('home')} />;
    if (page === 'meditation') return <MeditationPage goHome={() => setPage('home')} />;
    return (
      <div style={{ padding: '2rem' }}>
        <h1>TrailNotes</h1>
        <button onClick={() => setPage('journal')}>Journal</button>
        <button onClick={() => setPage('meditation')}>Meditation</button>
      </div>
    );
  };

  return <div>{renderPage()}</div>;
}

export default App;
