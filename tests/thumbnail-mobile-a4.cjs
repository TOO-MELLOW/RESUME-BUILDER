const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'public/css/styles.css'), 'utf8');
const gallery = fs.readFileSync(path.join(root, 'public/js/gallery-renderer.js'), 'utf8');
const script = fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8');

function fail(message) { throw new Error(message); }
function pass(message) { console.log(`PASS: ${message}`); }

if (!/\.g-thumb\s*\{[^}]*padding-top:\s*141\.4%/s.test(css)) fail('gallery thumbnail is not A4 aspect ratio');
if (!/\.tmpl-mini-t\s*\{[^}]*padding-top:\s*141\.4%/s.test(css)) fail('builder thumbnail is not A4 aspect ratio');
if (!gallery.includes("page.style.width = '794px';") || !gallery.includes("page.style.height = '1123px';")) fail('thumbnail renderer does not force a full A4 source page');
if (!script.includes('mobilePreviewZoom = Math.min(1, Math.max(0.3, available / naturalWidth));')) fail('mobile preview fit does not calculate from full document width');
pass('mobile/gallery thumbnails preserve full A4 aspect and fit from natural page width');

console.log('Mobile A4 thumbnail checks passed');
