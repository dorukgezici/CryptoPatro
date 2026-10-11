import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = mkdtempSync(join(tmpdir(), 'cryptopatro-e2e-'));
const child = spawn(
  'uv',
  [
    'run',
    '--frozen',
    'uvicorn',
    'cryptopatro.main:app',
    '--host',
    '127.0.0.1',
    '--port',
    '8001',
    '--no-proxy-headers',
  ],
  {
    cwd: fileURLToPath(new URL('../../backend', import.meta.url)),
    stdio: 'inherit',
    env: {
      ...process.env,
      CRYPTOPATRO_DATABASE_PATH: join(directory, 'portfolio.sqlite3'),
      CRYPTOPATRO_MARKET_ENABLED: 'false',
      CRYPTOPATRO_AI_MODEL: '',
      CRYPTOPATRO_TRUST_PROXY_HEADERS: 'true',
      OPENAI_API_KEY: '',
    },
  },
);

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', (error) => {
  console.error(error.message);
  rmSync(directory, { recursive: true, force: true });
  process.exit(1);
});
child.on('exit', (code, signal) => {
  rmSync(directory, { recursive: true, force: true });
  process.exit(signal === 'SIGTERM' || signal === 'SIGINT' ? 0 : (code ?? 1));
});
