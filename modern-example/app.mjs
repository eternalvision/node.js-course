import express from 'express';
export const app = express();
app.use(express.json({ limit: '32kb' }));
app.use((req, res, next) => {
  res.set('x-request-id', crypto.randomUUID());
  next();
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use((req, res) => res.status(404).json({ title: 'Not Found', status: 404 }));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(500).json({ title: 'Internal Server Error', status: 500 });
});
