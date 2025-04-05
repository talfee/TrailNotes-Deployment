import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  // Fetch saved entries
  useEffect(() => {
    fetch('http://localhost:3001/entries')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error('Error fetching entries:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const newEntry = await res.json();
    setEntries((prev) => [newEntry, ...prev]);
    setText('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>TrailNotes</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
          cols="40"
          placeholder="Write something..."
        />
        <br />
        <button type="submit">Save</button>
      </form>

      <h2>Saved Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
