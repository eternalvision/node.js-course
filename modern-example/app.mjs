import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
app.use(rateLimit({ windowMs: 60_000, limit: 100, standardHeaders: 'draft-8' }));
app.post('/feedback', (req, res) => {
  const message = req.body?.message;
  if (typeof message !== 'string' || message.length > 1000) return res.sendStatus(422);
  res.status(202).json({ accepted: true });
});
app.listen(3000);
