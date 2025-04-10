const http = require('http');

let journalEntries = [];

const server = http.createServer((req, res) => {
  let { method, url } = req;
  url = url.replace(/\/+$/, ''); 

  // CORS handling
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (method === 'GET' && url === '/entries') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(journalEntries));
  } else if (method === 'POST' && url === '/entries') {
    console.log("Received POST /entries");

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { text, location, photo } = JSON.parse(body);
        const newEntry = { id: Date.now(), text, location, photo };
        journalEntries.push(newEntry);
        console.log("Saved entry");
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newEntry));
      } catch (err) {
        console.error("Error parsing JSON:", err);
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
