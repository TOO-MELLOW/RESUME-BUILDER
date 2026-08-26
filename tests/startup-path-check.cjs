const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function assert(name, condition) {
  if (!condition) {
    console.error(`FAIL: ${name}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${name}`);
  }
}

assert('legacy controller loads from /js/script.js', index.includes('<script src="/js/script.js"></script>'));
assert('legacy relative script.js URL is gone', !index.includes('<script src="script.js"></script>'));
assert('Supabase CDN dependency is gone from app shell', !index.includes('cdn.jsdelivr.net/npm/@supabase/supabase-js@2'));
assert('Vite Supabase bridge is present', index.includes('/src/supabase-global.js'));
assert('legacy navigate() exists in controller source', /function\s+navigate\s*\(/.test(fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8')));
assert('client PDF export resets preview fit styles', fs.readFileSync(path.join(root, 'src/engine/pdfExport.js'), 'utf8').includes("content.style.transform = '';"));

if (!process.exitCode) console.log('Startup path checks passed.');
