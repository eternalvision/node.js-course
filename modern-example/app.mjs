import express from 'express';
const app = express();
let ready = true;
app.get('/health/live', (req, res) => res.json({ status: 'ok' }));
app.get('/health/ready', (req, res) => ready ? res.json({ status: 'ready' }) : res.sendStatus(503));
const server = app.listen(process.env.PORT ?? 3000);
process.on('SIGTERM', () => {
  ready = false;
  server.close((error) => process.exitCode = error ? 1 : 0);
});
