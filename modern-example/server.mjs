import { createServer } from 'node:http';
let ready = true;
const server = createServer((req, res) => {
  if (req.url === '/health') return res.end(ready ? 'ok' : 'stopping');
  res.end('Node.js on Elastic Beanstalk');
});
server.listen(process.env.PORT ?? 8080);
process.on('SIGTERM', () => { ready = false; server.close(); });
