import express from 'express';
import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.get('/tasks', async (req, res) => {
  const limit = Math.min(Number(req.query.limit ?? 20), 100);
  const { rows } = await pool.query(
    'SELECT id, title, completed FROM tasks ORDER BY id DESC LIMIT $1',
    [limit],
  );
  res.json({ items: rows });
});
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(500).json({ title: 'Database request failed', status: 500 });
});
app.listen(3000);
