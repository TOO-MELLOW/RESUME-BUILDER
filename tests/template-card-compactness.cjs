const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'styles.css'), 'utf8');
function fail(msg) { console.error(`FAIL: ${msg}`); process.exit(1); }
if (!/\.g-thumb\s*\{[^}]*padding-top:\s*141\.4%/s.test(css)) fail('gallery thumbnail no longer preserves full A4 aspect');
if (!/\.gallery-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s.test(css)) fail('mobile gallery was not compacted to three template columns');
if (!/\.g-bestfor\s*\{[^}]*-webkit-line-clamp:\s*1/s.test(css)) fail('gallery metadata is not clamped to one line');
if (!/\.g-cta \.btn\s*\{[^}]*min-height:\s*34px/s.test(css)) fail('gallery CTA was not compacted');
if (!/@media \(max-width:767px\)[\s\S]*?\.g-name\s*\{[^}]*font-size:\s*10px/s.test(css)) fail('mobile gallery typography was not compacted');
console.log('Template card compactness checks passed');
