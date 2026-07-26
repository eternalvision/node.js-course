import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query(
  'SELECT id, title, completed FROM tasks WHERE completed = $1 ORDER BY id',
  [false],
);
console.table(rows);
await pool.end();
