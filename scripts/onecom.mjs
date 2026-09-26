import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const host = 'ssh.cdb5s664g.service.one';
export const user = 'cdb5s664g_ssh';
export const port = 22;

export function commands(operation, remoteDir = '') {
  if (!['inspect', 'deploy'].includes(operation)) throw new Error('Välj inspect eller deploy.');
  if (remoteDir && (!/^\/[a-zA-Z0-9_./-]*$/.test(remoteDir) || remoteDir.split('/').includes('..'))) {
    throw new Error('Målmappen måste vara en absolut SFTP-sökväg utan specialtecken eller ..');
  }
  if (operation === 'deploy' && !remoteDir) throw new Error('Verifiera och ange ONECOM_REMOTE_DIR före publicering.');
  return [
    'set cmd:fail-exit yes',
    'set net:timeout 20',
    'set net:max-retries 2',
    'set sftp:auto-confirm no',
    'set sftp:connect-program "ssh -a -x -o StrictHostKeyChecking=yes -o UserKnownHostsFile=.onecom-known-hosts -o GlobalKnownHostsFile=/dev/null"',
    `open --env-password --user ${user} sftp://${host}:${port}`,
    ...(remoteDir ? [`cd "${remoteDir}"`] : []),
    'pwd',
    ...(operation === 'inspect'
      ? ['cls -la']
      // Only the contents of site/ are uploaded. Existing remote-only files stay.
      : ['cls -l index.html', 'mirror --reverse --no-perms --no-symlinks --parallel=2 --verbose=1 site/ ./']),
    'bye',
  ].join('\n');
}

async function main() {
  const operation = process.env.ONECOM_OPERATION || 'inspect';
  const script = commands(operation, process.env.ONECOM_REMOTE_DIR || '');
  if (!process.env.LFTP_PASSWORD) throw new Error('Lägg till GitHub-hemligheten ONECOM_SFTP_PASSWORD.');
  const keys = process.env.ONECOM_KNOWN_HOSTS?.trim();
  if (!keys) throw new Error('Lägg till verifierad servernyckel i ONECOM_KNOWN_HOSTS.');
  if (!keys.split(/\r?\n/).some(line => line.startsWith(host + ' ') || line.startsWith(`[${host}]:${port} `))) {
    throw new Error('Servernyckeln måste gälla rätt one.com-server.');
  }
  const knownHosts = path.resolve('.onecom-known-hosts');
  await fs.writeFile(knownHosts, keys + '\n', { mode: 0o600, flag: 'wx' });
  try {
    const result = spawnSync('lftp', ['--norc', '-c', script], {
      stdio: 'inherit', env: process.env, shell: false,
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error('SFTP-körningen misslyckades. Kontrollera loggen ovan.');
  } finally {
    await fs.unlink(knownHosts);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
