import { createServer } from 'node:http';

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(404, { 'content-type': 'application/problem+json' });
  res.end(JSON.stringify({ title: 'Not Found', status: 404 }));
});
server.listen(3000, () => console.log('http://localhost:3000'));
