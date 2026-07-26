import { app } from './app.mjs';
const server = app.listen(process.env.PORT ?? 3000, (error) => {
  if (error) throw error;
  console.log('API: http://localhost:3000');
});
process.on('SIGTERM', () => server.close());
