import test from 'node:test';
import assert from 'node:assert/strict';
import { commands } from './onecom.mjs';

test('Inspektion laddar inte upp eller raderar filer', () => {
  const script = commands('inspect');
  assert.match(script, /cls -la/);
  assert.doesNotMatch(script, /mirror|\bput\b|\brm\b|\bmkdir\b/);
  assert.match(script, /StrictHostKeyChecking=yes/);
});
test('Publicering kräver en uttrycklig, säker målmapp', () => {
  for (const target of ['', '../www', '/a/../b', '/www"; !echo x', '/www\nbye']) {
    assert.throws(() => commands('deploy', target));
  }
  assert.throws(() => commands('unknown', '/www'));
  const script = commands('deploy', '/www');
  assert.match(script, /cd "\/www"/);
  assert.match(script, /site\/ \.\//);
  assert.doesNotMatch(script, /--delete/);
});
