const http = require('http');

let journalEntries = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // Allow CORS for other requests
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (method === 'GET' && url === '/entries') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(journalEntries));
  } 
  else if (method === 'POST' && url === '/entry') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const { text } = JSON.parse(body);
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Text is required' }));
        }
        const newEntry = { id: Date.now(), text };
        journalEntries.push(newEntry);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newEntry));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
