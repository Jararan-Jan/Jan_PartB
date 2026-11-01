// Default to Safari. First run "node run.cjs connection"; it creates no account.
const createTestCafe = require('testcafe');
const fs = require('fs');
const http = require('http');
const part = process.argv[2] || 'connection';
const allowed = ['connection', 'registration', 'login', 'recovery', 'all'];
if (!allowed.includes(part)) throw new Error('Unknown part: ' + part);
if (part !== 'connection') {
  const config = require('./config.cjs');
  if (!config.email || config.email === 'CHANGE_ME@example.com' || !config.email.includes('@')) {
    throw new Error('Set a dedicated test email in config.cjs first.');
  }
}
(async () => {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = `reports/${stamp}`;
  fs.mkdirSync(reportDir, { recursive: true });
  let server;
  let cafe;
  let failures = 0;
  try {
    if (part === 'connection') {
      // Local page isolates browser automation from the external website/network.
      server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<!doctype html><html><head><title>Local TestCafe check</title></head><body><h1>Local automation check</h1><label>Test text <input id="probe"></label></body></html>');
      });
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
      });
      process.env.PARTB_PROBE_URL = `http://127.0.0.1:${server.address().port}`;
    }
    console.log('[runner] Creating localhost TestCafe server');
    cafe = await createTestCafe({hostname: 'localhost'});
    const names = part === 'all' ? ['registration', 'login', 'recovery'] : [part];
    for (const name of names) {
      console.log(`[runner] Starting ${name}; browser: ${process.env.TEST_BROWSER || 'safari'}`);
      const count = await cafe.createRunner()
        .src(`tests/${name}.js`)
        .browsers(process.env.TEST_BROWSER || 'safari')
        .reporter([{name: 'spec'}, {name: 'json', output: `${reportDir}/${name}.json`}])
        .run({
          disableNativeAutomation: true,
          selectorTimeout: 15000,
          assertionTimeout: 15000,
          pageLoadTimeout: 15000,
          pageRequestTimeout: 20000,
          browserInitTimeout: 60000,
          testExecutionTimeout: 60000,
          runExecutionTimeout: name === 'connection' ? 150000 : 240000,
          screenshots: {path: `evidence/${stamp}`, takeOnFails: true, fullPage: true}
        });
      failures += count;
      console.log(`[runner] ${name} finished: ${count} failed. Reports: ${reportDir}`);
      if (name === 'registration' && count > 0 && part === 'all') break;
    }
  } finally {
    console.log('[runner] Closing browser connection');
    try { if (cafe) await cafe.close(); }
    finally { if (server) await new Promise(resolve => server.close(resolve)); }
  }
  process.exitCode = failures ? 1 : 0;
})().catch(error => { console.error('[runner error]', error); process.exitCode = 1; });
