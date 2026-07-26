import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from './app.mjs';
test('creates and reads a task', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const createdResponse = await fetch(`${base}/tasks`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: 'Изучить Router' }),
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  const found = await (await fetch(`${base}/tasks/${created.id}`)).json();
  assert.deepEqual(found, created);
});
