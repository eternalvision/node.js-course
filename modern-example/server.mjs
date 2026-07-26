import { app } from './app.mjs';
app.listen(3000, (error) => {
  if (error) throw error;
  console.log('API: http://localhost:3000');
});
