import express from 'express';
import compression from 'compression';
import pinoHttp from 'pino-http';
import { monitorEventLoopDelay } from 'node:perf_hooks';
const lag = monitorEventLoopDelay({ resolution: 20 });
lag.enable();
const app = express();
app.use(pinoHttp());
app.use(compression());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/metrics', (req, res) => res.json({
  eventLoopP99Ms: Number(lag.percentile(99) / 1e6).toFixed(2),
  memory: process.memoryUsage(),
}));
app.listen(3000);
