import test from 'node:test';
import assert from 'node:assert/strict';
import { createTaskService } from './feature.mjs';
test('creates a trimmed task', async () => {
  const service = createTaskService({ repository: { insert: async (task) => ({ id: '1', ...task }) } });
  assert.equal((await service.create({ title: ' Learn ' })).title, 'Learn');
});
