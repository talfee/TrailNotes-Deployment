import React, { useState, useEffect } from 'react';

function JournalPage({ goHome }) {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/entries')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error(err));
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
      <button onClick={goHome}>Back</button>
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          cols="40"
          placeholder="Write your thoughts..."
        />
        <br />
        <button type="submit">Save</button>
      </form>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default JournalPage;
