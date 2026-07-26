import test from 'node:test';
import assert from 'node:assert/strict';
import { slug } from './slug.mjs';

test('normalizes a lesson title', () => {
  assert.equal(slug('  Node.js: тесты  '), 'node-js-тесты');
});
test('rejects empty input', () => {
  assert.throws(() => slug('  '), /non-empty/);
});
