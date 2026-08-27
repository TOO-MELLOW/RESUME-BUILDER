const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const styles = fs.readFileSync(path.join(root, 'public/css/styles.css'), 'utf8');
const pdfExport = fs.readFileSync(path.join(root, 'public/css/pdf-export.css'), 'utf8');

if (styles.includes('background:none')) throw new Error('A template print block is zeroing out the page background again (background:none in styles.css)');
if (/\[data-template\]\s*\{[^}]*background\s*:\s*var\(--bg/.test(pdfExport)) {
  throw new Error(
    'pdf-export.css forces a blanket var(--bg) background on every [data-template] page. ' +
    'Templates that color their page with a literal value (not a --bg variable — currently ' +
    '40 of 69 templates, e.g. navy-vertical-rail-03\'s background:#e9ecef) have no --bg to read, ' +
    'so this silently forces them to plain white. Removing background:none from styles.css is ' +
    'sufficient on its own; do not re-add a blanket restore rule here.'
  );
}
if (!pdfExport.includes('.sidebar') || !pdfExport.includes('.rail') || !pdfExport.includes('.facet-sidebar')) throw new Error('pdf-export.css is missing the region-selector stretch rules for sidebar/rail columns');
if (!pdfExport.includes('min-height: 100% !important')) throw new Error('pdf-export.css no longer stretches sidebar/main regions to full page height');

console.log('PASS: print-mode PDF export preserves each template\'s own page background (var(--bg) or literal) and stretches sidebar/main regions to full height');
