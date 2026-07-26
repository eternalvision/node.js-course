import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from './app.mjs';
test('health endpoint and 404 contract', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${base}/health`);
  assert.deepEqual(await health.json(), { status: 'ok' });
  assert.ok(health.headers.get('x-request-id'));
  assert.equal((await fetch(`${base}/missing`)).status, 404);
});
